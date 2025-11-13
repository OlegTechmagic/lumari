import { SalesForceServive } from '@providers';
export class AppointmentService {
  async getAppointmentDetails(appointmentId: string) {
    return {
      appointmentId,
      date: '2024-07-01',
      time: '10:00 AM',
      patientName: 'John Doe',
      doctorName: 'Dr. Smith',
    };
  }

  test() {
    const sf = new SalesForceServive('abadancingqueen');
    sf.getAccessToken();
  }
}
