import { CONFIG } from '@config';
import * as cdk from 'aws-cdk-lib';
import { CodePipeline } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';

import { Stage } from './stage';
import { SynthStep } from './synth';

const { NODE_ENV, PIPELINE_BRANCH } = CONFIG;

export class Pipeline extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, `lumari-pipeline-${NODE_ENV}`, {
      pipelineName: `skyrise-be-${NODE_ENV}`,
      selfMutation: true,
      synth: new SynthStep(PIPELINE_BRANCH),
    });

    pipeline.addStage(new Stage(this, `lumari-stage-${NODE_ENV}`));
  }
}
