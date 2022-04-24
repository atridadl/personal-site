import { Stack, StackProps, Duration } from "aws-cdk-lib";
import { aws_cloudfront as cloudfront } from "aws-cdk-lib";
import { aws_certificatemanager as acm } from "aws-cdk-lib";
import { aws_route53 as route53 } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ARecord, RecordTarget } from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { HttpApi, HttpMethod, CorsHttpMethod } from "@aws-cdk/aws-apigatewayv2-alpha";
import { RestApi, Stage, Deployment } from "aws-cdk-lib/aws-apigateway";
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";

interface APIStackProps extends StackProps {
  stage: string,
  domain: string,
};

export class APIStack extends Stack {
  constructor(scope: Construct, id: string, props: APIStackProps) {
    super(scope, id, props);
    // ----------------------[Certs]----------------------
    const hostedZone = route53.HostedZone.fromLookup(this, `${ props.stage }-HostedZone`, {
        domainName: props.domain,
    });

    const certificate = new acm.DnsValidatedCertificate(this, `${ props.stage }-API-CrossRegionCertificate`, {
        domainName: `api.${ props.domain }`,
        hostedZone,
        region: "us-east-1",
    });

    // ----------------------[DB]----------------------
    const quoteDB = new dynamodb.Table(this, `${ props.stage }-DB`, {
        tableName: `${ props.stage }-DB`,
        partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
        sortKey: { name: "RecordType", type: dynamodb.AttributeType.STRING },
        billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    const QuoteDBTypeGSIName = "RecordType-index"

    quoteDB.addGlobalSecondaryIndex({
        indexName: QuoteDBTypeGSIName,
        partitionKey: {name: "RecordType", type: dynamodb.AttributeType.STRING},
        sortKey: {name: "id", type: dynamodb.AttributeType.STRING},
    });

    // ----------------------[API]----------------------
    const httpApi = new HttpApi(this, `${ props.stage }-API`, {
        apiName: `${ props.stage }-API`,
        corsPreflight: {
            allowHeaders: ['Authorization'],
            allowMethods: [
              CorsHttpMethod.GET,
              CorsHttpMethod.HEAD,
              CorsHttpMethod.OPTIONS,
              CorsHttpMethod.POST,
            ],
            allowOrigins: ['*'],
            maxAge: Duration.days(10),
          },
    });

    const restApi = new RestApi(this, 'Api', {
        restApiName: `${ props.stage }-REST-API`,
        deploy: true,
        defaultCorsPreflightOptions: {
            allowHeaders: ['Authorization'],
            allowMethods: [
              CorsHttpMethod.GET,
              CorsHttpMethod.HEAD,
              CorsHttpMethod.OPTIONS,
              CorsHttpMethod.POST,
            ],
            allowOrigins: ['*'],
            maxAge: Duration.days(10),
        }
    });

    const restApiDeployment = new Deployment(this, `${ props.stage }-REST-API-Deployment`, {
        api: restApi,
    });

    new Stage(this, `${ props.stage }-REST-API-Stage`, {
        stageName: "dev",
        deployment: restApiDeployment,
        cachingEnabled: true
    });

    const rootFunction = new lambda.Function(this, `${ props.stage }-API-rootFunction`, {
        functionName: `${ props.stage }-API-RootFunction`,
        runtime: lambda.Runtime.NODEJS_14_X,
        code: lambda.Code.fromAsset("../serverless/functions"),
        handler: "root.main",
    });

    const rootFunctionIntegration = new HttpLambdaIntegration('API-RootFunctionIntegration', rootFunction);

    httpApi.addRoutes({
        path: "/v1", 
        methods: [HttpMethod.GET],
        integration: rootFunctionIntegration,
    });

    const statusCheck = new lambda.Function(this, `${ props.stage }-API-StatusCheck`, {
        functionName: `${ props.stage }-API-StatusCheck`,
        runtime: lambda.Runtime.NODEJS_14_X,
        code: lambda.Code.fromAsset("../serverless/functions"),
        handler: "statusCheck.main",
    });

    const statusCheckIntegration = new HttpLambdaIntegration('API-StatusCheckIntegration', statusCheck);

    httpApi.addRoutes({
        path: "/v1/statusCheck", 
        methods: [HttpMethod.GET],
        integration: statusCheckIntegration,
    });

    const randomQuote = new lambda.Function(this, `${ props.stage }-API-RandomQuote`, {
        functionName: `${ props.stage }-API-RandomQuote`,
        runtime: lambda.Runtime.NODEJS_14_X,
        code: lambda.Code.fromAsset("../serverless/functions"),
        handler: "randomQuote.main",
        environment: {
            DBNAME: quoteDB.tableName,
            DBINDEX: QuoteDBTypeGSIName,
        }
    });

    const randomQuoteIntegration = new HttpLambdaIntegration('API-RandomQuoteIntegration', randomQuote);

    httpApi.addRoutes({
        path: "/v1/randomQuote", 
        methods: [HttpMethod.GET],
        integration: randomQuoteIntegration,
    });

    quoteDB.grantFullAccess(randomQuote);
    // ----------------------[Cloudfront]----------------------
    const cfDist = new cloudfront.CloudFrontWebDistribution(this, `${ props.stage }-APICloudfront`, {
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL,
        originConfigs: [{
            customOriginSource: {
                domainName: `${httpApi.httpApiId}.execute-api.${this.region}.amazonaws.com`,
            },
            behaviors: [
                {
                    pathPattern: "/*",
                    allowedMethods: cloudfront.CloudFrontAllowedMethods.ALL,
                    isDefaultBehavior: true,
                    defaultTtl: Duration.seconds(0),
                    forwardedValues: {
                        queryString: true,
                        headers: ["Authorization"],
                    },
                },
            ],
        }],
        viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(certificate, {
                aliases: [`api.${ props.domain }`],
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

    new ARecord(this, `${ props.stage }-DNSRecord-API`, {
        zone: hostedZone,
        target,
        recordName: `api.${ props.domain }`,
    });
  }
}
