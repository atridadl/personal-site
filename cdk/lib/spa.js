"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SPAStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_cdk_lib_2 = require("aws-cdk-lib");
const aws_cdk_lib_3 = require("aws-cdk-lib");
const aws_cdk_lib_4 = require("aws-cdk-lib");
const aws_cdk_lib_5 = require("aws-cdk-lib");
const aws_cdk_lib_6 = require("aws-cdk-lib");
const aws_route53_1 = require("aws-cdk-lib/aws-route53");
const aws_route53_targets_1 = require("aws-cdk-lib/aws-route53-targets");
;
class SPAStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // S3 Bucket
        const bucket = new aws_cdk_lib_2.aws_s3.Bucket(this, "SPAStaticBucket", {
            publicReadAccess: true,
            bucketName: "spa-static-bucket",
            websiteIndexDocument: "index.html",
        });
        // Certs
        const hostedZone = aws_cdk_lib_6.aws_route53.HostedZone.fromHostedZoneAttributes(this, "SPAHostedZone", {
            zoneName: props.domain,
            hostedZoneId: props.hostedZoneID
        });
        const certificate = new aws_cdk_lib_5.aws_certificatemanager.DnsValidatedCertificate(this, 'CrossRegionCertificate', {
            domainName: props.domain,
            hostedZone,
            region: "us-east-1",
        });
        // Cloudfront
        const cfDist = new aws_cdk_lib_4.aws_cloudfront.CloudFrontWebDistribution(this, "SPAStaticBucketCloudfront", {
            originConfigs: [{
                    s3OriginSource: {
                        s3BucketSource: bucket
                    },
                    behaviors: [{ isDefaultBehavior: true }]
                }],
            viewerCertificate: aws_cdk_lib_4.aws_cloudfront.ViewerCertificate.fromAcmCertificate(certificate, {
                aliases: [props.domain],
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
        new aws_route53_1.ARecord(this, "spa-a-record", {
            zone: hostedZone,
            target,
            recordName: props.domain,
        });
        // S3 Bucket Deployment
        new aws_cdk_lib_3.aws_s3_deployment.BucketDeployment(this, "DeploySPAStatic", {
            sources: [aws_cdk_lib_3.aws_s3_deployment.Source.asset("../dist")],
            destinationBucket: bucket,
            distribution: cfDist,
            distributionPaths: [
                "/*"
            ]
        });
    }
}
exports.SPAStack = SPAStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3BhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUE4RDtBQUM5RCw2Q0FBMkM7QUFDM0MsNkNBQWdFO0FBQ2hFLDZDQUEyRDtBQUMzRCw2Q0FBNEQ7QUFDNUQsNkNBQXFEO0FBRXJELHlEQUFnRTtBQUNoRSx5RUFBbUU7QUFLbEUsQ0FBQztBQUVGLE1BQWEsUUFBUyxTQUFRLG1CQUFLO0lBQ2pDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBb0I7UUFDNUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsWUFBWTtRQUNaLE1BQU0sTUFBTSxHQUFHLElBQUksb0JBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFO1lBQ3BELGdCQUFnQixFQUFFLElBQUk7WUFDdEIsVUFBVSxFQUFFLG1CQUFtQjtZQUMvQixvQkFBb0IsRUFBRSxZQUFZO1NBQ25DLENBQUMsQ0FBQztRQUVILFFBQVE7UUFDUixNQUFNLFVBQVUsR0FBRyx5QkFBTyxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFO1lBQ3BGLFFBQVEsRUFBRSxLQUFLLENBQUMsTUFBTTtZQUN0QixZQUFZLEVBQUUsS0FBSyxDQUFDLFlBQVk7U0FDakMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxXQUFXLEdBQUcsSUFBSSxvQ0FBRyxDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSx3QkFBd0IsRUFBRTtZQUNsRixVQUFVLEVBQUUsS0FBSyxDQUFDLE1BQU07WUFDeEIsVUFBVTtZQUNWLE1BQU0sRUFBRSxXQUFXO1NBQ3BCLENBQUMsQ0FBQztRQUVILGFBQWE7UUFDZCxNQUFNLE1BQU0sR0FBRyxJQUFJLDRCQUFVLENBQUMseUJBQXlCLENBQUMsSUFBSSxFQUFFLDJCQUEyQixFQUFFO1lBQ3hGLGFBQWEsRUFBRSxDQUFDO29CQUNkLGNBQWMsRUFBRTt3QkFDZCxjQUFjLEVBQUUsTUFBTTtxQkFDdkI7b0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsQ0FBQztpQkFDekMsQ0FBQztZQUNGLGlCQUFpQixFQUFFLDRCQUFVLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFO2dCQUM1RSxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO2dCQUN2QixjQUFjLEVBQUUsNEJBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNO2dCQUN4RCxTQUFTLEVBQUUsNEJBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRzthQUNwQyxDQUNGO1lBQ0QsbUJBQW1CLEVBQUUsQ0FBQztvQkFDcEIsU0FBUyxFQUFFLEdBQUc7b0JBQ2QsWUFBWSxFQUFFLEdBQUc7b0JBQ2pCLGdCQUFnQixFQUFFLGFBQWE7aUJBQ2hDO2dCQUNEO29CQUNFLFNBQVMsRUFBRSxHQUFHO29CQUNkLFlBQVksRUFBRSxHQUFHO29CQUNqQixnQkFBZ0IsRUFBRSxhQUFhO2lCQUNoQyxDQUFDO1NBQ0gsQ0FBQyxDQUFDO1FBRUgsTUFBTSxNQUFNLEdBQUcsMEJBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxzQ0FBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBRXRFLElBQUkscUJBQU8sQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ2pDLElBQUksRUFBRSxVQUFVO1lBQ2hCLE1BQU07WUFDTixVQUFVLEVBQUUsS0FBSyxDQUFDLE1BQU07U0FDeEIsQ0FBQyxDQUFDO1FBRUQsdUJBQXVCO1FBQ3ZCLElBQUksK0JBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7WUFDekQsT0FBTyxFQUFFLENBQUMsK0JBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQy9DLGlCQUFpQixFQUFFLE1BQU07WUFDekIsWUFBWSxFQUFFLE1BQU07WUFDcEIsaUJBQWlCLEVBQUU7Z0JBQ2pCLElBQUk7YUFDTDtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQW5FRCw0QkFtRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGFjaywgU3RhY2tQcm9wcywgQ2ZuUGFyYW1ldGVyIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgYXdzX3MzIGFzIHMzIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgYXdzX3MzX2RlcGxveW1lbnQgYXMgczNEZXBsb3ltZW50IH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgYXdzX2Nsb3VkZnJvbnQgYXMgY2xvdWRmcm9udCB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IGF3c19jZXJ0aWZpY2F0ZW1hbmFnZXIgYXMgYWNtIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgYXdzX3JvdXRlNTMgYXMgcm91dGU1MyB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0IHsgQVJlY29yZCwgUmVjb3JkVGFyZ2V0IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLXJvdXRlNTMnO1xuaW1wb3J0IHsgQ2xvdWRGcm9udFRhcmdldCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1yb3V0ZTUzLXRhcmdldHMnO1xuXG5pbnRlcmZhY2UgU1BBU3RhY2tQcm9wcyBleHRlbmRzIFN0YWNrUHJvcHMge1xuICBkb21haW46IHN0cmluZyxcbiAgaG9zdGVkWm9uZUlEOiBzdHJpbmcsXG59O1xuXG5leHBvcnQgY2xhc3MgU1BBU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBTUEFTdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAvLyBTMyBCdWNrZXRcbiAgICBjb25zdCBidWNrZXQgPSBuZXcgczMuQnVja2V0KHRoaXMsIFwiU1BBU3RhdGljQnVja2V0XCIsIHtcbiAgICAgIHB1YmxpY1JlYWRBY2Nlc3M6IHRydWUsXG4gICAgICBidWNrZXROYW1lOiBcInNwYS1zdGF0aWMtYnVja2V0XCIsXG4gICAgICB3ZWJzaXRlSW5kZXhEb2N1bWVudDogXCJpbmRleC5odG1sXCIsXG4gICAgfSk7XG5cbiAgICAvLyBDZXJ0c1xuICAgIGNvbnN0IGhvc3RlZFpvbmUgPSByb3V0ZTUzLkhvc3RlZFpvbmUuZnJvbUhvc3RlZFpvbmVBdHRyaWJ1dGVzKHRoaXMsIFwiU1BBSG9zdGVkWm9uZVwiLCB7XG4gICAgICB6b25lTmFtZTogcHJvcHMuZG9tYWluLFxuICAgICAgaG9zdGVkWm9uZUlkOiBwcm9wcy5ob3N0ZWRab25lSURcbiAgICB9KTtcblxuICAgIGNvbnN0IGNlcnRpZmljYXRlID0gbmV3IGFjbS5EbnNWYWxpZGF0ZWRDZXJ0aWZpY2F0ZSh0aGlzLCAnQ3Jvc3NSZWdpb25DZXJ0aWZpY2F0ZScsIHtcbiAgICAgIGRvbWFpbk5hbWU6IHByb3BzLmRvbWFpbixcbiAgICAgIGhvc3RlZFpvbmUsXG4gICAgICByZWdpb246IFwidXMtZWFzdC0xXCIsXG4gICAgfSk7XG5cbiAgICAvLyBDbG91ZGZyb250XG4gICBjb25zdCBjZkRpc3QgPSBuZXcgY2xvdWRmcm9udC5DbG91ZEZyb250V2ViRGlzdHJpYnV0aW9uKHRoaXMsIFwiU1BBU3RhdGljQnVja2V0Q2xvdWRmcm9udFwiLCB7XG4gICAgICBvcmlnaW5Db25maWdzOiBbe1xuICAgICAgICBzM09yaWdpblNvdXJjZToge1xuICAgICAgICAgIHMzQnVja2V0U291cmNlOiBidWNrZXRcbiAgICAgICAgfSxcbiAgICAgICAgYmVoYXZpb3JzOiBbeyBpc0RlZmF1bHRCZWhhdmlvcjogdHJ1ZSB9XVxuICAgICAgfV0sXG4gICAgICB2aWV3ZXJDZXJ0aWZpY2F0ZTogY2xvdWRmcm9udC5WaWV3ZXJDZXJ0aWZpY2F0ZS5mcm9tQWNtQ2VydGlmaWNhdGUoY2VydGlmaWNhdGUsIHtcbiAgICAgICAgICBhbGlhc2VzOiBbcHJvcHMuZG9tYWluXSxcbiAgICAgICAgICBzZWN1cml0eVBvbGljeTogY2xvdWRmcm9udC5TZWN1cml0eVBvbGljeVByb3RvY29sLlRMU19WMSxcbiAgICAgICAgICBzc2xNZXRob2Q6IGNsb3VkZnJvbnQuU1NMTWV0aG9kLlNOSSxcbiAgICAgICAgfSxcbiAgICAgICksXG4gICAgICBlcnJvckNvbmZpZ3VyYXRpb25zOiBbe1xuICAgICAgICBlcnJvckNvZGU6IDQwNCxcbiAgICAgICAgcmVzcG9uc2VDb2RlOiAyMDAsXG4gICAgICAgIHJlc3BvbnNlUGFnZVBhdGg6IFwiL2luZGV4Lmh0bWxcIixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGVycm9yQ29kZTogNDAzLFxuICAgICAgICByZXNwb25zZUNvZGU6IDIwMCxcbiAgICAgICAgcmVzcG9uc2VQYWdlUGF0aDogXCIvaW5kZXguaHRtbFwiLFxuICAgICAgfV1cbiAgICB9KTtcblxuICAgIGNvbnN0IHRhcmdldCA9IFJlY29yZFRhcmdldC5mcm9tQWxpYXMobmV3IENsb3VkRnJvbnRUYXJnZXQoY2ZEaXN0KSk7XG5cblx0XHRuZXcgQVJlY29yZCh0aGlzLCBcInNwYS1hLXJlY29yZFwiLCB7XG5cdFx0XHR6b25lOiBob3N0ZWRab25lLFxuXHRcdFx0dGFyZ2V0LFxuXHRcdFx0cmVjb3JkTmFtZTogcHJvcHMuZG9tYWluLFxuXHRcdH0pO1xuXG4gICAgLy8gUzMgQnVja2V0IERlcGxveW1lbnRcbiAgICBuZXcgczNEZXBsb3ltZW50LkJ1Y2tldERlcGxveW1lbnQodGhpcywgXCJEZXBsb3lTUEFTdGF0aWNcIiwge1xuICAgICAgc291cmNlczogW3MzRGVwbG95bWVudC5Tb3VyY2UuYXNzZXQoXCIuLi9kaXN0XCIpXSxcbiAgICAgIGRlc3RpbmF0aW9uQnVja2V0OiBidWNrZXQsXG4gICAgICBkaXN0cmlidXRpb246IGNmRGlzdCxcbiAgICAgIGRpc3RyaWJ1dGlvblBhdGhzOiBbXG4gICAgICAgIFwiLypcIlxuICAgICAgXVxuICAgIH0pO1xuICB9XG59XG4iXX0=