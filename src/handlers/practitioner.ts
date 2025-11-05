import 'tsconfig-paths/register';

import { APIGatewayProxyEvent, Context } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Mocked practitioner handler response' }),
  };
};
