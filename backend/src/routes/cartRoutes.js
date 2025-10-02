import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

const router = express.Router();

// GET /api/cart  → itens do carrinho (populados)
router.get('/', protect, async (req, res) => {
  const me = await User.findById(req.user).populate('cart.product');
  return res.json(me?.cart ?? []);
});

// POST /api/cart  { productId, qty }
router.post('/', protect, async (req, res) => {
  const { productId, qty = 1 } = req.body;
  if (!productId) return res.status(400).json({ message: 'productId é obrigatório' });

  const product = await Product.findById(productId);
  if (!product || !product.isActive) return res.status(404).json({ message: 'Produto não encontrado' });

  const me = await User.findById(req.user);
  const idx = me.cart.findIndex(i => i.product.toString() === productId);

  if (idx >= 0) {
    me.cart[idx].qty += Number(qty);
  } else {
    me.cart.push({ product: productId, qty: Number(qty) });
  }

  await me.save();
  const populated = await me.populate('cart.product');
  return res.status(201).json(populated.cart);
});

// PATCH /api/cart/:productId  { qty }  → altera quantidade
router.patch('/:productId', protect, async (req, res) => {
  const { qty } = req.body;
  if (!qty || qty < 1) return res.status(400).json({ message: 'qty inválido' });

  const me = await User.findById(req.user);
  const idx = me.cart.findIndex(i => i.product.toString() === req.params.productId);
  if (idx < 0) return res.status(404).json({ message: 'Item não está no carrinho' });

  me.cart[idx].qty = Number(qty);
  await me.save();
  const populated = await me.populate('cart.product');
  return res.json(populated.cart);
});

// DELETE /api/cart/:productId → remove item
router.delete('/:productId', protect, async (req, res) => {
  const me = await User.findById(req.user);
  const before = me.cart.length;
  me.cart = me.cart.filter(i => i.product.toString() !== req.params.productId);
  if (me.cart.length === before) return res.status(404).json({ message: 'Item não encontrado' });
  await me.save();
  return res.status(204).end();
});

export default router;
