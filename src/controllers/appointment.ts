import { AppointmentService } from '@services';

export class AppointmentController {
  private appointmentService = new AppointmentService();

  getAppintmentDetails(appointment: string) {
    return this.appointmentService.getAppointmentDetails(appointment);
  }
}
