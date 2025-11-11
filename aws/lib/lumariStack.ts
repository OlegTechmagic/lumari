import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as fs from 'fs';
import * as path from 'path';

import { ApiGateway } from './apiGateway';
import { LambdaConstruct } from './lambda';
import { LoggerConstruct } from './logs';

export class LumaryStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const files = fs.readdirSync(path.join(__dirname, '../../dist'));

    const LAMBDAS = files
      .filter((file) => file.endsWith('.js'))
      .map((file) => path.basename(file).replace(/\.[^.]+$/, ''));

    console.log('LAMBDAS', LAMBDAS);

    const lambdaConstruct = new LambdaConstruct(this, 'LumaryLambdas', LAMBDAS);
    const apiGateway = new ApiGateway(this, 'LumaryApiGateway');
    const loggerConstruct = new LoggerConstruct(this, 'LumaryLogger');
    loggerConstruct.grantPermissions();

    lambdaConstruct.lambdas.forEach(({ name, lambda }) => {
      loggerConstruct.constructLogGroup(name);
      return apiGateway.setRoute(name, lambda);
    });
  }
}
