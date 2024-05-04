import {
  CreateBucketCommand,
  DeleteBucketCommand,
  S3Client,
} from '@aws-sdk/client-s3';

export const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

export const createBucket = async (bucket) => {
  const data = await s3.send(new CreateBucketCommand({ Bucket: bucket }));
  return data;
};

export const deleteBucket = async (bucket) => {
  try {
    const data = s3.send(new DeleteBucketCommand({ Bucket: bucket }));
    return data;
  } catch (error) {
    throw new error(error.message);
  }
};
