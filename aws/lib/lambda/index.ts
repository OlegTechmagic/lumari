import { NODE_ENV } from '@config';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

import { LambdaTemplate } from './lambdaTemplate';

export class LambdaConstruct extends Construct {
  public readonly lambdas: { name: string; lambda: NodejsFunction }[];

  constructor(scope: Construct, id: string, functions: string[]) {
    super(scope, id);

    this.lambdas = functions.map((fn) => ({
      name: fn,
      lambda: LambdaTemplate(this, fn + `-${NODE_ENV}`, {
        functionName: 'lumary-' + fn + `-${NODE_ENV}`,
        entry: fn,
      }),
    }));
  }
}
