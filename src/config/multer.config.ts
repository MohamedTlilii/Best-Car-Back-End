import { diskStorage } from 'multer';
import { extname } from 'path';
import { mkdirSync, existsSync } from 'fs';

// Ensure the upload directory exists
const uploadDir = './uploads';
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir, { recursive: true });
}

export const multerConfig = {
  storage: diskStorage({
    destination: uploadDir,
    filename: (req, file, callback) => {
      // Generate a unique filename based on timestamp and original file extension
      const fileExtName = extname(file.originalname);
      const fileName = `${Date.now()}${fileExtName}`;
      callback(null, fileName);
    },
  }),
  fileFilter: (req, file, callback) => {
    // Check if the file type is allowed
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
      return callback(new Error('Unsupported file type'), false);
    }
    callback(null, true);
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit files to 10 MB
  },
};
