"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_cdk_lib_2 = require("aws-cdk-lib");
const aws_cdk_lib_3 = require("aws-cdk-lib");
const aws_cdk_lib_4 = require("aws-cdk-lib");
const aws_cdk_lib_5 = require("aws-cdk-lib");
const aws_cdk_lib_6 = require("aws-cdk-lib");
const aws_route53_1 = require("aws-cdk-lib/aws-route53");
const aws_route53_targets_1 = require("aws-cdk-lib/aws-route53-targets");
const ssm = require("aws-cdk-lib/aws-ssm");
class SiteStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // Grab Config
        const environmentConfig = {
            domain: ssm.StringParameter.valueForStringParameter(this, "domain"),
            hostedZoneID: ssm.StringParameter.valueForStringParameter(this, "hostedZoneID"),
        };
        // S3 Bucket
        const bucket = new aws_cdk_lib_2.aws_s3.Bucket(this, "PersonalSiteStaticBucket", {
            publicReadAccess: true,
            bucketName: "personal-site-static-bucket",
            websiteIndexDocument: "index.html",
        });
        // S3 Bucket Deployment
        new aws_cdk_lib_3.aws_s3_deployment.BucketDeployment(this, "DeployPersonalSiteStatic", {
            sources: [aws_cdk_lib_3.aws_s3_deployment.Source.asset("../dist")],
            destinationBucket: bucket
        });
        // Certs
        const hostedZone = aws_cdk_lib_6.aws_route53.HostedZone.fromHostedZoneAttributes(this, "PersonalSiteHostedZone", {
            zoneName: environmentConfig.domain,
            hostedZoneId: environmentConfig.hostedZoneID
        });
        const certificate = new aws_cdk_lib_5.aws_certificatemanager.DnsValidatedCertificate(this, 'CrossRegionCertificate', {
            domainName: environmentConfig.domain,
            hostedZone,
            region: "us-east-1",
        });
        // Cloudfront
        const cfDist = new aws_cdk_lib_4.aws_cloudfront.CloudFrontWebDistribution(this, "PersonalSiteStaticBucketCloudfront", {
            originConfigs: [{
                    s3OriginSource: {
                        s3BucketSource: bucket
                    },
                    behaviors: [{ isDefaultBehavior: true }]
                }],
            viewerCertificate: aws_cdk_lib_4.aws_cloudfront.ViewerCertificate.fromAcmCertificate(certificate, {
                aliases: [environmentConfig.domain],
                securityPolicy: aws_cdk_lib_4.aws_cloudfront.SecurityPolicyProtocol.TLS_V1,
                sslMethod: aws_cdk_lib_4.aws_cloudfront.SSLMethod.SNI,
            }),
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
        const target = aws_route53_1.RecordTarget.fromAlias(new aws_route53_targets_1.CloudFrontTarget(cfDist));
        new aws_route53_1.ARecord(this, "personal-site-a-record", {
            zone: hostedZone,
            target,
            recordName: environmentConfig.domain,
        });
    }
}
exports.SiteStack = SiteStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQXFGO0FBQ3JGLDZDQUEyQztBQUMzQyw2Q0FBZ0U7QUFDaEUsNkNBQTJEO0FBQzNELDZDQUE0RDtBQUM1RCw2Q0FBcUQ7QUFFckQseURBQWdFO0FBQ2hFLHlFQUFtRTtBQUNuRSwyQ0FBMkM7QUFFM0MsTUFBYSxTQUFVLFNBQVEsbUJBQUs7SUFDbEMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFpQjtRQUN6RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixjQUFjO1FBQ2QsTUFBTSxpQkFBaUIsR0FBRztZQUN4QixNQUFNLEVBQUUsR0FBRyxDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDO1lBQ25FLFlBQVksRUFBRSxHQUFHLENBQUMsZUFBZSxDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSxjQUFjLENBQUM7U0FDaEYsQ0FBQztRQUVGLFlBQVk7UUFDWixNQUFNLE1BQU0sR0FBRyxJQUFJLG9CQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSwwQkFBMEIsRUFBRTtZQUM3RCxnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLFVBQVUsRUFBRSw2QkFBNkI7WUFDekMsb0JBQW9CLEVBQUUsWUFBWTtTQUNuQyxDQUFDLENBQUM7UUFFSCx1QkFBdUI7UUFDdkIsSUFBSSwrQkFBWSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSwwQkFBMEIsRUFBRTtZQUNsRSxPQUFPLEVBQUUsQ0FBQywrQkFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDL0MsaUJBQWlCLEVBQUUsTUFBTTtTQUMxQixDQUFDLENBQUM7UUFFSCxRQUFRO1FBQ1IsTUFBTSxVQUFVLEdBQUcseUJBQU8sQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUMsSUFBSSxFQUFFLHdCQUF3QixFQUFFO1lBQzdGLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxNQUFNO1lBQ2xDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxZQUFZO1NBQzdDLENBQUMsQ0FBQztRQUVILE1BQU0sV0FBVyxHQUFHLElBQUksb0NBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsd0JBQXdCLEVBQUU7WUFDbEYsVUFBVSxFQUFFLGlCQUFpQixDQUFDLE1BQU07WUFDcEMsVUFBVTtZQUNWLE1BQU0sRUFBRSxXQUFXO1NBQ3BCLENBQUMsQ0FBQztRQUVILGFBQWE7UUFDZCxNQUFNLE1BQU0sR0FBRyxJQUFJLDRCQUFVLENBQUMseUJBQXlCLENBQUMsSUFBSSxFQUFFLG9DQUFvQyxFQUFFO1lBQ2pHLGFBQWEsRUFBRSxDQUFDO29CQUNkLGNBQWMsRUFBRTt3QkFDZCxjQUFjLEVBQUUsTUFBTTtxQkFDdkI7b0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsQ0FBQztpQkFDekMsQ0FBQztZQUNGLGlCQUFpQixFQUFFLDRCQUFVLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFO2dCQUM1RSxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUM7Z0JBQ25DLGNBQWMsRUFBRSw0QkFBVSxDQUFDLHNCQUFzQixDQUFDLE1BQU07Z0JBQ3hELFNBQVMsRUFBRSw0QkFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHO2FBQ3BDLENBQ0Y7WUFDRCxtQkFBbUIsRUFBRSxDQUFDO29CQUNwQixTQUFTLEVBQUUsR0FBRztvQkFDZCxZQUFZLEVBQUUsR0FBRztvQkFDakIsZ0JBQWdCLEVBQUUsYUFBYTtpQkFDaEM7Z0JBQ0Q7b0JBQ0UsU0FBUyxFQUFFLEdBQUc7b0JBQ2QsWUFBWSxFQUFFLEdBQUc7b0JBQ2pCLGdCQUFnQixFQUFFLGFBQWE7aUJBQ2hDLENBQUM7U0FDSCxDQUFDLENBQUM7UUFFSCxNQUFNLE1BQU0sR0FBRywwQkFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLHNDQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFFdEUsSUFBSSxxQkFBTyxDQUFDLElBQUksRUFBRSx3QkFBd0IsRUFBRTtZQUMzQyxJQUFJLEVBQUUsVUFBVTtZQUNoQixNQUFNO1lBQ04sVUFBVSxFQUFFLGlCQUFpQixDQUFDLE1BQU07U0FDcEMsQ0FBQyxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBckVELDhCQXFFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzLCBDZm5PdXRwdXQsIGF3c19pb3Rjb3JlZGV2aWNlYWR2aXNvciB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IGF3c19zMyBhcyBzMyB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IGF3c19zM19kZXBsb3ltZW50IGFzIHMzRGVwbG95bWVudCB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IGF3c19jbG91ZGZyb250IGFzIGNsb3VkZnJvbnQgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBhd3NfY2VydGlmaWNhdGVtYW5hZ2VyIGFzIGFjbSB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IGF3c19yb3V0ZTUzIGFzIHJvdXRlNTMgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCB7IEFSZWNvcmQsIFJlY29yZFRhcmdldCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1yb3V0ZTUzJztcbmltcG9ydCB7IENsb3VkRnJvbnRUYXJnZXQgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtcm91dGU1My10YXJnZXRzJztcbmltcG9ydCAqIGFzIHNzbSBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc3NtJztcblxuZXhwb3J0IGNsYXNzIFNpdGVTdGFjayBleHRlbmRzIFN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IFN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIC8vIEdyYWIgQ29uZmlnXG4gICAgY29uc3QgZW52aXJvbm1lbnRDb25maWcgPSB7XG4gICAgICBkb21haW46IHNzbS5TdHJpbmdQYXJhbWV0ZXIudmFsdWVGb3JTdHJpbmdQYXJhbWV0ZXIodGhpcywgXCJkb21haW5cIiksXG4gICAgICBob3N0ZWRab25lSUQ6IHNzbS5TdHJpbmdQYXJhbWV0ZXIudmFsdWVGb3JTdHJpbmdQYXJhbWV0ZXIodGhpcywgXCJob3N0ZWRab25lSURcIiksXG4gICAgfTtcblxuICAgIC8vIFMzIEJ1Y2tldFxuICAgIGNvbnN0IGJ1Y2tldCA9IG5ldyBzMy5CdWNrZXQodGhpcywgXCJQZXJzb25hbFNpdGVTdGF0aWNCdWNrZXRcIiwge1xuICAgICAgcHVibGljUmVhZEFjY2VzczogdHJ1ZSxcbiAgICAgIGJ1Y2tldE5hbWU6IFwicGVyc29uYWwtc2l0ZS1zdGF0aWMtYnVja2V0XCIsXG4gICAgICB3ZWJzaXRlSW5kZXhEb2N1bWVudDogXCJpbmRleC5odG1sXCIsXG4gICAgfSk7XG5cbiAgICAvLyBTMyBCdWNrZXQgRGVwbG95bWVudFxuICAgIG5ldyBzM0RlcGxveW1lbnQuQnVja2V0RGVwbG95bWVudCh0aGlzLCBcIkRlcGxveVBlcnNvbmFsU2l0ZVN0YXRpY1wiLCB7XG4gICAgICBzb3VyY2VzOiBbczNEZXBsb3ltZW50LlNvdXJjZS5hc3NldChcIi4uL2Rpc3RcIildLFxuICAgICAgZGVzdGluYXRpb25CdWNrZXQ6IGJ1Y2tldFxuICAgIH0pO1xuXG4gICAgLy8gQ2VydHNcbiAgICBjb25zdCBob3N0ZWRab25lID0gcm91dGU1My5Ib3N0ZWRab25lLmZyb21Ib3N0ZWRab25lQXR0cmlidXRlcyh0aGlzLCBcIlBlcnNvbmFsU2l0ZUhvc3RlZFpvbmVcIiwge1xuICAgICAgem9uZU5hbWU6IGVudmlyb25tZW50Q29uZmlnLmRvbWFpbixcbiAgICAgIGhvc3RlZFpvbmVJZDogZW52aXJvbm1lbnRDb25maWcuaG9zdGVkWm9uZUlEXG4gICAgfSk7XG5cbiAgICBjb25zdCBjZXJ0aWZpY2F0ZSA9IG5ldyBhY20uRG5zVmFsaWRhdGVkQ2VydGlmaWNhdGUodGhpcywgJ0Nyb3NzUmVnaW9uQ2VydGlmaWNhdGUnLCB7XG4gICAgICBkb21haW5OYW1lOiBlbnZpcm9ubWVudENvbmZpZy5kb21haW4sXG4gICAgICBob3N0ZWRab25lLFxuICAgICAgcmVnaW9uOiBcInVzLWVhc3QtMVwiLFxuICAgIH0pO1xuXG4gICAgLy8gQ2xvdWRmcm9udFxuICAgY29uc3QgY2ZEaXN0ID0gbmV3IGNsb3VkZnJvbnQuQ2xvdWRGcm9udFdlYkRpc3RyaWJ1dGlvbih0aGlzLCBcIlBlcnNvbmFsU2l0ZVN0YXRpY0J1Y2tldENsb3VkZnJvbnRcIiwge1xuICAgICAgb3JpZ2luQ29uZmlnczogW3tcbiAgICAgICAgczNPcmlnaW5Tb3VyY2U6IHtcbiAgICAgICAgICBzM0J1Y2tldFNvdXJjZTogYnVja2V0XG4gICAgICAgIH0sXG4gICAgICAgIGJlaGF2aW9yczogW3sgaXNEZWZhdWx0QmVoYXZpb3I6IHRydWUgfV1cbiAgICAgIH1dLFxuICAgICAgdmlld2VyQ2VydGlmaWNhdGU6IGNsb3VkZnJvbnQuVmlld2VyQ2VydGlmaWNhdGUuZnJvbUFjbUNlcnRpZmljYXRlKGNlcnRpZmljYXRlLCB7XG4gICAgICAgICAgYWxpYXNlczogW2Vudmlyb25tZW50Q29uZmlnLmRvbWFpbl0sXG4gICAgICAgICAgc2VjdXJpdHlQb2xpY3k6IGNsb3VkZnJvbnQuU2VjdXJpdHlQb2xpY3lQcm90b2NvbC5UTFNfVjEsXG4gICAgICAgICAgc3NsTWV0aG9kOiBjbG91ZGZyb250LlNTTE1ldGhvZC5TTkksXG4gICAgICAgIH0sXG4gICAgICApLFxuICAgICAgZXJyb3JDb25maWd1cmF0aW9uczogW3tcbiAgICAgICAgZXJyb3JDb2RlOiA0MDQsXG4gICAgICAgIHJlc3BvbnNlQ29kZTogMjAwLFxuICAgICAgICByZXNwb25zZVBhZ2VQYXRoOiBcIi9pbmRleC5odG1sXCIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBlcnJvckNvZGU6IDQwMyxcbiAgICAgICAgcmVzcG9uc2VDb2RlOiAyMDAsXG4gICAgICAgIHJlc3BvbnNlUGFnZVBhdGg6IFwiL2luZGV4Lmh0bWxcIixcbiAgICAgIH1dXG4gICAgfSk7XG5cbiAgICBjb25zdCB0YXJnZXQgPSBSZWNvcmRUYXJnZXQuZnJvbUFsaWFzKG5ldyBDbG91ZEZyb250VGFyZ2V0KGNmRGlzdCkpO1xuXG5cdFx0bmV3IEFSZWNvcmQodGhpcywgXCJwZXJzb25hbC1zaXRlLWEtcmVjb3JkXCIsIHtcblx0XHRcdHpvbmU6IGhvc3RlZFpvbmUsXG5cdFx0XHR0YXJnZXQsXG5cdFx0XHRyZWNvcmROYW1lOiBlbnZpcm9ubWVudENvbmZpZy5kb21haW4sXG5cdFx0fSk7XG4gIH1cbn1cbiJdfQ==