import { SalesForceProvider } from '@providers';
import { GetAppointemntRequest } from '@types';

function buildWhereClause(input: GetAppointemntRequest) {
  const mappings = {
    ModifiedSince: { pre: '(LastModifiedDate > ', post: ')' },
    PractitionerRole: {
      // eslint-disable-next-line max-len
      pre: "Id IN (Select lmry__Session__c from lmry__Worker_Appointment__c WHERE lmry__Worker__r.Id = '",
      post: "')",
    },
    Patient: {
      // eslint-disable-next-line max-len
      pre: "Id IN (Select lmry__Session__c from lmry__Client_Appointment__c WHERE lmry__Client__r.Id = '",
      post: "')",
    },
    From: { pre: '(lmry__Start_Date__c > ', post: ')' },
    To: { pre: '(lmry__Start_Date__c < ', post: ')' },
  };

  const conditions = Object.entries(input)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => {
      const map = mappings[key as keyof typeof mappings];
      if (!map) {
        throw new Error(`No mapping found for key: ${key}`);
      }
      return `${map.pre}${value}${map.post}`;
    })
    .join(' AND ');

  return {
    where_clause: conditions ? ` WHERE ${conditions}` : '',
  };
}

export class AppointmentService {
  sf = new SalesForceProvider('abadancingqueen');

  async getAppointmentDetails(request: GetAppointemntRequest) {
    let query =
      // eslint-disable-next-line max-len
      'SELECT (SELECT lmry__Worker__r.Id, lmry__Worker__r.Name, Id, IsDeleted, lmry__End_Date__c, lmry__Session_Location__c, lmry__Start_Date__c, lmry__Status__c FROM lmry__Worker_Appointments__r), lmry__Session_Type__r.Name, (SELECT Id, IsDeleted, lmry__End_Date__c, lmry__Start_Date__c, lmry__Status__c, lmry__Client__r.Id, lmry__Client__r.Name, (SELECT Id, lmry__Service__r.Name, lmry__Worker_Appointment__r.Id, lmry__Rate__r.lmry__Modifier_1__c, lmry__Rate__r.lmry__Modifier_2__c, lmry__Rate__r.lmry__Payor__r.Name, lmry__Service_Agreement_Item__r.lmry__Support_Contract__r.lmry__Associated_Diagnosis__r.Name FROM lmry__Planned_Services__r) FROM lmry__Client_Appointments__r), Id, IsDeleted, Name, lmry__End_Date__c, lmry__Other_City__c, lmry__Other_Country__c, lmry__Other_Postal_Code__c, lmry__Other_State__c, lmry__Other_Street__c, lmry__Start_Date__c, lmry__Status__c FROM lmry__Session__c';
    query += buildWhereClause(request).where_clause;

    return this.sf.query({
      method: 'GET',
      params: { q: query },
      url: `/services/data/v63.0/queryAll`,
    });
  }
}
