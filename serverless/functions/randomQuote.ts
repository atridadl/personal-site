import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { ScanInput } from "aws-sdk/clients/dynamodb";

const dynamoClient = new DocumentClient({region: "ca-central-1"});

var params: ScanInput = {
    TableName: process.env.DBNAME || "",
};

exports.main = async function randomQuote(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    try {
        const data = await dynamoClient.scan(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: err
            })
        }
    }
}