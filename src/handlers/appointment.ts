import 'tsconfig-paths/register';

import { APIGatewayProxyEvent, Context } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
  // You may parse event.body if it's a POST with JSON payload
  // const body = event.body ? JSON.parse(event.body) : {};

  // Basic mocked response
  const response = {
    statusCode: 200,
    body: JSON.stringify({ message: 'Mocked appointment handler response' }),
  };

  return response;
};
