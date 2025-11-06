import 'dotenv/config';

export * from './constants';

export const NODE_ENV = process.env.NODE_ENV ?? 'development';
export const PIPELINE_BRANCH = process.env.PIPELINE_BRANCH ?? 'development';
export const HITHUB_REPO = process.env.HITHUB_REPO ?? '';
export const PORT = +(process.env.PORT || 3000);

export const abadancingqueen_SF_CLIENT_ID = process.env.abadancingqueen_SF_CLIENT_ID ?? '';
export const abadancingqueen_SF_CLIENT_SECRET = process.env.abadancingqueen_SF_CLIENT_SECRET ?? '';
export const abadancingqueen_SF_USERNAME = process.env.abadancingqueen_SF_USERNAME ?? '';
export const abadancingqueen_SF_PASSWORD = process.env.abadancingqueen_SF_PASSWORD ?? '';
export const abadancingqueen_SF_SECURITY_TOKEN =
  process.env.abadancingqueen_SF_SECURITY_TOKEN ?? '';
export const abadancingqueen_SF_VERSION = process.env.abadancingqueen_SF_VERSION ?? 'v63.0';
export const momentum_ruby_8063_dev_ed_SF_CLIENT_ID =
  process.env.momentum_ruby_8063_dev_ed_SF_CLIENT_ID ?? '';
export const momentum_ruby_8063_dev_ed_SF_CLIENT_SECRET =
  process.env.momentum_ruby_8063_dev_ed_SF_CLIENT_SECRET ?? '';
export const momentum_ruby_8063_dev_ed_SF_USERNAME =
  process.env.momentum_ruby_8063_dev_ed_SF_USERNAME ?? '';
export const momentum_ruby_8063_dev_ed_SF_PASSWORD =
  process.env.momentum_ruby_8063_dev_ed_SF_PASSWORD ?? '';
export const momentum_ruby_8063_dev_ed_SF_SECURITY_TOKEN =
  process.env.momentum_ruby_8063_dev_ed_SF_SECURITY_TOKEN ?? '';
export const momentum_ruby_8063_dev_ed_SF_VERSION =
  process.env.momentum_ruby_8063_dev_ed_SF_VERSION ?? 'v63.0';
export const efficiency_enterprise_6328_dev_ed_SF_CLIENT_ID =
  process.env.efficiency_enterprise_6328_dev_ed_SF_CLIENT_ID ?? '';
export const efficiency_enterprise_6328_dev_ed_SF_CLIENT_SECRET =
  process.env.efficiency_enterprise_6328_dev_ed_SF_CLIENT_SECRET ?? '';
export const efficiency_enterprise_6328_dev_ed_SF_USERNAME =
  process.env.efficiency_enterprise_6328_dev_ed_SF_USERNAME ?? '';
export const efficiency_enterprise_6328_dev_ed_SF_PASSWORD =
  process.env.efficiency_enterprise_6328_dev_ed_SF_PASSWORD ?? '';
export const efficiency_enterprise_6328_dev_ed_SF_SECURITY_TOKEN =
  process.env.efficiency_enterprise_6328_dev_ed_SF_SECURITY_TOKEN ?? '';
export const efficiency_enterprise_6328_dev_ed_SF_VERSION =
  process.env.efficiency_enterprise_6328_dev_ed_SF_VERSION ?? 'v63.0';
