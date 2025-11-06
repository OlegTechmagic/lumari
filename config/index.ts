import 'dotenv/config';

export * from './constants';

export const CONFIG = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PIPELINE_BRANCH: process.env.PIPELINE_BRANCH || 'development',
  HITHUB_REPO: process.env.HITHUB_REPO || '',
  PORT: +(process.env.PORT || 3000),
};
