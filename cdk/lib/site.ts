import { Stack, StackProps, CfnOutput, aws_iotcoredeviceadvisor } from 'aws-cdk-lib';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import { aws_s3_deployment as s3Deployment } from 'aws-cdk-lib';
import { aws_cloudfront as cloudfront } from 'aws-cdk-lib';
import { aws_certificatemanager as acm } from 'aws-cdk-lib';
import { aws_route53 as route53 } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ARecord, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import * as ssm from 'aws-cdk-lib/aws-ssm';

interface SiteStackProps extends StackProps {
  domain: string;
  hostedZoneID: string;
};

export class SiteStack extends Stack {
  constructor(scope: Construct, id: string, props: SiteStackProps) {
    super(scope, id, props);

    // Grab Config
    // const environmentConfig = {
    //   domain: ssm.StringParameter.valueForStringParameter(this, "domain"),
    //   hostedZoneID: ssm.StringParameter.valueForStringParameter(this, "hostedZoneID"),
    // };

    // S3 Bucket
    const bucket = new s3.Bucket(this, "PersonalSiteStaticBucket", {
      publicReadAccess: true,
      bucketName: "personal-site-static-bucket",
      websiteIndexDocument: "index.html",
    });

    // S3 Bucket Deployment
    new s3Deployment.BucketDeployment(this, "DeployPersonalSiteStatic", {
      sources: [s3Deployment.Source.asset("../dist")],
      destinationBucket: bucket
    });

    // Certs
    const hostedZone = route53.HostedZone.fromHostedZoneAttributes(this, "PersonalSiteHostedZone", {
      zoneName: props.domain,
      hostedZoneId: props.hostedZoneID
    });

    const certificate = new acm.DnsValidatedCertificate(this, 'CrossRegionCertificate', {
      domainName: props.domain,
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
          aliases: [props.domain],
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
			recordName: props.domain,
		});
  }
}
