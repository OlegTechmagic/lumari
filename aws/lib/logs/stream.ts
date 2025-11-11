import { NODE_ENV } from '@config';
import { aws_kinesisfirehose as firehose } from 'aws-cdk-lib';
import { Construct } from 'constructs';
export class FireHouseStream extends Construct {
  stream: firehose.CfnDeliveryStream;

  constructor(scope: Construct, id: string, arns: { bucketArn: string; roleArn: string }) {
    super(scope, id);

    this.stream = new firehose.CfnDeliveryStream(this, `FirehoseDeliveryStream-${NODE_ENV}`, {
      s3DestinationConfiguration: {
        bucketArn: arns.bucketArn,
        roleArn: arns.roleArn,
        bufferingHints: {
          intervalInSeconds: 60,
          sizeInMBs: 5,
        },
        compressionFormat: 'GZIP',
      },
    });
  }
}
