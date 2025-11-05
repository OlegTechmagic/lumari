import { CONFIG } from '@config';
import * as cdk from 'aws-cdk-lib';
import { CodeBuildStep, CodePipelineSource } from 'aws-cdk-lib/pipelines';

export class SynthStep extends CodeBuildStep {
  constructor(branch: string) {
    super('LumariSynth', {
      input: CodePipelineSource.gitHub(CONFIG.HITHUB_REPO, branch, {
        authentication: cdk.SecretValue.secretsManager('github-token'),
      }),
      installCommands: ['npm i -g yarn', 'npm i -g aws-cdk'],

      buildEnvironment: {
        privileged: true,
        environmentVariables: {
          NODE_ENV: {
            value: CONFIG.NODE_ENV,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
          PIPELINE_BRANCH: {
            value: branch,
            type: cdk.aws_codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
        },
      },
      commands: ['yarn install --production=false', 'npx cdk synth'],
    });
  }
}
