import { join } from 'node:path';

import {
  abadancingqueen_Consumer_Key,
  abadancingqueen_SF_USERNAME,
  efficiency_enterprise_6328_dev_ed_Consumer_Key,
  efficiency_enterprise_6328_dev_ed_SF_USERNAME,
  momentum_ruby_8063_dev_ed_Consumer_Key,
  momentum_ruby_8063_dev_ed_SF_USERNAME,
  NODE_ENV,
  SALESFORCE_LOGIN_URL,
  SF_VERSION,
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
      NODE_ENV,

      abadancingqueen_SF_USERNAME,
      abadancingqueen_Consumer_Key,

      momentum_ruby_8063_dev_ed_SF_USERNAME,
      momentum_ruby_8063_dev_ed_Consumer_Key,

      efficiency_enterprise_6328_dev_ed_SF_USERNAME,
      efficiency_enterprise_6328_dev_ed_Consumer_Key,

      SF_VERSION,
      SALESFORCE_LOGIN_URL,
    },
    ...props,
    entry: join(__dirname, `../../../dist/${props.entry}.js`),
    handler: 'handler',
  });
