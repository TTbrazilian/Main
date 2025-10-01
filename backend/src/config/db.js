import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente

const connectDB = async () => {
  try {
    // Usar process.env.MONGO_URI para pegar a string de conexão
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Erro de conexão ao MongoDB:', error.message);
    process.exit(1); // Fecha o processo caso não consiga conectar
  }
};

export default connectDB;

