import { join } from 'node:path';

import { Duration } from 'aws-cdk-lib';
import { FunctionOptions, ILayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

import { CONFIG } from '../../../config';
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
      NODE_ENV: CONFIG.NODE_ENV,
    },
    ...props,
    entry: join(__dirname, `../../../dist/${props.entry}.js`),
    handler: 'handler',
  });
