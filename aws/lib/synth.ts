import {
  abadancingqueen_Consumer_Key,
  abadancingqueen_SF_USERNAME,
  efficiency_enterprise_6328_dev_ed_Consumer_Key,
  efficiency_enterprise_6328_dev_ed_SF_USERNAME,
  HITHUB_REPO,
  momentum_ruby_8063_dev_ed_Consumer_Key,
  momentum_ruby_8063_dev_ed_SF_USERNAME,
  NODE_ENV,
} from '@config';
import * as cdk from 'aws-cdk-lib';
import { CodeBuildStep, CodePipelineSource } from 'aws-cdk-lib/pipelines';

export class SynthStep extends CodeBuildStep {
  constructor(branch: string) {
    super('LumariSynth', {
      input: CodePipelineSource.gitHub(HITHUB_REPO, branch, {
        authentication: cdk.SecretValue.secretsManager('lumary-github-token'),
      }),
      installCommands: ['npm i -g yarn', 'npm i -g aws-cdk'],

      buildEnvironment: {
        privileged: true,
        environmentVariables: {
          NODE_ENV: {
            value: NODE_ENV,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
          HITHUB_REPO: {
            value: HITHUB_REPO,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
          PIPELINE_BRANCH: {
            value: branch,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },

          abadancingqueen_SF_USERNAME: {
            value: abadancingqueen_SF_USERNAME,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
          abadancingqueen_Consumer_Key: {
            value: abadancingqueen_Consumer_Key,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
          abadancingqueen_KEY_SECRET_NAME: {
            value: `lumary_api_abadancingqueen_server_key_${NODE_ENV}`,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },

          efficiency_enterprise_6328_dev_ed_SF_USERNAME: {
            value: efficiency_enterprise_6328_dev_ed_SF_USERNAME,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
          efficiency_enterprise_6328_dev_ed_Consumer_Key: {
            value: efficiency_enterprise_6328_dev_ed_Consumer_Key,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
          efficiency_enterprise_6328_dev_ed_KEY_SECRET_NAME: {
            value: `lumary_api_efficiency_enterprise_6328_dev_ed_server_key_${NODE_ENV}`,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },

          momentum_ruby_8063_dev_ed_SF_USERNAME: {
            value: momentum_ruby_8063_dev_ed_SF_USERNAME,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
          momentum_ruby_8063_dev_ed_Consumer_Key: {
            value: momentum_ruby_8063_dev_ed_Consumer_Key,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
          momentum_ruby_8063_dev_ed_KEY_SECRET_NAME: {
            value: `lumary_api_momentum_ruby_8063_dev_ed_server_key_${NODE_ENV}`,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
        },
      },
      commands: ['yarn install --production=false', 'npx cdk synth'],
    });
  }
}
