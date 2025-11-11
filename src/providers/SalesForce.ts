/* eslint-disable @typescript-eslint/no-explicit-any */
import conf from '@config';
import axios from 'axios';

type Query = {
  body?: { [key: string]: any };
  headers?: { [key: string]: any };
  params?: { [key: string]: any };
  url: string;
  method: 'POST' | 'GET';
};

type Config = Record<
  'grant_type' | 'client_id' | 'client_secret' | 'username' | 'password',
  string
>;

export class SalesForceServive {
  config: Config;

  constructor(
    domain: 'abadancingqueen' | 'momentum_ruby_8063_dev_ed' | 'efficiency_enterprise_6328_dev_ed',
  ) {
    this.config = {
      grant_type: 'password',
      client_id: conf[`${domain}_SF_CLIENT_ID`],
      client_secret: (conf as any)[`${domain}_SF_CLIENT_SECRET`],
      username: conf[`${domain}_SF_USERNAME`],
      password: conf[`${domain}_SF_PASSWORD`] + conf[`${domain}_SF_SECURITY_TOKEN`],
    };
  }

  async getAccessToken() {
    const params = new URLSearchParams(this.config);

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
