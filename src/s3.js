import {
  CreateBucketCommand,
  DeleteBucketCommand,
  ListBucketsCommand,
  S3Client,
} from '@aws-sdk/client-s3';

export const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

export const getAllBucket = async () => {
  const buckets = new ListBucketsCommand({});
  const data = await s3.send(buckets);
  return data.Buckets;
};

export const createBucket = async (bucket) => {
  const data = await s3.send(new CreateBucketCommand({ Bucket: bucket }));
  return data;
};

export const deleteBucket = async (bucket) => {
  const data = s3.send(new DeleteBucketCommand({ Bucket: bucket }));
  return data;
};
