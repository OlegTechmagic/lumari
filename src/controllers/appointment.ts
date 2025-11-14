import { AppointmentService } from '@services';
import { GetAppointemntRequest } from '@types';

export class AppointmentController {
  private appointmentService = new AppointmentService();

  getAppintmentDetails(request: GetAppointemntRequest) {
    return this.appointmentService.getAppointmentDetails(request);
  }
}
