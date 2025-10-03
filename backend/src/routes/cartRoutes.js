import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

const router = express.Router();

router.delete('/', protect, async (req, res) => {
  const user = await User.findById(req.user);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
  user.cart = [];
  await user.save();
  res.json({ message: 'Carrinho limpo' });
});

router.get('/summary', protect, async (req, res) => {
  const user = await User.findById(req.user).populate('cart.product', 'name price images');
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

  const items = (user.cart || []).map(i => ({
    product: i.product?._id || i.product,
    name: i.product?.name,
    price: i.product?.price ?? 0,
    qty: i.qty,
    image: i.product?.images?.[0] || null
  }));

  const subtotal = items.reduce((acc, it) => acc + (it.price * it.qty), 0);
  res.json({ count: items.length, items, subtotal });
});

export default router;
