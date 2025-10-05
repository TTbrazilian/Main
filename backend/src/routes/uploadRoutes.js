import path from 'path';
import fs from 'fs';
import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';

const router = express.Router();

const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/\s+/g, '-').toLowerCase();
    cb(null, `${Date.now()}-${safe}`);
  }
});

const upload = multer({ storage });

router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Arquivo não enviado' });
  const url = `/uploads/${req.file.filename}`;
  res.status(201).json({ url });
});

export default router;
