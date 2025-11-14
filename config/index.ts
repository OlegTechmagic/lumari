import 'dotenv/config';

export * from './constants';

type LogLevel = 'INFO' | 'WARN' | 'ERROR';

export const NODE_ENV = process.env.NODE_ENV ?? 'development';
export const PIPELINE_BRANCH = process.env.PIPELINE_BRANCH ?? 'development';
export const HITHUB_REPO = process.env.HITHUB_REPO ?? '';
export const PORT = +(process.env.PORT || 3000);
export const LOG_LEVEL: LogLevel = (process.env.LOG_LEVEL as LogLevel) ?? 'INFO';
export const SALESFORCE_LOGIN_URL =
  process.env.SALESFORCE_LOGIN_URL ?? 'https://login.salesforce.com';

export const SF_VERSION = process.env.SF_VERSION ?? 'v63.0';

export const abadancingqueen_Consumer_Key = process.env.abadancingqueen_Consumer_Key ?? '';
export const abadancingqueen_SERTIFICATE_KEY = process.env.abadancingqueen_SERTIFICATE_KEY ?? '';
export const abadancingqueen_SF_USERNAME = process.env.abadancingqueen_SF_USERNAME ?? '';
export const abadancingqueen_KEY_SECRET_NAME = process.env.abadancingqueen_KEY_SECRET_NAME ?? '';

export const efficiency_enterprise_6328_dev_ed_Consumer_Key =
  process.env.efficiency_enterprise_6328_dev_ed_Consumer_Key ?? '';
export const efficiency_enterprise_6328_dev_ed_SERTIFICATE_KEY =
  process.env.efficiency_enterprise_6328_dev_ed_SERTIFICATE_KEY ?? '';
export const efficiency_enterprise_6328_dev_ed_SF_USERNAME =
  process.env.efficiency_enterprise_6328_dev_ed_SF_USERNAME ?? '';
export const efficiency_enterprise_6328_dev_ed_KEY_SECRET_NAME =
  process.env.efficiency_enterprise_6328_dev_ed_KEY_SECRET_NAME ?? '';

export const momentum_ruby_8063_dev_ed_Consumer_Key =
  process.env.momentum_ruby_8063_dev_ed_Consumer_Key ?? '';
export const momentum_ruby_8063_dev_ed_SERTIFICATE_KEY =
  process.env.momentum_ruby_8063_dev_ed_SERTIFICATE_KEY ?? '';
export const momentum_ruby_8063_dev_ed_SF_USERNAME =
  process.env.momentum_ruby_8063_dev_ed_SF_USERNAME ?? '';
export const momentum_ruby_8063_dev_ed_KEY_SECRET_NAME =
  process.env.momentum_ruby_8063_dev_ed_KEY_SECRET_NAME ?? '';

export const LOCALHOST = process.env.LOCALHOST ?? false;
export const AWS_REGION = process.env.AWS_REGION ?? 'us-east-1';

export default {
  NODE_ENV,
  AWS_REGION,
  PIPELINE_BRANCH,
  HITHUB_REPO,
  PORT,
  SF_VERSION,
  SALESFORCE_LOGIN_URL,
  LOCALHOST,

  abadancingqueen_SF_USERNAME,
  abadancingqueen_Consumer_Key,
  abadancingqueen_SERTIFICATE_KEY,
  abadancingqueen_KEY_SECRET_NAME,

  momentum_ruby_8063_dev_ed_SF_USERNAME,
  momentum_ruby_8063_dev_ed_Consumer_Key,
  momentum_ruby_8063_dev_ed_SERTIFICATE_KEY,
  momentum_ruby_8063_dev_ed_KEY_SECRET_NAME,

  efficiency_enterprise_6328_dev_ed_SF_USERNAME,
  efficiency_enterprise_6328_dev_ed_Consumer_Key,
  efficiency_enterprise_6328_dev_ed_SERTIFICATE_KEY,
  efficiency_enterprise_6328_dev_ed_KEY_SECRET_NAME,
};
