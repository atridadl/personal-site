import { Stack, StackProps, CfnParameter } from "aws-cdk-lib";
import { aws_s3 as s3 } from "aws-cdk-lib";
import { aws_s3_deployment as s3Deployment } from "aws-cdk-lib";
import { aws_cloudfront as cloudfront } from "aws-cdk-lib";
import { aws_certificatemanager as acm } from "aws-cdk-lib";
import { aws_route53 as route53 } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ARecord, RecordTarget } from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";

interface SPAStackProps extends StackProps {
  stage: string,
  domain: string,
};

export class SPAStack extends Stack {
  public bucket: s3.Bucket;
  constructor(scope: Construct, id: string, props: SPAStackProps) {
    super(scope, id, props);

    // S3 Bucket
    this.bucket = new s3.Bucket(this, `${ props.stage }-SPAStaticBucket`, {
      publicReadAccess: true,
      bucketName: `${ props.stage }-spa-static-bucket`,
      websiteIndexDocument: "index.html",
    });
  }
}
