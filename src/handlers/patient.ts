import 'tsconfig-paths/register';

import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  // Respond with a basic JSON message
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Mock patient handler response' }),
  };
};
