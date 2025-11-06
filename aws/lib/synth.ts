import {
  abadancingqueen_SF_CLIENT_ID,
  abadancingqueen_SF_CLIENT_SECRET,
  abadancingqueen_SF_PASSWORD,
  abadancingqueen_SF_SECURITY_TOKEN,
  abadancingqueen_SF_USERNAME,
  abadancingqueen_SF_VERSION,
  efficiency_enterprise_6328_dev_ed_SF_CLIENT_ID,
  efficiency_enterprise_6328_dev_ed_SF_CLIENT_SECRET,
  efficiency_enterprise_6328_dev_ed_SF_PASSWORD,
  efficiency_enterprise_6328_dev_ed_SF_SECURITY_TOKEN,
  efficiency_enterprise_6328_dev_ed_SF_USERNAME,
  efficiency_enterprise_6328_dev_ed_SF_VERSION,
  HITHUB_REPO,
  momentum_ruby_8063_dev_ed_SF_CLIENT_ID,
  momentum_ruby_8063_dev_ed_SF_CLIENT_SECRET,
  momentum_ruby_8063_dev_ed_SF_PASSWORD,
  momentum_ruby_8063_dev_ed_SF_SECURITY_TOKEN,
  momentum_ruby_8063_dev_ed_SF_USERNAME,
  momentum_ruby_8063_dev_ed_SF_VERSION,
  NODE_ENV,
} from '@config';
import * as cdk from 'aws-cdk-lib';
import { CodeBuildStep, CodePipelineSource } from 'aws-cdk-lib/pipelines';

export class SynthStep extends CodeBuildStep {
  constructor(branch: string) {
    super('LumariSynth', {
      input: CodePipelineSource.gitHub(HITHUB_REPO, branch, {
        authentication: cdk.SecretValue.secretsManager('github-token'),
      }),
      installCommands: ['npm i -g yarn', 'npm i -g aws-cdk'],

      buildEnvironment: {
        privileged: true,
        environmentVariables: {
          NODE_ENV: {
            value: NODE_ENV,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
          PIPELINE_BRANCH: {
            value: branch,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
          abadancingqueen_SF_CLIENT_ID: {
            value: abadancingqueen_SF_CLIENT_ID,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
          abadancingqueen_SF_CLIENT_SECRET: {
            value: abadancingqueen_SF_CLIENT_SECRET,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
          abadancingqueen_SF_PASSWORD: {
            value: abadancingqueen_SF_PASSWORD,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
          abadancingqueen_SF_SECURITY_TOKEN: {
            value: abadancingqueen_SF_SECURITY_TOKEN,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
          abadancingqueen_SF_USERNAME: {
            value: abadancingqueen_SF_USERNAME,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
          abadancingqueen_SF_VERSION: {
            value: abadancingqueen_SF_VERSION,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
          efficiency_enterprise_6328_dev_ed_SF_CLIENT_ID: {
            value: efficiency_enterprise_6328_dev_ed_SF_CLIENT_ID,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
          efficiency_enterprise_6328_dev_ed_SF_CLIENT_SECRET: {
            value: efficiency_enterprise_6328_dev_ed_SF_CLIENT_SECRET,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
          efficiency_enterprise_6328_dev_ed_SF_PASSWORD: {
            value: efficiency_enterprise_6328_dev_ed_SF_PASSWORD,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
          efficiency_enterprise_6328_dev_ed_SF_SECURITY_TOKEN: {
            value: efficiency_enterprise_6328_dev_ed_SF_SECURITY_TOKEN,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
          efficiency_enterprise_6328_dev_ed_SF_USERNAME: {
            value: efficiency_enterprise_6328_dev_ed_SF_USERNAME,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
          efficiency_enterprise_6328_dev_ed_SF_VERSION: {
            value: efficiency_enterprise_6328_dev_ed_SF_VERSION,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
          momentum_ruby_8063_dev_ed_SF_CLIENT_ID: {
            value: momentum_ruby_8063_dev_ed_SF_CLIENT_ID,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
          momentum_ruby_8063_dev_ed_SF_CLIENT_SECRET: {
            value: momentum_ruby_8063_dev_ed_SF_CLIENT_SECRET,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
          momentum_ruby_8063_dev_ed_SF_PASSWORD: {
            value: momentum_ruby_8063_dev_ed_SF_PASSWORD,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
          momentum_ruby_8063_dev_ed_SF_SECURITY_TOKEN: {
            value: momentum_ruby_8063_dev_ed_SF_SECURITY_TOKEN,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
          momentum_ruby_8063_dev_ed_SF_USERNAME: {
            value: momentum_ruby_8063_dev_ed_SF_USERNAME,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
          momentum_ruby_8063_dev_ed_SF_VERSION: {
            value: momentum_ruby_8063_dev_ed_SF_VERSION,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
        },
      },
      commands: ['yarn install --production=false', 'npx cdk synth'],
    });
  }
}
