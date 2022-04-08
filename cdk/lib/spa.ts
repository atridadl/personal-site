import { Stack, StackProps, Duration } from "aws-cdk-lib";
import { aws_s3 as s3 } from "aws-cdk-lib";
import { aws_s3_deployment as s3Deployment } from "aws-cdk-lib";
import { aws_cloudfront as cloudfront } from "aws-cdk-lib";
import { aws_certificatemanager as acm } from "aws-cdk-lib";
import { aws_route53 as route53 } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ARecord, RecordTarget } from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
import * as iam from "aws-cdk-lib/aws-iam";


interface SPAStackProps extends StackProps {
  stage: string,
  domain: string,
};

export class SPAStack extends Stack {
  constructor(scope: Construct, id: string, props: SPAStackProps) {
    super(scope, id, props);

    // ----------------------[S3 Bucket]----------------------
    const bucket = new s3.Bucket(this, `${ props.stage }-SPAStaticBucket`, {
        bucketName: `${ props.stage }-spa-static-bucket`,
        websiteIndexDocument: "index.html",
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        cors: [
            {
            allowedOrigins: ["*"],
            allowedMethods: [s3.HttpMethods.GET],
            maxAge: 3000,
            },
        ],
    });

    // ----------------------[Certs]----------------------
    const hostedZone = route53.HostedZone.fromLookup(this, `${ props.stage }-HostedZone`, {
        domainName: props.domain,
    });

    const certificate = new acm.DnsValidatedCertificate(this, `${ props.stage }-CrossRegionCertificate`, {
        domainName: props.domain,
        hostedZone,
        region: "us-east-1",
    });
    
    // ----------------------[Cloudfront]----------------------
    const cloudfrontOAI = new cloudfront.OriginAccessIdentity(this, "cloudfrontOAI", {
            comment: `Allows CloudFront access to S3 bucket`,
        }
    );

    bucket.addToResourcePolicy(
        new iam.PolicyStatement({
          sid: "Grant Cloudfront Origin Access Identity access to S3 bucket",
          actions: ["s3:GetObject"],
          resources: [bucket.bucketArn + "/*"],
          principals: [cloudfrontOAI.grantPrincipal],
        })
    );

    const cfDist = new cloudfront.CloudFrontWebDistribution(this, `${ props.stage }-SPAStackCloudfront`, {
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL,
        originConfigs: [{
            s3OriginSource: {
                s3BucketSource: bucket,
                originAccessIdentity: cloudfrontOAI,
            },
            behaviors: [
                {
                    compress: true,
                    isDefaultBehavior: true,
                    defaultTtl: Duration.seconds(0),
                    allowedMethods: cloudfront.CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
                },
            ]
        }],
        viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(certificate, {
                aliases: [props.domain],
                securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1,
                sslMethod: cloudfront.SSLMethod.SNI,
            },
        ),
        errorConfigurations: [{
            errorCode: 404,
            responseCode: 200,
            responsePagePath: "/index.html",
        },
        {
            errorCode: 403,
            responseCode: 200,
            responsePagePath: "/index.html",
        }]
    });

    const target = RecordTarget.fromAlias(new CloudFrontTarget(cfDist));

    new ARecord(this, `${ props.stage }-SPADNSRecord`, {
        zone: hostedZone,
        target,
        recordName: props.domain,
    });

    // ----------------------[S3 Bucket Deployment]----------------------
    new s3Deployment.BucketDeployment(this, `${ props.stage }-DeploySPAStatic`, {
        sources: [s3Deployment.Source.asset("../spaDist")],
        destinationBucket: bucket,
        distribution: cfDist,
        distributionPaths: [
            "/*"
        ]
    });
  }
}
