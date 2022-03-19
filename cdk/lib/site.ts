import { Stack, StackProps, CfnParameter } from 'aws-cdk-lib';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import { aws_s3_deployment as s3Deployment } from 'aws-cdk-lib';
import { aws_cloudfront as cloudfront } from 'aws-cdk-lib';
import { aws_certificatemanager as acm } from 'aws-cdk-lib';
import { aws_route53 as route53 } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ARecord, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';

export class SiteStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    // Params
    const domain = new CfnParameter(this, "domain", {
      type: "String",
      description: "The name of the Amazon S3 bucket where uploaded files will be stored."});

    const hostedZoneID = new CfnParameter(this, "hostedZoneID", {
      type: "String",
      description: "The name of the Amazon S3 bucket where uploaded files will be stored."});

    // S3 Bucket
    const bucket = new s3.Bucket(this, "PersonalSiteStaticBucket", {
      publicReadAccess: true,
      bucketName: "personal-site-static-bucket",
      websiteIndexDocument: "index.html",
    });

    // Certs
    const hostedZone = route53.HostedZone.fromHostedZoneAttributes(this, "PersonalSiteHostedZone", {
      zoneName: domain.valueAsString,
      hostedZoneId: hostedZoneID.valueAsString
    });

    const certificate = new acm.DnsValidatedCertificate(this, 'CrossRegionCertificate', {
      domainName: domain.valueAsString,
      hostedZone,
      region: "us-east-1",
    });

    // Cloudfront
   const cfDist = new cloudfront.CloudFrontWebDistribution(this, "PersonalSiteStaticBucketCloudfront", {
      originConfigs: [{
        s3OriginSource: {
          s3BucketSource: bucket
        },
        behaviors: [{ isDefaultBehavior: true }]
      }],
      viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(certificate, {
          aliases: [domain.valueAsString],
          securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1,
          sslMethod: cloudfront.SSLMethod.SNI,
        },
      ),
      errorConfigurations: [{
        errorCode: 404,
        responseCode: 200,
        responsePagePath: "/index.html",
      }]
    });

    const target = RecordTarget.fromAlias(new CloudFrontTarget(cfDist));

		new ARecord(this, "personal-site-a-record", {
			zone: hostedZone,
			target,
			recordName: domain.valueAsString,
		});

    // S3 Bucket Deployment
    new s3Deployment.BucketDeployment(this, "DeployPersonalSiteStatic", {
      sources: [s3Deployment.Source.asset("../dist")],
      destinationBucket: bucket,
      distribution: cfDist,
      distributionPaths: [
        "/*"
      ]
    });
  }
}
