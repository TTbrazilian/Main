// backend/src/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// ⬇️ upload
import uploadRoutes from './routes/uploadRoutes.js';
// (opcional) proteger upload com admin
import { protect, admin } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();

await connectDB();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ⬇️ servir arquivos enviados (ex.: http://localhost:4000/uploads/arquivo.jpg)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/health', (_, res) => res.json({ ok: true }));
app.get('/', (_, res) => res.send('API NexusCart está funcionando'));

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// ⬇️ rota de upload (escolha UMA das duas linhas)
// ► liberar para todos autenticados:
// app.use('/api/upload', protect, uploadRoutes);

// ► liberar só para ADMIN (recomendado em produção):
app.use('/api/upload', protect, admin, uploadRoutes);

app.use((req, res) => res.status(404).json({ message: 'Rota não encontrada' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
