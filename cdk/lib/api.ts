import { Stack, StackProps, RemovalPolicy, Duration } from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import path = require("path");

interface APIStackProps extends StackProps {
  stage: string,
};

export class APIStack extends Stack {
  constructor(scope: Construct, id: string, props: APIStackProps) {
    super(scope, id, props);

    const handler = new lambda.Function(this, `${ props.stage }-HelloWorld`, {
        functionName: `${ props.stage }-HelloWorld`,
        runtime: lambda.Runtime.NODEJS_14_X,
        code: lambda.Code.fromAsset(path.join(__dirname, 'serverless')),
        handler: "helloWorld.main",
    });

    const api = new apigateway.RestApi(this, `${ props.stage }-HelloWorldAPI`, {
        restApiName: `${ props.stage }-HelloWorldAPI`,
        description: "This API is a test."
    });

    const getHelloWorldIntegration = new apigateway.LambdaIntegration(handler, {
        requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    });

    api.root.addMethod("GET", getHelloWorldIntegration);

    const postTable = new dynamodb.Table(this, `${ props.stage }-PostTable`, {
      tableName: `${ props.stage }-PostTable`,
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    });
  }
}
