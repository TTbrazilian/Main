// backend/src/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Rotas
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js'; // Dia 2 Integrante 1
import cartRoutes from './routes/cartRoutes.js';       // Dia 2 Integrante 2
import orderRoutes from './routes/orderRoutes.js';     // Dia 2 Integrante 2

dotenv.config();

const app = express();

// Conecta ao MongoDB (top-level await porque estamos em ESM)
await connectDB();

// Middlewares básicos
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json()); // JSON body
app.use(express.urlencoded({ extended: true })); // se precisar ler form-encoded

// Health & raiz
app.get('/health', (_, res) => res.json({ ok: true }));
app.get('/', (_, res) => res.send('API NexusCart está funcionando'));

// Rotas da aplicação
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// (Opcional) handler simples de rota não encontrada
app.use((req, res) => res.status(404).json({ message: 'Rota não encontrada' }));

// Sobe o servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
