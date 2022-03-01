"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_cdk_lib_2 = require("aws-cdk-lib");
const aws_cdk_lib_3 = require("aws-cdk-lib");
const aws_cdk_lib_4 = require("aws-cdk-lib");
const aws_cdk_lib_5 = require("aws-cdk-lib");
const aws_cdk_lib_6 = require("aws-cdk-lib");
const aws_route53_1 = require("aws-cdk-lib/aws-route53");
const aws_route53_targets_1 = require("aws-cdk-lib/aws-route53-targets");
const ssm = require("aws-cdk-lib/aws-ssm");
class CdkStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // Grab Config
        const environmentConfig = {
            domain: ssm.StringParameter.valueForStringParameter(this, "domain"),
            hostedZoneID: ssm.StringParameter.valueForStringParameter(this, "hostedZoneID")
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
        new aws_cdk_lib_1.CfnOutput(this, "certificate-arn", {
            value: certificate.certificateArn,
            exportName: "certificate-arn",
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
exports.CdkStack = CdkStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUFxRjtBQUNyRiw2Q0FBMkM7QUFDM0MsNkNBQWdFO0FBQ2hFLDZDQUEyRDtBQUMzRCw2Q0FBNEQ7QUFDNUQsNkNBQXFEO0FBRXJELHlEQUFnRTtBQUNoRSx5RUFBbUU7QUFDbkUsMkNBQTJDO0FBRzNDLE1BQWEsUUFBUyxTQUFRLG1CQUFLO0lBQ2pDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDMUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsY0FBYztRQUNkLE1BQU0saUJBQWlCLEdBQUc7WUFDeEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxlQUFlLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQztZQUNuRSxZQUFZLEVBQUUsR0FBRyxDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDO1NBQ2hGLENBQUM7UUFFRixZQUFZO1FBQ1osTUFBTSxNQUFNLEdBQUcsSUFBSSxvQkFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsMEJBQTBCLEVBQUU7WUFDN0QsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixVQUFVLEVBQUUsNkJBQTZCO1lBQ3pDLG9CQUFvQixFQUFFLFlBQVk7U0FDbkMsQ0FBQyxDQUFDO1FBRUgsdUJBQXVCO1FBQ3ZCLElBQUksK0JBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsMEJBQTBCLEVBQUU7WUFDbEUsT0FBTyxFQUFFLENBQUMsK0JBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQy9DLGlCQUFpQixFQUFFLE1BQU07U0FDMUIsQ0FBQyxDQUFDO1FBRUgsUUFBUTtRQUNSLE1BQU0sVUFBVSxHQUFHLHlCQUFPLENBQUMsVUFBVSxDQUFDLHdCQUF3QixDQUFDLElBQUksRUFBRSx3QkFBd0IsRUFBRTtZQUM3RixRQUFRLEVBQUUsaUJBQWlCLENBQUMsTUFBTTtZQUNsQyxZQUFZLEVBQUUsaUJBQWlCLENBQUMsWUFBWTtTQUM3QyxDQUFDLENBQUM7UUFFSCxNQUFNLFdBQVcsR0FBRyxJQUFJLG9DQUFHLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLHdCQUF3QixFQUFFO1lBQ2xGLFVBQVUsRUFBRSxpQkFBaUIsQ0FBQyxNQUFNO1lBQ3BDLFVBQVU7WUFDVixNQUFNLEVBQUUsV0FBVztTQUNwQixDQUFDLENBQUM7UUFFTCxJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFO1lBQ3RDLEtBQUssRUFBRSxXQUFXLENBQUMsY0FBYztZQUNqQyxVQUFVLEVBQUUsaUJBQWlCO1NBQzdCLENBQUMsQ0FBQztRQUVELGFBQWE7UUFDZCxNQUFNLE1BQU0sR0FBRyxJQUFJLDRCQUFVLENBQUMseUJBQXlCLENBQUMsSUFBSSxFQUFFLG9DQUFvQyxFQUFFO1lBQ2pHLGFBQWEsRUFBRSxDQUFDO29CQUNkLGNBQWMsRUFBRTt3QkFDZCxjQUFjLEVBQUUsTUFBTTtxQkFDdkI7b0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsQ0FBQztpQkFDekMsQ0FBQztZQUNGLGlCQUFpQixFQUFFLDRCQUFVLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFO2dCQUM1RSxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUM7Z0JBQ25DLGNBQWMsRUFBRSw0QkFBVSxDQUFDLHNCQUFzQixDQUFDLE1BQU07Z0JBQ3hELFNBQVMsRUFBRSw0QkFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHO2FBQ3BDLENBQ0Y7WUFDRCxtQkFBbUIsRUFBRSxDQUFDO29CQUNwQixTQUFTLEVBQUUsR0FBRztvQkFDZCxZQUFZLEVBQUUsR0FBRztvQkFDakIsZ0JBQWdCLEVBQUUsYUFBYTtpQkFDaEM7Z0JBQ0Q7b0JBQ0UsU0FBUyxFQUFFLEdBQUc7b0JBQ2QsWUFBWSxFQUFFLEdBQUc7b0JBQ2pCLGdCQUFnQixFQUFFLGFBQWE7aUJBQ2hDLENBQUM7U0FDSCxDQUFDLENBQUM7UUFFSCxNQUFNLE1BQU0sR0FBRywwQkFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLHNDQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFFdEUsSUFBSSxxQkFBTyxDQUFDLElBQUksRUFBRSx3QkFBd0IsRUFBRTtZQUMzQyxJQUFJLEVBQUUsVUFBVTtZQUNoQixNQUFNO1lBQ04sVUFBVSxFQUFFLGlCQUFpQixDQUFDLE1BQU07U0FDcEMsQ0FBQyxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBMUVELDRCQTBFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzLCBDZm5PdXRwdXQsIGF3c19pb3Rjb3JlZGV2aWNlYWR2aXNvciB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IGF3c19zMyBhcyBzMyB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IGF3c19zM19kZXBsb3ltZW50IGFzIHMzRGVwbG95bWVudCB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IGF3c19jbG91ZGZyb250IGFzIGNsb3VkZnJvbnQgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBhd3NfY2VydGlmaWNhdGVtYW5hZ2VyIGFzIGFjbSB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IGF3c19yb3V0ZTUzIGFzIHJvdXRlNTMgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCB7IEFSZWNvcmQsIFJlY29yZFRhcmdldCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1yb3V0ZTUzJztcbmltcG9ydCB7IENsb3VkRnJvbnRUYXJnZXQgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtcm91dGU1My10YXJnZXRzJztcbmltcG9ydCAqIGFzIHNzbSBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc3NtJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJ3Byb2Nlc3MnO1xuXG5leHBvcnQgY2xhc3MgQ2RrU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgLy8gR3JhYiBDb25maWdcbiAgICBjb25zdCBlbnZpcm9ubWVudENvbmZpZyA9IHtcbiAgICAgIGRvbWFpbjogc3NtLlN0cmluZ1BhcmFtZXRlci52YWx1ZUZvclN0cmluZ1BhcmFtZXRlcih0aGlzLCBcImRvbWFpblwiKSxcbiAgICAgIGhvc3RlZFpvbmVJRDogc3NtLlN0cmluZ1BhcmFtZXRlci52YWx1ZUZvclN0cmluZ1BhcmFtZXRlcih0aGlzLCBcImhvc3RlZFpvbmVJRFwiKVxuICAgIH07XG5cbiAgICAvLyBTMyBCdWNrZXRcbiAgICBjb25zdCBidWNrZXQgPSBuZXcgczMuQnVja2V0KHRoaXMsIFwiUGVyc29uYWxTaXRlU3RhdGljQnVja2V0XCIsIHtcbiAgICAgIHB1YmxpY1JlYWRBY2Nlc3M6IHRydWUsXG4gICAgICBidWNrZXROYW1lOiBcInBlcnNvbmFsLXNpdGUtc3RhdGljLWJ1Y2tldFwiLFxuICAgICAgd2Vic2l0ZUluZGV4RG9jdW1lbnQ6IFwiaW5kZXguaHRtbFwiLFxuICAgIH0pO1xuXG4gICAgLy8gUzMgQnVja2V0IERlcGxveW1lbnRcbiAgICBuZXcgczNEZXBsb3ltZW50LkJ1Y2tldERlcGxveW1lbnQodGhpcywgXCJEZXBsb3lQZXJzb25hbFNpdGVTdGF0aWNcIiwge1xuICAgICAgc291cmNlczogW3MzRGVwbG95bWVudC5Tb3VyY2UuYXNzZXQoXCIuLi9kaXN0XCIpXSxcbiAgICAgIGRlc3RpbmF0aW9uQnVja2V0OiBidWNrZXRcbiAgICB9KTtcblxuICAgIC8vIENlcnRzXG4gICAgY29uc3QgaG9zdGVkWm9uZSA9IHJvdXRlNTMuSG9zdGVkWm9uZS5mcm9tSG9zdGVkWm9uZUF0dHJpYnV0ZXModGhpcywgXCJQZXJzb25hbFNpdGVIb3N0ZWRab25lXCIsIHtcbiAgICAgIHpvbmVOYW1lOiBlbnZpcm9ubWVudENvbmZpZy5kb21haW4sXG4gICAgICBob3N0ZWRab25lSWQ6IGVudmlyb25tZW50Q29uZmlnLmhvc3RlZFpvbmVJRFxuICAgIH0pO1xuXG4gICAgY29uc3QgY2VydGlmaWNhdGUgPSBuZXcgYWNtLkRuc1ZhbGlkYXRlZENlcnRpZmljYXRlKHRoaXMsICdDcm9zc1JlZ2lvbkNlcnRpZmljYXRlJywge1xuICAgICAgZG9tYWluTmFtZTogZW52aXJvbm1lbnRDb25maWcuZG9tYWluLFxuICAgICAgaG9zdGVkWm9uZSxcbiAgICAgIHJlZ2lvbjogXCJ1cy1lYXN0LTFcIixcbiAgICB9KTtcblxuXHRcdG5ldyBDZm5PdXRwdXQodGhpcywgXCJjZXJ0aWZpY2F0ZS1hcm5cIiwge1xuXHRcdFx0dmFsdWU6IGNlcnRpZmljYXRlLmNlcnRpZmljYXRlQXJuLFxuXHRcdFx0ZXhwb3J0TmFtZTogXCJjZXJ0aWZpY2F0ZS1hcm5cIixcblx0XHR9KTtcblxuICAgIC8vIENsb3VkZnJvbnRcbiAgIGNvbnN0IGNmRGlzdCA9IG5ldyBjbG91ZGZyb250LkNsb3VkRnJvbnRXZWJEaXN0cmlidXRpb24odGhpcywgXCJQZXJzb25hbFNpdGVTdGF0aWNCdWNrZXRDbG91ZGZyb250XCIsIHtcbiAgICAgIG9yaWdpbkNvbmZpZ3M6IFt7XG4gICAgICAgIHMzT3JpZ2luU291cmNlOiB7XG4gICAgICAgICAgczNCdWNrZXRTb3VyY2U6IGJ1Y2tldFxuICAgICAgICB9LFxuICAgICAgICBiZWhhdmlvcnM6IFt7IGlzRGVmYXVsdEJlaGF2aW9yOiB0cnVlIH1dXG4gICAgICB9XSxcbiAgICAgIHZpZXdlckNlcnRpZmljYXRlOiBjbG91ZGZyb250LlZpZXdlckNlcnRpZmljYXRlLmZyb21BY21DZXJ0aWZpY2F0ZShjZXJ0aWZpY2F0ZSwge1xuICAgICAgICAgIGFsaWFzZXM6IFtlbnZpcm9ubWVudENvbmZpZy5kb21haW5dLFxuICAgICAgICAgIHNlY3VyaXR5UG9saWN5OiBjbG91ZGZyb250LlNlY3VyaXR5UG9saWN5UHJvdG9jb2wuVExTX1YxLFxuICAgICAgICAgIHNzbE1ldGhvZDogY2xvdWRmcm9udC5TU0xNZXRob2QuU05JLFxuICAgICAgICB9LFxuICAgICAgKSxcbiAgICAgIGVycm9yQ29uZmlndXJhdGlvbnM6IFt7XG4gICAgICAgIGVycm9yQ29kZTogNDA0LFxuICAgICAgICByZXNwb25zZUNvZGU6IDIwMCxcbiAgICAgICAgcmVzcG9uc2VQYWdlUGF0aDogXCIvaW5kZXguaHRtbFwiLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZXJyb3JDb2RlOiA0MDMsXG4gICAgICAgIHJlc3BvbnNlQ29kZTogMjAwLFxuICAgICAgICByZXNwb25zZVBhZ2VQYXRoOiBcIi9pbmRleC5odG1sXCIsXG4gICAgICB9XVxuICAgIH0pO1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gUmVjb3JkVGFyZ2V0LmZyb21BbGlhcyhuZXcgQ2xvdWRGcm9udFRhcmdldChjZkRpc3QpKTtcblxuXHRcdG5ldyBBUmVjb3JkKHRoaXMsIFwicGVyc29uYWwtc2l0ZS1hLXJlY29yZFwiLCB7XG5cdFx0XHR6b25lOiBob3N0ZWRab25lLFxuXHRcdFx0dGFyZ2V0LFxuXHRcdFx0cmVjb3JkTmFtZTogZW52aXJvbm1lbnRDb25maWcuZG9tYWluLFxuXHRcdH0pO1xuICB9XG59XG4iXX0=