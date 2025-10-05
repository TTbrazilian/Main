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
  const idemKey = (req.headers['idempotency-key'] || '').toString().trim() || null;

  if (idemKey) {
    const existing = await Order.findOne({ user: req.user, idempotencyKey: idemKey });
    if (existing) return res.status(200).json(existing);
  }

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
    items, subtotal, shipping, discount, total,
    shippingAddress,
    status: 'PLACED',
    idempotencyKey: idemKey || undefined
  });

  user.cart = [];
  await user.save();

  res.status(201).json(order);
});

router.get('/', protect, async (req, res) => {
  const { page = 1, limit = 10, status, from, to } = req.query;

  const p = Math.max(parseInt(page), 1);
  const l = Math.min(parseInt(limit), 50);
  const skip = (p - 1) * l;

  const query = { user: req.user };
  if (status) query.status = status;

  if (from || to) {
    query.createdAt = {};
    if (from) query.createdAt.$gte = new Date(from);
    if (to)   query.createdAt.$lte = new Date(to);
  }

  const [items, total] = await Promise.all([
    Order.find(query).sort({ createdAt: -1 }).skip(skip).limit(l),
    Order.countDocuments(query)
  ]);

  res.json({ items, page: p, total, pages: Math.ceil(total / l) });
});

export default router;
