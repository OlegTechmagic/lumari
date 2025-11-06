/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { Router } from './types';

export const handlerWrapper = (handler: Router) => {
  return async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const { httpMethod, headers, queryStringParameters, pathParameters, body } = event;

      let parsedBody: any = null;
      if (body) {
        try {
          parsedBody = JSON.parse(body);
        } catch (_: any) {
          return {
            statusCode: 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Invalid JSON body' }),
          };
        }
      }

      const response = await handler({
        method: httpMethod ?? '',
        headers,
        query: queryStringParameters,
        pathParameters,
        body: parsedBody,
      });

      return {
        statusCode: response.statusCode,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(response.body),
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Internal Server Error', error: String(error) }),
      };
    }
  };
};
