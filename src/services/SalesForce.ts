/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SF_CLIENT_ID,
  SF_CLIENT_SECRET,
  SF_PASSWORD,
  SF_SECURITY_TOKEN,
  SF_USERNAME,
} from '@config';
import axios from 'axios';

type Query = {
  body?: { [key: string]: any };
  headers?: { [key: string]: any };
  params?: { [key: string]: any };
  url: string;
  method: 'POST' | 'GET';
};

export class SalesForceServive {
  async getAccessToken() {
    const params = new URLSearchParams({
      grant_type: 'password',
      client_id: SF_CLIENT_ID,
      client_secret: SF_CLIENT_SECRET,
      username: SF_USERNAME,
      password: SF_PASSWORD + SF_SECURITY_TOKEN,
    });

    const res = await axios.post('https://login.salesforce.com/services/oauth2/token', params);

    return res.data;
  }

  async query(data: Query) {
    const { access_token, instance_url } = await this.getAccessToken();

    const res = await axios({
      ...data,
      headers: { ...data.headers, Authorization: `Bearer ${access_token}` },
      method: data.method,
      url: `${instance_url}/${data.url}`,
    });
    return res.data;
  }

  async getPatient() {}
}
