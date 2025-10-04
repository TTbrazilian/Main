import express from 'express';
import mongoose from 'mongoose';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { calcShipping, calcDiscount, finalizeTotals } from '../utils/checkout.js';

const router = express.Router();

router.post('/', protect, async (req, res) => {
  const { shippingAddress, cep, coupon } = req.body;

  const user = await User.findById(req.user).populate('cart.product');
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
  if (!user.cart?.length) return res.status(400).json({ message: 'Carrinho vazio' });

  const items = user.cart.map(i => ({
    product: i.product._id,
    name: i.product.name,
    price: i.product.price ?? 0,
    qty: i.qty,
    image: i.product.images?.[0] || null
  }));

  const subtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0);
  let shipping = calcShipping(subtotal, String(cep || shippingAddress?.zip || ''));
  let discount = calcDiscount(subtotal, String(coupon));
  if ((coupon || '').trim().toUpperCase() === 'FRETEGRATIS') shipping = 0;

  const total = finalizeTotals(subtotal, shipping, discount);

  const order = await Order.create({
    user: user._id,
    items,
    subtotal,
    shipping,
    discount,
    total,
    shippingAddress,
    status: 'PLACED'
  });

  user.cart = [];
  await user.save();

  res.status(201).json(order);
});

router.get('/', protect, async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const p = Math.max(parseInt(page), 1);
  const l = Math.min(parseInt(limit), 50);
  const skip = (p - 1) * l;

  const [items, total] = await Promise.all([
    Order.find({ user: req.user }).sort({ createdAt: -1 }).skip(skip).limit(l),
    Order.countDocuments({ user: req.user })
  ]);

  res.json({ items, page: p, total, pages: Math.ceil(total / l) });
});

router.get('/:id', protect, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.user });
  if (!order) return res.status(404).json({ message: 'Pedido não encontrado' });
  res.json(order);
});

router.patch('/:id/pay', protect, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.user });
  if (!order) return res.status(404).json({ message: 'Pedido não encontrado' });
  if (order.status !== 'PLACED') return res.status(400).json({ message: 'Pedido não está pendente de pagamento' });

  for (const it of order.items) {
    const prod = await Product.findById(it.product);
    if (!prod) return res.status(404).json({ message: `Produto ${it.product} não encontrado` });
    if ((prod.stock ?? 0) < it.qty) {
      return res.status(400).json({ message: `Estoque insuficiente para ${prod.name}` });
    }
    prod.stock -= it.qty;
    await prod.save();
  }

  order.status = 'PAID';
  order.paidAt = new Date();
  await order.save();

  res.json(order);
});

router.patch('/:id/cancel', protect, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.user });
  if (!order) return res.status(404).json({ message: 'Pedido não encontrado' });
  if (order.status === 'CANCELED') return res.status(400).json({ message: 'Pedido já está cancelado' });

  if (order.status === 'PAID') {
    for (const it of order.items) {
      const prod = await Product.findById(it.product);
      if (prod) {
        prod.stock = (prod.stock ?? 0) + it.qty;
        await prod.save();
      }
    }
  }

  order.status = 'CANCELED';
  await order.save();
  res.json(order);
});

router.get('/summary', protect, async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user);
  const agg = await Order.aggregate([
    { $match: { user: userId } },
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);

  const map = Object.fromEntries(agg.map(x => [x._id, x.count]));
  res.json({
    placed: map.PLACED || 0,
    paid: map.PAID || 0,
    canceled: map.CANCELED || 0,
    total: (map.PLACED || 0) + (map.PAID || 0) + (map.CANCELED || 0)
  });
});

export default router;
