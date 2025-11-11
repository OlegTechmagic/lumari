import { NODE_ENV } from '@config';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
export class FireHouseBucket extends Construct {
  bucket: s3.Bucket;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.bucket = new s3.Bucket(this, `FirehoseDeliveryBucket-${NODE_ENV}`, {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      bucketName: `lumary-logs-${NODE_ENV}`,
    });
  }
}
