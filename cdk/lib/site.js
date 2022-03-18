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
class SiteStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // Params
        const domain = new aws_cdk_lib_1.CfnParameter(this, "domain", {
            type: "String",
            description: "The name of the Amazon S3 bucket where uploaded files will be stored."
        });
        const hostedZoneID = new aws_cdk_lib_1.CfnParameter(this, "hostedZoneID", {
            type: "String",
            description: "The name of the Amazon S3 bucket where uploaded files will be stored."
        });
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
            zoneName: domain.valueAsString,
            hostedZoneId: hostedZoneID.valueAsString
        });
        const certificate = new aws_cdk_lib_5.aws_certificatemanager.DnsValidatedCertificate(this, 'CrossRegionCertificate', {
            domainName: domain.valueAsString,
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
                aliases: [domain.valueAsString],
                securityPolicy: aws_cdk_lib_4.aws_cloudfront.SecurityPolicyProtocol.TLS_V1,
                sslMethod: aws_cdk_lib_4.aws_cloudfront.SSLMethod.SNI,
            }),
            errorConfigurations: [{
                    errorCode: 404,
                    responseCode: 200,
                    responsePagePath: "/index.html",
                }]
        });
        const target = aws_route53_1.RecordTarget.fromAlias(new aws_route53_targets_1.CloudFrontTarget(cfDist));
        new aws_route53_1.ARecord(this, "personal-site-a-record", {
            zone: hostedZone,
            target,
            recordName: domain.valueAsString,
        });
    }
}
exports.SiteStack = SiteStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQThEO0FBQzlELDZDQUEyQztBQUMzQyw2Q0FBZ0U7QUFDaEUsNkNBQTJEO0FBQzNELDZDQUE0RDtBQUM1RCw2Q0FBcUQ7QUFFckQseURBQWdFO0FBQ2hFLHlFQUFtRTtBQUVuRSxNQUFhLFNBQVUsU0FBUSxtQkFBSztJQUNsQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWlCO1FBQ3pELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLFNBQVM7UUFDVCxNQUFNLE1BQU0sR0FBRyxJQUFJLDBCQUFZLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtZQUM5QyxJQUFJLEVBQUUsUUFBUTtZQUNkLFdBQVcsRUFBRSx1RUFBdUU7U0FBQyxDQUFDLENBQUM7UUFFekYsTUFBTSxZQUFZLEdBQUcsSUFBSSwwQkFBWSxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDMUQsSUFBSSxFQUFFLFFBQVE7WUFDZCxXQUFXLEVBQUUsdUVBQXVFO1NBQUMsQ0FBQyxDQUFDO1FBRXpGLFlBQVk7UUFDWixNQUFNLE1BQU0sR0FBRyxJQUFJLG9CQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSwwQkFBMEIsRUFBRTtZQUM3RCxnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLFVBQVUsRUFBRSw2QkFBNkI7WUFDekMsb0JBQW9CLEVBQUUsWUFBWTtTQUNuQyxDQUFDLENBQUM7UUFFSCx1QkFBdUI7UUFDdkIsSUFBSSwrQkFBWSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSwwQkFBMEIsRUFBRTtZQUNsRSxPQUFPLEVBQUUsQ0FBQywrQkFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDL0MsaUJBQWlCLEVBQUUsTUFBTTtTQUMxQixDQUFDLENBQUM7UUFFSCxRQUFRO1FBQ1IsTUFBTSxVQUFVLEdBQUcseUJBQU8sQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUMsSUFBSSxFQUFFLHdCQUF3QixFQUFFO1lBQzdGLFFBQVEsRUFBRSxNQUFNLENBQUMsYUFBYTtZQUM5QixZQUFZLEVBQUUsWUFBWSxDQUFDLGFBQWE7U0FDekMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxXQUFXLEdBQUcsSUFBSSxvQ0FBRyxDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSx3QkFBd0IsRUFBRTtZQUNsRixVQUFVLEVBQUUsTUFBTSxDQUFDLGFBQWE7WUFDaEMsVUFBVTtZQUNWLE1BQU0sRUFBRSxXQUFXO1NBQ3BCLENBQUMsQ0FBQztRQUVILGFBQWE7UUFDZCxNQUFNLE1BQU0sR0FBRyxJQUFJLDRCQUFVLENBQUMseUJBQXlCLENBQUMsSUFBSSxFQUFFLG9DQUFvQyxFQUFFO1lBQ2pHLGFBQWEsRUFBRSxDQUFDO29CQUNkLGNBQWMsRUFBRTt3QkFDZCxjQUFjLEVBQUUsTUFBTTtxQkFDdkI7b0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsQ0FBQztpQkFDekMsQ0FBQztZQUNGLGlCQUFpQixFQUFFLDRCQUFVLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFO2dCQUM1RSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO2dCQUMvQixjQUFjLEVBQUUsNEJBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNO2dCQUN4RCxTQUFTLEVBQUUsNEJBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRzthQUNwQyxDQUNGO1lBQ0QsbUJBQW1CLEVBQUUsQ0FBQztvQkFDcEIsU0FBUyxFQUFFLEdBQUc7b0JBQ2QsWUFBWSxFQUFFLEdBQUc7b0JBQ2pCLGdCQUFnQixFQUFFLGFBQWE7aUJBQ2hDLENBQUM7U0FDSCxDQUFDLENBQUM7UUFFSCxNQUFNLE1BQU0sR0FBRywwQkFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLHNDQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFFdEUsSUFBSSxxQkFBTyxDQUFDLElBQUksRUFBRSx3QkFBd0IsRUFBRTtZQUMzQyxJQUFJLEVBQUUsVUFBVTtZQUNoQixNQUFNO1lBQ04sVUFBVSxFQUFFLE1BQU0sQ0FBQyxhQUFhO1NBQ2hDLENBQUMsQ0FBQztJQUNILENBQUM7Q0FDRjtBQW5FRCw4QkFtRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGFjaywgU3RhY2tQcm9wcywgQ2ZuUGFyYW1ldGVyIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgYXdzX3MzIGFzIHMzIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgYXdzX3MzX2RlcGxveW1lbnQgYXMgczNEZXBsb3ltZW50IH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgYXdzX2Nsb3VkZnJvbnQgYXMgY2xvdWRmcm9udCB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IGF3c19jZXJ0aWZpY2F0ZW1hbmFnZXIgYXMgYWNtIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgYXdzX3JvdXRlNTMgYXMgcm91dGU1MyB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0IHsgQVJlY29yZCwgUmVjb3JkVGFyZ2V0IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLXJvdXRlNTMnO1xuaW1wb3J0IHsgQ2xvdWRGcm9udFRhcmdldCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1yb3V0ZTUzLXRhcmdldHMnO1xuXG5leHBvcnQgY2xhc3MgU2l0ZVN0YWNrIGV4dGVuZHMgU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgLy8gUGFyYW1zXG4gICAgY29uc3QgZG9tYWluID0gbmV3IENmblBhcmFtZXRlcih0aGlzLCBcImRvbWFpblwiLCB7XG4gICAgICB0eXBlOiBcIlN0cmluZ1wiLFxuICAgICAgZGVzY3JpcHRpb246IFwiVGhlIG5hbWUgb2YgdGhlIEFtYXpvbiBTMyBidWNrZXQgd2hlcmUgdXBsb2FkZWQgZmlsZXMgd2lsbCBiZSBzdG9yZWQuXCJ9KTtcblxuICAgIGNvbnN0IGhvc3RlZFpvbmVJRCA9IG5ldyBDZm5QYXJhbWV0ZXIodGhpcywgXCJob3N0ZWRab25lSURcIiwge1xuICAgICAgdHlwZTogXCJTdHJpbmdcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBuYW1lIG9mIHRoZSBBbWF6b24gUzMgYnVja2V0IHdoZXJlIHVwbG9hZGVkIGZpbGVzIHdpbGwgYmUgc3RvcmVkLlwifSk7XG5cbiAgICAvLyBTMyBCdWNrZXRcbiAgICBjb25zdCBidWNrZXQgPSBuZXcgczMuQnVja2V0KHRoaXMsIFwiUGVyc29uYWxTaXRlU3RhdGljQnVja2V0XCIsIHtcbiAgICAgIHB1YmxpY1JlYWRBY2Nlc3M6IHRydWUsXG4gICAgICBidWNrZXROYW1lOiBcInBlcnNvbmFsLXNpdGUtc3RhdGljLWJ1Y2tldFwiLFxuICAgICAgd2Vic2l0ZUluZGV4RG9jdW1lbnQ6IFwiaW5kZXguaHRtbFwiLFxuICAgIH0pO1xuXG4gICAgLy8gUzMgQnVja2V0IERlcGxveW1lbnRcbiAgICBuZXcgczNEZXBsb3ltZW50LkJ1Y2tldERlcGxveW1lbnQodGhpcywgXCJEZXBsb3lQZXJzb25hbFNpdGVTdGF0aWNcIiwge1xuICAgICAgc291cmNlczogW3MzRGVwbG95bWVudC5Tb3VyY2UuYXNzZXQoXCIuLi9kaXN0XCIpXSxcbiAgICAgIGRlc3RpbmF0aW9uQnVja2V0OiBidWNrZXRcbiAgICB9KTtcblxuICAgIC8vIENlcnRzXG4gICAgY29uc3QgaG9zdGVkWm9uZSA9IHJvdXRlNTMuSG9zdGVkWm9uZS5mcm9tSG9zdGVkWm9uZUF0dHJpYnV0ZXModGhpcywgXCJQZXJzb25hbFNpdGVIb3N0ZWRab25lXCIsIHtcbiAgICAgIHpvbmVOYW1lOiBkb21haW4udmFsdWVBc1N0cmluZyxcbiAgICAgIGhvc3RlZFpvbmVJZDogaG9zdGVkWm9uZUlELnZhbHVlQXNTdHJpbmdcbiAgICB9KTtcblxuICAgIGNvbnN0IGNlcnRpZmljYXRlID0gbmV3IGFjbS5EbnNWYWxpZGF0ZWRDZXJ0aWZpY2F0ZSh0aGlzLCAnQ3Jvc3NSZWdpb25DZXJ0aWZpY2F0ZScsIHtcbiAgICAgIGRvbWFpbk5hbWU6IGRvbWFpbi52YWx1ZUFzU3RyaW5nLFxuICAgICAgaG9zdGVkWm9uZSxcbiAgICAgIHJlZ2lvbjogXCJ1cy1lYXN0LTFcIixcbiAgICB9KTtcblxuICAgIC8vIENsb3VkZnJvbnRcbiAgIGNvbnN0IGNmRGlzdCA9IG5ldyBjbG91ZGZyb250LkNsb3VkRnJvbnRXZWJEaXN0cmlidXRpb24odGhpcywgXCJQZXJzb25hbFNpdGVTdGF0aWNCdWNrZXRDbG91ZGZyb250XCIsIHtcbiAgICAgIG9yaWdpbkNvbmZpZ3M6IFt7XG4gICAgICAgIHMzT3JpZ2luU291cmNlOiB7XG4gICAgICAgICAgczNCdWNrZXRTb3VyY2U6IGJ1Y2tldFxuICAgICAgICB9LFxuICAgICAgICBiZWhhdmlvcnM6IFt7IGlzRGVmYXVsdEJlaGF2aW9yOiB0cnVlIH1dXG4gICAgICB9XSxcbiAgICAgIHZpZXdlckNlcnRpZmljYXRlOiBjbG91ZGZyb250LlZpZXdlckNlcnRpZmljYXRlLmZyb21BY21DZXJ0aWZpY2F0ZShjZXJ0aWZpY2F0ZSwge1xuICAgICAgICAgIGFsaWFzZXM6IFtkb21haW4udmFsdWVBc1N0cmluZ10sXG4gICAgICAgICAgc2VjdXJpdHlQb2xpY3k6IGNsb3VkZnJvbnQuU2VjdXJpdHlQb2xpY3lQcm90b2NvbC5UTFNfVjEsXG4gICAgICAgICAgc3NsTWV0aG9kOiBjbG91ZGZyb250LlNTTE1ldGhvZC5TTkksXG4gICAgICAgIH0sXG4gICAgICApLFxuICAgICAgZXJyb3JDb25maWd1cmF0aW9uczogW3tcbiAgICAgICAgZXJyb3JDb2RlOiA0MDQsXG4gICAgICAgIHJlc3BvbnNlQ29kZTogMjAwLFxuICAgICAgICByZXNwb25zZVBhZ2VQYXRoOiBcIi9pbmRleC5odG1sXCIsXG4gICAgICB9XVxuICAgIH0pO1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gUmVjb3JkVGFyZ2V0LmZyb21BbGlhcyhuZXcgQ2xvdWRGcm9udFRhcmdldChjZkRpc3QpKTtcblxuXHRcdG5ldyBBUmVjb3JkKHRoaXMsIFwicGVyc29uYWwtc2l0ZS1hLXJlY29yZFwiLCB7XG5cdFx0XHR6b25lOiBob3N0ZWRab25lLFxuXHRcdFx0dGFyZ2V0LFxuXHRcdFx0cmVjb3JkTmFtZTogZG9tYWluLnZhbHVlQXNTdHJpbmcsXG5cdFx0fSk7XG4gIH1cbn1cbiJdfQ==