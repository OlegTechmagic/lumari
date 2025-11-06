import { Router } from '@utils';

export const documentRoute: Router = async (params) => {
  const response = {
    statusCode: 200,
    body: { message: 'Mocked appointment handler response' },
  };

  return response;
};
