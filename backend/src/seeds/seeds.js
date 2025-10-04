import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import connectDB from '../config/db.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

dotenv.config();

async function ensureConnected() {
  if (mongoose.connection.readyState === 1) return;
  await connectDB();
}

async function upsertUser({ name, email, password, isAdmin = false }) {
  const exists = await User.findOne({ email });
  if (exists) {
    console.log(`Usuário já existe: ${email}`);
    return exists;
  }
  const user = new User({
    name,
    email,
    password,    // será hasheado pelo pre('save')
    isAdmin
  });
  await user.save();
  console.log(`Usuário criado: ${email}  (admin: ${isAdmin})`);
  return user;
}

async function seedProductsIfEmpty() {
  const count = await Product.countDocuments({});
  if (count > 0) {
    console.log(`Catálogo já tem ${count} produtos — não vou duplicar.`);
    return;
  }

  const items = [
    {
      name: 'Camiseta Nexus',
      description: 'Camiseta 100% algodão, corte unissex.',
      price: 59.9,
      stock: 50,
      categories: ['roupas'],
      images: ['https://picsum.photos/seed/nexus-shirt/600/400'],
      isActive: true
    },
    {
      name: 'Mouse Gamer Pulse',
      description: 'Sensor óptico 12.000 DPI, RGB.',
      price: 129.9,
      stock: 30,
      categories: ['periféricos', 'eletrônicos'],
      images: ['https://picsum.photos/seed/pulse-mouse/600/400'],
      isActive: true
    },
    {
      name: 'Headset Void',
      description: 'Som estéreo com bom isolamento.',
      price: 199.9,
      stock: 20,
      categories: ['áudio', 'eletrônicos'],
      images: ['https://picsum.photos/seed/void-headset/600/400'],
      isActive: true
    }
  ];

  await Product.insertMany(items);
  console.log(`${items.length} produtos inseridos.`);
}

async function main() {
  try {
    await ensureConnected();

    // Permite sobrescrever por env se quiser
    const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || 'admin@nexusc.art';
    const ADMIN_PASS  = process.env.SEED_ADMIN_PASS  || 'admin123';
    const USER_EMAIL  = process.env.SEED_USER_EMAIL  || 'user@nexusc.art';
    const USER_PASS   = process.env.SEED_USER_PASS   || 'user123';

    await upsertUser({ name: 'Admin', email: ADMIN_EMAIL, password: ADMIN_PASS, isAdmin: true });
    await upsertUser({ name: 'Cliente', email: USER_EMAIL, password: USER_PASS, isAdmin: false });

    await seedProductsIfEmpty();

    console.log('\n✓ Seed concluído.');
  } catch (err) {
    console.error('Seed falhou:', err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

main();