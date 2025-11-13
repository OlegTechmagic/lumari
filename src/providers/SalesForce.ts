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

export class SalesForceServive {
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

  async getAccessToken() {
    console.log('Reading private key from:', this.privateKey, this.config);

    const jwtToken = jwt.sign(this.config, this.privateKey, { algorithm: 'RS256' });

    const params = new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwtToken,
    });
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

    try {
      const response = await axios.post(`${SALESFORCE_LOGIN_URL}/services/oauth2/token`, params, {
        headers,
      });

      console.log('✅ Access Token:', response.data.access_token);
      console.log('🌐 Instance URL:', response.data.instance_url);
      return response.data;
    } catch (error: any) {
      console.error('❌ Failed to get access token:');
      console.error(error.response?.data || error.message);
    }
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
