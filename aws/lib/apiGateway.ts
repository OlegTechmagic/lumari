import { CONFIG } from '@config';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

const { NODE_ENV } = CONFIG;

export class ApiGateway extends Construct {
  restApi: RestApi;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.restApi = new RestApi(this, 'lumari-api', {
      description: 'Lumari Http Api',
      restApiName: `lumari-api-${NODE_ENV}`,
      deployOptions: { stageName: NODE_ENV },
    });
  }

  public setRoute(path: string, handler: NodejsFunction) {
    console.log('PATH', path);
    const integration = new LambdaIntegration(handler, {
      proxy: true,
      allowTestInvoke: false,
    });

    const resource = this.restApi.root.addResource(path);
    resource.addMethod('ANY', integration);
  }
}
