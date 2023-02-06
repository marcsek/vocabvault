import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto';

const accessKey = process.env.S3_BUCKET_ACCESS_KEY;
const secret = process.env.S3_BUCKET_SECRET;
const bucketName = process.env.S3_BUCKET_NAME;
const region = process.env.S3_BUCKET_REGION;

console.log(accessKey, secret, bucketName, region);

if (!accessKey || !secret || !bucketName || !region) {
  throw new Error('Bucket credential were not specified.');
}

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secret,
  },
  region,
});

const randomImageName = () => crypto.randomBytes(16).toString('hex');

interface UploadFileArgs {
  buffer: Buffer;
  key?: string;
  contentType: string;
}

export const uploadFileToS3 = async ({ buffer, contentType, key }: UploadFileArgs) => {
  const fileName = key ?? randomImageName();

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Body: buffer,
    ContentType: contentType,
    Key: fileName,
  });

  await s3.send(command);

  return fileName;
};

export const generateS3PresignedUrl = async (key: string) => {
  const command = new GetObjectCommand({ Bucket: bucketName, Key: key });

  const url = await getSignedUrl(s3, command, { expiresIn: 60 * 60 });

  return url;
};
