import { AppointmentService } from '@services';
import { Router } from '@utils';

export const appointmentRoute: Router = async (params) => {
  const appointmentService = new AppointmentService();
  appointmentService.test();
  const response = {
    statusCode: 200,
    body: { message: 'Mocked appointment handler response' },
  };

  return response;
};
