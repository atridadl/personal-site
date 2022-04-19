import * as aws from "aws-sdk";
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";

const dynamo = new aws.DynamoDB.DocumentClient();

exports.main = async function randomQuote(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Hello, World!",
        })
    }
}