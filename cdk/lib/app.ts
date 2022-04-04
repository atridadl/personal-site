import { Stack, StackProps, Duration } from "aws-cdk-lib";
import { aws_s3 as s3 } from "aws-cdk-lib";
import { aws_s3_deployment as s3Deployment } from "aws-cdk-lib";
import { aws_cloudfront as cloudfront } from "aws-cdk-lib";
import { aws_certificatemanager as acm } from "aws-cdk-lib";
import { aws_route53 as route53 } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ARecord, RecordTarget } from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { HttpApi, HttpMethod } from "@aws-cdk/aws-apigatewayv2-alpha";
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import path = require("path");
import * as iam from "aws-cdk-lib/aws-iam";


interface AppStackProps extends StackProps {
  stage: string,
  domain: string,
};

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props: AppStackProps) {
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

    // ----------------------[API]----------------------
    const httpApi = new HttpApi(this, `${ props.stage }-API`, {
        apiName: `${ props.stage }-API`,
    });

    const rootFunction = new lambda.Function(this, `${ props.stage }-rootFunction`, {
        functionName: `${ props.stage }-RootFunction`,
        runtime: lambda.Runtime.NODEJS_14_X,
        code: lambda.Code.fromAsset(path.join(__dirname, 'serverless')),
        handler: "root.main",
    });

    const rootFunctionIntegration = new HttpLambdaIntegration('RootFunctionIntegration', rootFunction);

    httpApi.addRoutes({
        path: "/api", 
        methods: [HttpMethod.GET],
        integration: rootFunctionIntegration,
    });

    const helloWorld = new lambda.Function(this, `${ props.stage }-HelloWorld`, {
        functionName: `${ props.stage }-HelloWorld`,
        runtime: lambda.Runtime.NODEJS_14_X,
        code: lambda.Code.fromAsset(path.join(__dirname, 'serverless')),
        handler: "helloWorld.main",
    });

    const helloWorldIntegration = new HttpLambdaIntegration('HelloWorldIntegration', helloWorld);

    httpApi.addRoutes({
        path: "/api/helloWorld", 
        methods: [HttpMethod.GET],
        integration: helloWorldIntegration,
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

    const cfDist = new cloudfront.CloudFrontWebDistribution(this, `${ props.stage }-AppStackCloudfront`, {
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL,
        originConfigs: [{
            customOriginSource: {
                domainName: `${httpApi.httpApiId}.execute-api.${this.region}.amazonaws.com`,
            },
            behaviors: [
                {
                    pathPattern: "/api",
                    allowedMethods: cloudfront.CloudFrontAllowedMethods.ALL,
                    defaultTtl: Duration.seconds(0),
                    forwardedValues: {
                        queryString: true,
                        headers: ["Authorization"],
                    },
                },
                {
                    pathPattern: "/api/*",
                    allowedMethods: cloudfront.CloudFrontAllowedMethods.ALL,
                    defaultTtl: Duration.seconds(0),
                    forwardedValues: {
                        queryString: true,
                        headers: ["Authorization"],
                    },
                },
            ],
        },{
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

    new ARecord(this, `${ props.stage }-DNSRecord`, {
        zone: hostedZone,
        target,
        recordName: props.domain,
    });

    // ----------------------[S3 Bucket Deployment]----------------------
    new s3Deployment.BucketDeployment(this, `${ props.stage }-DeploySPAStatic`, {
        sources: [s3Deployment.Source.asset("../dist")],
        destinationBucket: bucket,
        distribution: cfDist,
        distributionPaths: [
            "/*"
        ]
    });
  }
}
