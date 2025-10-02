import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';


dotenv.config(); // Carrega variáveis de ambiente

const app = express();

// Conectar ao MongoDB
connectDB();

// Middleware
app.use(cors()); // Habilita CORS
app.use(express.json()); // Permite que o servidor entenda JSON

// Usar as rotas de usuário
app.use('/api/users', userRoutes);

// Rota de exemplo
app.get('/', (req, res) => {
  res.send('API NexusCart está funcionando');
});

// Definir a porta
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
