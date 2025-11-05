import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class LumaryStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaNames = ['lambda1', 'lambda2', 'lambda3', 'lambda4', 'lambda5'];
    const lambdas: lambda.Function[] = [];

    for (const name of lambdaNames) {
      const fn = new lambda.Function(this, `Lambda${name}`, {
        runtime: lambda.Runtime.NODEJS_LATEST,
        handler: `dist/${name}.handler`,
        code: lambda.Code.fromAsset('handlers'),
      });
      lambdas.push(fn);
    }

    // Optionally create an API Gateway for each Lambda or one that routes to one Lambda
    // Here we create an API Gateway for the first Lambda as an example
    const api = new apigateway.LambdaRestApi(this, 'LumaryApiGateway', {
      handler: lambdas[0],
      proxy: true,
    });
  }
}
