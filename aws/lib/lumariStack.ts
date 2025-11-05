import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { LAMBDAS } from '../../config';
import { ApiGateway } from './apiGateway';
import { LambdaConstruct } from './lambda';

export class LumaryStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const lambdaConstruct = new LambdaConstruct(this, 'LumaryLambdas', LAMBDAS);
    const apiGateway = new ApiGateway(this, 'LumaryApiGateway');

    lambdaConstruct.lambdas.forEach((lambda) => {
      apiGateway.setRoute(lambda.functionName, lambda);
    });
  }
}
