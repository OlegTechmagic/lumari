#!/usr/bin/env node

import 'tsconfig-paths/register';

import { NODE_ENV } from '@config';
import * as cdk from 'aws-cdk-lib';

import { Pipeline } from '../lib/pipeline';

const app = new cdk.App();
new Pipeline(app, `Lumari-${NODE_ENV}`, {});
app.synth();
