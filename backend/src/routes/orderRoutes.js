import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

const router = express.Router();

// POST /api/orders  → cria pedido a partir do carrinho do usuário
router.post('/', protect, async (req, res) => {
  // Carrinho do usuário com produtos populados
  const me = await User.findById(req.user).populate('cart.product');
  if (!me || !me.cart || me.cart.length === 0) {
    return res.status(400).json({ message: 'Carrinho vazio' });
  }

  // Monta itens + calcula total
  const items = me.cart.map(i => ({
    product: i.product._id,
    qty: i.qty,
    price: i.product.price
  }));
  const total = items.reduce((acc, i) => acc + i.qty * i.price, 0);

  // (Opcional) checar estoque disponível
  for (const i of me.cart) {
    if (i.product.stock < i.qty) {
      return res.status(400).json({ message: `Estoque insuficiente para ${i.product.name}` });
    }
  }

  // (Opcional) abater estoque
  for (const i of me.cart) {
    await Product.updateOne({ _id: i.product._id }, { $inc: { stock: -i.qty } });
  }

  // Cria pedido, limpa carrinho
  const order = await Order.create({ user: me._id, items, total, status: 'PLACED' });
  me.cart = [];
  await me.save();

  return res.status(201).json(order);
});

// GET /api/orders → lista pedidos do usuário logado (paginado)
router.get('/', protect, async (req, res) => {
  const page  = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit) || 10, 50);
  const skip  = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Order.find({ user: req.user })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('items.product'),
    Order.countDocuments({ user: req.user })
  ]);

  return res.json({ items, page, total, pages: Math.ceil(total / limit) });
});

export default router;
