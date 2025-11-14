import { NODE_ENV } from '@config';
import { SFOrg } from '@types';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

export interface ServerKeyConstructProps {
  secretName: string;
  sforg: SFOrg;
}

export class SecretStoreItem extends Construct {
  public readonly secret: secretsmanager.ISecret;

  constructor(scope: Construct, id: string, props: ServerKeyConstructProps) {
    super(scope, id);

    const secretName = `lumary_api_${props.sforg}_${props.secretName}_${NODE_ENV}`;

    let secret: secretsmanager.ISecret;
    try {
      secret = secretsmanager.Secret.fromSecretNameV2(
        this,
        'ImportedSecret_' + NODE_ENV,
        secretName,
      );
    } catch {
      secret = new secretsmanager.Secret(this, secretName, {
        secretName,
        description: 'Private key for server authentication',
      });
    }

    this.secret = secret;
  }
}
