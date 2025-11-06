import { Router } from '@utils';

export const patientRoute: Router = async (params) => {
  const response = {
    statusCode: 200,
    body: { message: 'Mocked appointment handler response' },
  };

  return response;
};
