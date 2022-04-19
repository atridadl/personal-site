import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { ScanInput } from "aws-sdk/clients/dynamodb";

const dynamoClient = new DocumentClient({region: "ca-central-1"});

var params: ScanInput = {
    TableName: process.env.DBNAME || "",
};

const transformDynamoData  = (rawData: any) => {
    if (!rawData || !rawData.Items) {
        return {
            Items: [],
        }
    } else {
        return {
            Items: [...rawData.Items],
        }
    }
};
exports.main = async function randomQuote(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    try {
        const rawData = await dynamoClient.scan(params).promise();
        const transformedData = transformDynamoData(rawData);

        if (transformedData.Items.length > 0) {
            const randomIndex = Math.floor(Math.random() * transformedData.Items.length);
            const randomQuote = transformedData.Items[randomIndex];
            return {
                statusCode: 200,
                body: JSON.stringify(randomQuote),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "No quotes found"
            })
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