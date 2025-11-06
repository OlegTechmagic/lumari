import { join } from 'node:path';

import {
  abadancingqueen_SF_CLIENT_ID,
  abadancingqueen_SF_CLIENT_SECRET,
  abadancingqueen_SF_PASSWORD,
  abadancingqueen_SF_SECURITY_TOKEN,
  abadancingqueen_SF_USERNAME,
  abadancingqueen_SF_VERSION,
  efficiency_enterprise_6328_dev_ed_SF_CLIENT_ID,
  efficiency_enterprise_6328_dev_ed_SF_CLIENT_SECRET,
  efficiency_enterprise_6328_dev_ed_SF_PASSWORD,
  efficiency_enterprise_6328_dev_ed_SF_SECURITY_TOKEN,
  efficiency_enterprise_6328_dev_ed_SF_USERNAME,
  efficiency_enterprise_6328_dev_ed_SF_VERSION,
  momentum_ruby_8063_dev_ed_SF_CLIENT_ID,
  momentum_ruby_8063_dev_ed_SF_CLIENT_SECRET,
  momentum_ruby_8063_dev_ed_SF_PASSWORD,
  momentum_ruby_8063_dev_ed_SF_SECURITY_TOKEN,
  momentum_ruby_8063_dev_ed_SF_USERNAME,
  momentum_ruby_8063_dev_ed_SF_VERSION,
} from '@config';
import { Duration } from 'aws-cdk-lib';
import { FunctionOptions, ILayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
type Props = {
  functionName: string;
  entry: string;
  handler: string;
  layers?: ILayerVersion[];
} & FunctionOptions;

export const LambdaTemplate = (scope: Construct, id: string, props: Partial<Props>) =>
  new NodejsFunction(scope, id, {
    timeout: Duration.minutes(15),
    memorySize: 300,
    retryAttempts: 0,
    runtime: Runtime.NODEJS_20_X,
    environment: {
      abadancingqueen_SF_CLIENT_ID,
      abadancingqueen_SF_CLIENT_SECRET,
      abadancingqueen_SF_USERNAME,
      abadancingqueen_SF_PASSWORD,
      abadancingqueen_SF_SECURITY_TOKEN,
      abadancingqueen_SF_VERSION,
      momentum_ruby_8063_dev_ed_SF_CLIENT_ID,
      momentum_ruby_8063_dev_ed_SF_CLIENT_SECRET,
      momentum_ruby_8063_dev_ed_SF_USERNAME,
      momentum_ruby_8063_dev_ed_SF_PASSWORD,
      momentum_ruby_8063_dev_ed_SF_SECURITY_TOKEN,
      momentum_ruby_8063_dev_ed_SF_VERSION,
      efficiency_enterprise_6328_dev_ed_SF_CLIENT_ID,
      efficiency_enterprise_6328_dev_ed_SF_CLIENT_SECRET,
      efficiency_enterprise_6328_dev_ed_SF_USERNAME,
      efficiency_enterprise_6328_dev_ed_SF_PASSWORD,
      efficiency_enterprise_6328_dev_ed_SF_SECURITY_TOKEN,
      efficiency_enterprise_6328_dev_ed_SF_VERSION,
    },
    ...props,
    entry: join(__dirname, `../../../dist/${props.entry}.js`),
    handler: 'handler',
  });
