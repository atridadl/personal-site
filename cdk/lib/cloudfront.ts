import { Stack, StackProps, CfnParameter } from "aws-cdk-lib";
import { aws_s3 as s3 } from "aws-cdk-lib";
import { aws_s3_deployment as s3Deployment } from "aws-cdk-lib";
import { aws_cloudfront as cloudfront } from "aws-cdk-lib";
import { aws_certificatemanager as acm } from "aws-cdk-lib";
import { aws_route53 as route53 } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ARecord, RecordTarget } from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";

interface CFStackProps extends StackProps {
  stage: string,
  domain: string,
  bucket: s3.Bucket
};

export class CFAStack extends Stack {
  constructor(scope: Construct, id: string, props: CFStackProps) {
    super(scope, id, props);

    // Certs
    const hostedZone = route53.HostedZone.fromLookup(this, `${ props.stage }-HostedZone`, {
      domainName: props.domain,
    });

    const certificate = new acm.DnsValidatedCertificate(this, `${ props.stage }-CrossRegionCertificate`, {
      domainName: props.domain,
      hostedZone,
      region: "us-east-1",
    });

    // Cloudfront
   const cfDist = new cloudfront.CloudFrontWebDistribution(this, `${ props.stage }-StaticBucketCloudfront`, {
      originConfigs: [{
        s3OriginSource: {
          s3BucketSource: props.bucket
        },
        behaviors: [{ isDefaultBehavior: true }]
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

		new ARecord(this, `${ props.stage }-DNSRecord`, {
			zone: hostedZone,
			target,
			recordName: props.domain,
		});

    // S3 Bucket Deployment
    new s3Deployment.BucketDeployment(this, `${ props.stage }-DeployStatic`, {
      sources: [s3Deployment.Source.asset("../dist")],
      destinationBucket: props.bucket,
      distribution: cfDist,
      distributionPaths: [
        "/*"
      ]
    });
  }
}
