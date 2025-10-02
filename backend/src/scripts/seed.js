import 'dotenv/config';
import mongoose from 'mongoose';
import Product from '../src/models/Product.js';

async function run(){
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany({});
  await Product.insertMany([
    { name: 'Camiseta Nexus', price: 59.9, stock: 50, categories: ['roupas'], images: [] },
    { name: 'Caneca Dev',     price: 39.9, stock: 80, categories: ['acessorios'], images: [] },
    { name: 'Mouse Gamer',    price:199.9, stock: 20, categories: ['eletronicos'], images: [] }
  ]);
  console.log('Seed concluído.');
  await mongoose.disconnect();
}
run().catch(err => { console.error(err); process.exit(1); });
