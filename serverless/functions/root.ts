import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";

exports.main = async function root(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    return {
        statusCode: 200,
        body: JSON.stringify({
            endpoints: [
                "statusCheck"
            ]
        })
    }
}