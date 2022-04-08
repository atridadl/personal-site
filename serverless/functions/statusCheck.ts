import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda'

exports.main = async function statusCheck(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Hello, World!",
        })
    }
}