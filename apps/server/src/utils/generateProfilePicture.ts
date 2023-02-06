import { uploadFileToS3 } from '../s3/s3Provider.js';
import { createDiceBearAvatar } from './DiceBearGenerator.js';

export const generateProfilePicture = async (seed: string) => {
  const pictureBuffer: Buffer = (await createDiceBearAvatar(seed)) as Buffer;

  return await uploadFileToS3({ buffer: pictureBuffer, contentType: 'image/png' });
};
