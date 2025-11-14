import { NODE_ENV } from '@config';
import * as cdk from 'aws-cdk-lib';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import * as fs from 'fs';
import * as path from 'path';

import { ApiGateway } from './apiGateway';
import { LambdaConstruct } from './lambda';
import { LoggerConstruct } from './logs';
import { SecretStorage } from './secretStorage';

export class LumaryStack extends cdk.Stack {
  public readonly serverKeySecret: secretsmanager.ISecret;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const secretStorage = new SecretStorage(this, 'SecretStorage' + NODE_ENV);

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
      secretStorage.grantReadAccess(lambda);

      apiGateway.setRoute(name, lambda);
    });
  }
}
