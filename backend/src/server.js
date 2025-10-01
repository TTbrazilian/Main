import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express();

// Conectar ao MongoDB
import mongoose from 'mongoose';
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(cors());  // Habilita CORS
app.use(express.json()); // Permite receber dados em JSON

// Rota de exemplo
app.get('/', (req, res) => {
  res.send('API NexusCart está funcionando');
});

// Definir a porta
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
