import { Stack, StackProps, RemovalPolicy, Duration } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from 'constructs';
import path = require('path');

export class APIStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const handler = new lambda.Function(this, "HelloWorldHandler", {
        runtime: lambda.Runtime.NODEJS_14_X,
        code: lambda.Code.fromAsset(path.join(__dirname, 'serverless')),
        handler: "helloWorld.main",
    });

    const api = new apigateway.RestApi(this, "helloworld-api", {
        restApiName: "HelloWorldAPI",
        description: "This API is a test."
    });

    const getHelloWorldIntegration = new apigateway.LambdaIntegration(handler, {
        requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    });

    api.root.addMethod("GET", getHelloWorldIntegration);
  }
}
