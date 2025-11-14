/* eslint-disable @typescript-eslint/no-explicit-any */
import conf, { SALESFORCE_LOGIN_URL } from '@config';
import axios from 'axios';
import jwt from 'jsonwebtoken';

type Query = {
  body?: { [key: string]: any };
  headers?: { [key: string]: any };
  params?: { [key: string]: any };
  url: string;
  method: 'POST' | 'GET';
};

type Config = Record<'iss' | 'sub' | 'aud' | 'exp', string | number>;

export class SalesForceProvider {
  config: Config;
  privateKey: string;

  constructor(
    domain: 'abadancingqueen' | 'momentum_ruby_8063_dev_ed' | 'efficiency_enterprise_6328_dev_ed',
  ) {
    this.privateKey = conf[`${domain}_SERTIFICCATE_KEY`].replace(/\\n/g, '\n');

    this.config = {
      iss: conf[`${domain}_Consumer_Key`],
      sub: conf[`${domain}_SF_USERNAME`],
      aud: SALESFORCE_LOGIN_URL,
      exp: Math.floor(Date.now() / 1000) + 3 * 60,
    };
  }

  async getAccessToken(): Promise<{ access_token: string; instance_url: string }> {
    const jwtToken = jwt.sign(this.config, this.privateKey, { algorithm: 'RS256' });

    const params = new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwtToken,
    });
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

    return axios
      .post(`${SALESFORCE_LOGIN_URL}/services/oauth2/token`, params, {
        headers,
      })
      .then((res) => res.data);
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
