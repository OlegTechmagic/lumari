import { LOG_LEVEL, NODE_ENV } from '@config';
import { aws_iam as iam, aws_logs as logs, aws_s3 } from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { FireHouseBucket } from './bucket';
import { FireHouseStream } from './stream';

export class LoggerConstruct extends Construct {
  private cwLogsToFirehoseRole: iam.Role;
  private firehoseDeliveryRole: iam.Role;
  private firehoseStreamArn: string;
  bucket: aws_s3.Bucket;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.cwLogsToFirehoseRole = new iam.Role(this, `CloudWatchLogsToFirehoseRole-${NODE_ENV}`, {
      assumedBy: new iam.ServicePrincipal('logs.amazonaws.com'),
    });
    this.firehoseDeliveryRole = new iam.Role(this, `FirehoseDeliveryRole-${NODE_ENV}`, {
      assumedBy: new iam.ServicePrincipal('firehose.amazonaws.com'),
    });

    const bucketConstruct = new FireHouseBucket(this, `FirehoseDeliveryBucket-${NODE_ENV}`);
    this.bucket = bucketConstruct.bucket;
    const firehoseStream = new FireHouseStream(this, `FirehoseDeliveryStream-${NODE_ENV}`, {
      bucketArn: this.bucket.bucketArn,
      roleArn: this.firehoseDeliveryRole.roleArn,
    });

    this.firehoseStreamArn = firehoseStream.stream.attrArn;
  }

  public grantPermissions() {
    this.cwLogsToFirehoseRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ['firehose:PutRecord', 'firehose:PutRecordBatch'],
        resources: ['*'],
      }),
    );

    this.bucket.grantWrite(this.firehoseDeliveryRole);

    this.firehoseDeliveryRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ['s3:PutObject', 's3:GetBucketLocation', 's3:ListBucket'],
        resources: [this.bucket.bucketArn, `${this.bucket.bucketArn}/*`],
      }),
    );
  }

  constructLogGroup(name: string) {
    const logGroup = new logs.LogGroup(this, `${name}-LogGroup-${NODE_ENV}`, {
      logGroupName: `/aws/lambda/lumary-${name}-${NODE_ENV}`,
      retention: logs.RetentionDays.ONE_WEEK,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const filterPattern = logs.FilterPattern.literal(LOG_LEVEL);

    return new logs.CfnSubscriptionFilter(this, `${name}LogSubscription-${NODE_ENV}`, {
      destinationArn: this.firehoseStreamArn,
      filterPattern: filterPattern.logPatternString,
      logGroupName: logGroup.logGroupName,
      roleArn: this.cwLogsToFirehoseRole.roleArn,
    });
  }
}
