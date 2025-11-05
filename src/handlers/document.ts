import 'tsconfig-paths/register';

import { APIGatewayProxyEvent, Context } from 'aws-lambda';

// Export AWS Lambda handler replacing Express.js style (req, res) with (event, context)
export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
  // You can parse event body if required, for example JSON.parse(event.body)

  // Return Lambda proxy integration compatible response
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Mocked response' }),
  };
};
