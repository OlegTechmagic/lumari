import { NODE_ENV } from '@config';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { LumaryStack } from './lumariStack';

export class Stage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new LumaryStack(this, 'lumari-api-stack' + NODE_ENV);
  }
}
