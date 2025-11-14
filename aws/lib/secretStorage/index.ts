import { NODE_ENV } from '@config';
import { SFOrg } from '@types';
import { aws_lambda_nodejs } from 'aws-cdk-lib';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

import { SecretStoreItem } from './Item';

const SF_ORGS: SFOrg[] = [
  'abadancingqueen',
  'efficiency_enterprise_6328_dev_ed',
  'momentum_ruby_8063_dev_ed',
];

export class SecretStorage extends Construct {
  public readonly secret: secretsmanager.ISecret;
  secrets: secretsmanager.ISecret[] = [];

  constructor(scope: Construct, id: string) {
    super(scope, id);

    SF_ORGS.map((sforg) => {
      this.secrets.push(
        new SecretStoreItem(this, `server_key_${sforg}_` + NODE_ENV, {
          secretName: 'server_key',
          sforg,
        }).secret,
      );
    });
  }

  grantReadAccess(lambda: aws_lambda_nodejs.NodejsFunction) {
    this.secrets.forEach((secret) => secret.grantRead(lambda));
  }
}
