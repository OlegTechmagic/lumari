import { AppointmentController } from '@controllers';
import { GetAppointemntRequest } from '@types';
import { Router } from '@utils';

export const appointmentRoute: Router = async (request) => {
  const appointmentController = new AppointmentController();
  try {
    if (request.method === 'GET') {
      const body = await appointmentController.getAppintmentDetails(
        request.pathParameters as GetAppointemntRequest,
      );
      return { statusCode: 200, body };
    }
    return { statusCode: 404, body: { error: 'Method Not Found' } };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error in appointmentRoute:', error);
    return {
      statusCode: 500,
      body: { error: 'Internal Server Error', message: error.message },
    };
  }
};
