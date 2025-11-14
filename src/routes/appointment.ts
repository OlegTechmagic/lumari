import { AppointmentService } from '@services';
import { Router } from '@utils';

export const appointmentRoute: Router = async (params) => {
  const appointmentService = new AppointmentService();
  const resp = await appointmentService.getAppointmentDetails('sss');
  const response = {
    statusCode: 200,
    body: resp,
  };

  return response;
};
