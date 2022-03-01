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
exports.SiteStack = SiteStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQXFGO0FBQ3JGLDZDQUEyQztBQUMzQyw2Q0FBZ0U7QUFDaEUsNkNBQTJEO0FBQzNELDZDQUE0RDtBQUM1RCw2Q0FBcUQ7QUFFckQseURBQWdFO0FBQ2hFLHlFQUFtRTtBQUNuRSwyQ0FBMkM7QUFHM0MsTUFBYSxTQUFVLFNBQVEsbUJBQUs7SUFDbEMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixjQUFjO1FBQ2QsTUFBTSxpQkFBaUIsR0FBRztZQUN4QixNQUFNLEVBQUUsR0FBRyxDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDO1lBQ25FLFlBQVksRUFBRSxHQUFHLENBQUMsZUFBZSxDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSxjQUFjLENBQUM7U0FDaEYsQ0FBQztRQUVGLFlBQVk7UUFDWixNQUFNLE1BQU0sR0FBRyxJQUFJLG9CQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSwwQkFBMEIsRUFBRTtZQUM3RCxnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLFVBQVUsRUFBRSw2QkFBNkI7WUFDekMsb0JBQW9CLEVBQUUsWUFBWTtTQUNuQyxDQUFDLENBQUM7UUFFSCx1QkFBdUI7UUFDdkIsSUFBSSwrQkFBWSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSwwQkFBMEIsRUFBRTtZQUNsRSxPQUFPLEVBQUUsQ0FBQywrQkFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDL0MsaUJBQWlCLEVBQUUsTUFBTTtTQUMxQixDQUFDLENBQUM7UUFFSCxRQUFRO1FBQ1IsTUFBTSxVQUFVLEdBQUcseUJBQU8sQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUMsSUFBSSxFQUFFLHdCQUF3QixFQUFFO1lBQzdGLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxNQUFNO1lBQ2xDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxZQUFZO1NBQzdDLENBQUMsQ0FBQztRQUVILE1BQU0sV0FBVyxHQUFHLElBQUksb0NBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsd0JBQXdCLEVBQUU7WUFDbEYsVUFBVSxFQUFFLGlCQUFpQixDQUFDLE1BQU07WUFDcEMsVUFBVTtZQUNWLE1BQU0sRUFBRSxXQUFXO1NBQ3BCLENBQUMsQ0FBQztRQUVMLElBQUksdUJBQVMsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7WUFDdEMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxjQUFjO1lBQ2pDLFVBQVUsRUFBRSxpQkFBaUI7U0FDN0IsQ0FBQyxDQUFDO1FBRUQsYUFBYTtRQUNkLE1BQU0sTUFBTSxHQUFHLElBQUksNEJBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLEVBQUUsb0NBQW9DLEVBQUU7WUFDakcsYUFBYSxFQUFFLENBQUM7b0JBQ2QsY0FBYyxFQUFFO3dCQUNkLGNBQWMsRUFBRSxNQUFNO3FCQUN2QjtvQkFDRCxTQUFTLEVBQUUsQ0FBQyxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDO2lCQUN6QyxDQUFDO1lBQ0YsaUJBQWlCLEVBQUUsNEJBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUU7Z0JBQzVFLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztnQkFDbkMsY0FBYyxFQUFFLDRCQUFVLENBQUMsc0JBQXNCLENBQUMsTUFBTTtnQkFDeEQsU0FBUyxFQUFFLDRCQUFVLENBQUMsU0FBUyxDQUFDLEdBQUc7YUFDcEMsQ0FDRjtZQUNELG1CQUFtQixFQUFFLENBQUM7b0JBQ3BCLFNBQVMsRUFBRSxHQUFHO29CQUNkLFlBQVksRUFBRSxHQUFHO29CQUNqQixnQkFBZ0IsRUFBRSxhQUFhO2lCQUNoQztnQkFDRDtvQkFDRSxTQUFTLEVBQUUsR0FBRztvQkFDZCxZQUFZLEVBQUUsR0FBRztvQkFDakIsZ0JBQWdCLEVBQUUsYUFBYTtpQkFDaEMsQ0FBQztTQUNILENBQUMsQ0FBQztRQUVILE1BQU0sTUFBTSxHQUFHLDBCQUFZLENBQUMsU0FBUyxDQUFDLElBQUksc0NBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUV0RSxJQUFJLHFCQUFPLENBQUMsSUFBSSxFQUFFLHdCQUF3QixFQUFFO1lBQzNDLElBQUksRUFBRSxVQUFVO1lBQ2hCLE1BQU07WUFDTixVQUFVLEVBQUUsaUJBQWlCLENBQUMsTUFBTTtTQUNwQyxDQUFDLENBQUM7SUFDSCxDQUFDO0NBQ0Y7QUExRUQsOEJBMEVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhY2ssIFN0YWNrUHJvcHMsIENmbk91dHB1dCwgYXdzX2lvdGNvcmVkZXZpY2VhZHZpc29yIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgYXdzX3MzIGFzIHMzIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgYXdzX3MzX2RlcGxveW1lbnQgYXMgczNEZXBsb3ltZW50IH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgYXdzX2Nsb3VkZnJvbnQgYXMgY2xvdWRmcm9udCB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IGF3c19jZXJ0aWZpY2F0ZW1hbmFnZXIgYXMgYWNtIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgYXdzX3JvdXRlNTMgYXMgcm91dGU1MyB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0IHsgQVJlY29yZCwgUmVjb3JkVGFyZ2V0IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLXJvdXRlNTMnO1xuaW1wb3J0IHsgQ2xvdWRGcm9udFRhcmdldCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1yb3V0ZTUzLXRhcmdldHMnO1xuaW1wb3J0ICogYXMgc3NtIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zc20nO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAncHJvY2Vzcyc7XG5cbmV4cG9ydCBjbGFzcyBTaXRlU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgLy8gR3JhYiBDb25maWdcbiAgICBjb25zdCBlbnZpcm9ubWVudENvbmZpZyA9IHtcbiAgICAgIGRvbWFpbjogc3NtLlN0cmluZ1BhcmFtZXRlci52YWx1ZUZvclN0cmluZ1BhcmFtZXRlcih0aGlzLCBcImRvbWFpblwiKSxcbiAgICAgIGhvc3RlZFpvbmVJRDogc3NtLlN0cmluZ1BhcmFtZXRlci52YWx1ZUZvclN0cmluZ1BhcmFtZXRlcih0aGlzLCBcImhvc3RlZFpvbmVJRFwiKVxuICAgIH07XG5cbiAgICAvLyBTMyBCdWNrZXRcbiAgICBjb25zdCBidWNrZXQgPSBuZXcgczMuQnVja2V0KHRoaXMsIFwiUGVyc29uYWxTaXRlU3RhdGljQnVja2V0XCIsIHtcbiAgICAgIHB1YmxpY1JlYWRBY2Nlc3M6IHRydWUsXG4gICAgICBidWNrZXROYW1lOiBcInBlcnNvbmFsLXNpdGUtc3RhdGljLWJ1Y2tldFwiLFxuICAgICAgd2Vic2l0ZUluZGV4RG9jdW1lbnQ6IFwiaW5kZXguaHRtbFwiLFxuICAgIH0pO1xuXG4gICAgLy8gUzMgQnVja2V0IERlcGxveW1lbnRcbiAgICBuZXcgczNEZXBsb3ltZW50LkJ1Y2tldERlcGxveW1lbnQodGhpcywgXCJEZXBsb3lQZXJzb25hbFNpdGVTdGF0aWNcIiwge1xuICAgICAgc291cmNlczogW3MzRGVwbG95bWVudC5Tb3VyY2UuYXNzZXQoXCIuLi9kaXN0XCIpXSxcbiAgICAgIGRlc3RpbmF0aW9uQnVja2V0OiBidWNrZXRcbiAgICB9KTtcblxuICAgIC8vIENlcnRzXG4gICAgY29uc3QgaG9zdGVkWm9uZSA9IHJvdXRlNTMuSG9zdGVkWm9uZS5mcm9tSG9zdGVkWm9uZUF0dHJpYnV0ZXModGhpcywgXCJQZXJzb25hbFNpdGVIb3N0ZWRab25lXCIsIHtcbiAgICAgIHpvbmVOYW1lOiBlbnZpcm9ubWVudENvbmZpZy5kb21haW4sXG4gICAgICBob3N0ZWRab25lSWQ6IGVudmlyb25tZW50Q29uZmlnLmhvc3RlZFpvbmVJRFxuICAgIH0pO1xuXG4gICAgY29uc3QgY2VydGlmaWNhdGUgPSBuZXcgYWNtLkRuc1ZhbGlkYXRlZENlcnRpZmljYXRlKHRoaXMsICdDcm9zc1JlZ2lvbkNlcnRpZmljYXRlJywge1xuICAgICAgZG9tYWluTmFtZTogZW52aXJvbm1lbnRDb25maWcuZG9tYWluLFxuICAgICAgaG9zdGVkWm9uZSxcbiAgICAgIHJlZ2lvbjogXCJ1cy1lYXN0LTFcIixcbiAgICB9KTtcblxuXHRcdG5ldyBDZm5PdXRwdXQodGhpcywgXCJjZXJ0aWZpY2F0ZS1hcm5cIiwge1xuXHRcdFx0dmFsdWU6IGNlcnRpZmljYXRlLmNlcnRpZmljYXRlQXJuLFxuXHRcdFx0ZXhwb3J0TmFtZTogXCJjZXJ0aWZpY2F0ZS1hcm5cIixcblx0XHR9KTtcblxuICAgIC8vIENsb3VkZnJvbnRcbiAgIGNvbnN0IGNmRGlzdCA9IG5ldyBjbG91ZGZyb250LkNsb3VkRnJvbnRXZWJEaXN0cmlidXRpb24odGhpcywgXCJQZXJzb25hbFNpdGVTdGF0aWNCdWNrZXRDbG91ZGZyb250XCIsIHtcbiAgICAgIG9yaWdpbkNvbmZpZ3M6IFt7XG4gICAgICAgIHMzT3JpZ2luU291cmNlOiB7XG4gICAgICAgICAgczNCdWNrZXRTb3VyY2U6IGJ1Y2tldFxuICAgICAgICB9LFxuICAgICAgICBiZWhhdmlvcnM6IFt7IGlzRGVmYXVsdEJlaGF2aW9yOiB0cnVlIH1dXG4gICAgICB9XSxcbiAgICAgIHZpZXdlckNlcnRpZmljYXRlOiBjbG91ZGZyb250LlZpZXdlckNlcnRpZmljYXRlLmZyb21BY21DZXJ0aWZpY2F0ZShjZXJ0aWZpY2F0ZSwge1xuICAgICAgICAgIGFsaWFzZXM6IFtlbnZpcm9ubWVudENvbmZpZy5kb21haW5dLFxuICAgICAgICAgIHNlY3VyaXR5UG9saWN5OiBjbG91ZGZyb250LlNlY3VyaXR5UG9saWN5UHJvdG9jb2wuVExTX1YxLFxuICAgICAgICAgIHNzbE1ldGhvZDogY2xvdWRmcm9udC5TU0xNZXRob2QuU05JLFxuICAgICAgICB9LFxuICAgICAgKSxcbiAgICAgIGVycm9yQ29uZmlndXJhdGlvbnM6IFt7XG4gICAgICAgIGVycm9yQ29kZTogNDA0LFxuICAgICAgICByZXNwb25zZUNvZGU6IDIwMCxcbiAgICAgICAgcmVzcG9uc2VQYWdlUGF0aDogXCIvaW5kZXguaHRtbFwiLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZXJyb3JDb2RlOiA0MDMsXG4gICAgICAgIHJlc3BvbnNlQ29kZTogMjAwLFxuICAgICAgICByZXNwb25zZVBhZ2VQYXRoOiBcIi9pbmRleC5odG1sXCIsXG4gICAgICB9XVxuICAgIH0pO1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gUmVjb3JkVGFyZ2V0LmZyb21BbGlhcyhuZXcgQ2xvdWRGcm9udFRhcmdldChjZkRpc3QpKTtcblxuXHRcdG5ldyBBUmVjb3JkKHRoaXMsIFwicGVyc29uYWwtc2l0ZS1hLXJlY29yZFwiLCB7XG5cdFx0XHR6b25lOiBob3N0ZWRab25lLFxuXHRcdFx0dGFyZ2V0LFxuXHRcdFx0cmVjb3JkTmFtZTogZW52aXJvbm1lbnRDb25maWcuZG9tYWluLFxuXHRcdH0pO1xuICB9XG59XG4iXX0=