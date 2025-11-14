/* eslint-disable @typescript-eslint/no-explicit-any */
import conf, { LOCALHOST, SALESFORCE_LOGIN_URL } from '@config';
import { SFOrg } from '@types';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import { AwsProvider } from './AwsProvider';

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
  sforg: SFOrg;

  constructor(sforg: SFOrg) {
    this.sforg = sforg;
    this.config = {
      iss: conf[`${sforg}_Consumer_Key`],
      sub: conf[`${sforg}_SF_USERNAME`],
      aud: SALESFORCE_LOGIN_URL,
      exp: Math.floor(Date.now() / 1000) + 3 * 60,
    };
  }

  async initKey() {
    if (LOCALHOST) {
      this.privateKey = conf[`${this.sforg}_SERTIFICATE_KEY`].replace(/\\n/g, '\n');
      return;
    }
    const keyName = conf[`${this.sforg}_KEY_SECRET_NAME`];
    const awsProvider = new AwsProvider('us-east-1');
    try {
      const key = await awsProvider.getSecretValue(keyName);
      if (!key) throw new Error(`No key found for secret name: ${keyName}`);
      this.privateKey = key;
    } catch (error) {
      console.error(`Error retrieving secret key for ${this.sforg}:`, error);
      throw error;
    }
  }

  async getAccessToken(): Promise<{ access_token: string; instance_url: string }> {
    if (!this.privateKey) {
      await this.initKey();
    }

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
