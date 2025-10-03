import path from 'path';
import fs from 'fs';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const safe = file.originalname.replace(/\s+/g, '-').toLowerCase();
    const name = `${Date.now()}-${safe}`;
    cb(null, name);
  }
});
const upload = multer({ storage });

// POST /api/upload  (form-data: file)
router.post('/', upload.single('file'), (req, res) => {
  const fileUrl = `/uploads/${req.file.filename}`;
  res.status(201).json({ url: fileUrl });
});

export default router;
