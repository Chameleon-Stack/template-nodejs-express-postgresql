import crypto from 'crypto';
import multer from 'multer';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadFolder = resolve(__dirname, '..', '..', 'upload');

export default {
  uploadFolder,

  storage: multer.diskStorage({
    destination: uploadFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
