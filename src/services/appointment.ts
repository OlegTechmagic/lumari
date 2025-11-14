import { SalesForceProvider } from '@providers';
export class AppointmentService {
  sf = new SalesForceProvider('abadancingqueen');

  async getAppointmentDetails(appointmentId: string) {
    const query =
      // eslint-disable-next-line max-len
      'SELECT (SELECT lmry__Worker__r.Id, lmry__Worker__r.Name, Id, IsDeleted, lmry__End_Date__c, lmry__Session_Location__c, lmry__Start_Date__c, lmry__Status__c FROM lmry__Worker_Appointments__r), lmry__Session_Type__r.Name, (SELECT Id, IsDeleted, lmry__End_Date__c, lmry__Start_Date__c, lmry__Status__c, lmry__Client__r.Id, lmry__Client__r.Name, (SELECT Id, lmry__Service__r.Name, lmry__Worker_Appointment__r.Id, lmry__Rate__r.lmry__Modifier_1__c, lmry__Rate__r.lmry__Modifier_2__c, lmry__Rate__r.lmry__Payor__r.Name, lmry__Service_Agreement_Item__r.lmry__Support_Contract__r.lmry__Associated_Diagnosis__r.Name FROM lmry__Planned_Services__r) FROM lmry__Client_Appointments__r), Id, IsDeleted, Name, lmry__End_Date__c, lmry__Other_City__c, lmry__Other_Country__c, lmry__Other_Postal_Code__c, lmry__Other_State__c, lmry__Other_Street__c, lmry__Start_Date__c, lmry__Status__c FROM lmry__Session__c';

    return this.sf.query({
      method: 'GET',
      params: {
        q: query,
      },
      url: `/services/data/v63.0/queryAll`,
    });
  }

  test() {
    const sf = new SalesForceProvider('abadancingqueen');
    sf.getAccessToken();
  }
}
