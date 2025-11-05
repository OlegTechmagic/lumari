import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

import { CONFIG } from '../../../config';
import { LambdaTemplate } from './lambdaTemplate';

export class LambdaConstruct extends Construct {
  public readonly lambdas: NodejsFunction[];

  constructor(scope: Construct, id: string, functions: string[]) {
    super(scope, id);

    this.lambdas = functions.map((fn) =>
      LambdaTemplate(this, fn, {
        functionName: 'lumary-' + fn + `-${CONFIG.NODE_ENV}`,
        entry: fn,
        handler: 'handler',
      }),
    );
  }
}
