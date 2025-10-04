import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import { calcShipping, calcDiscount, finalizeTotals } from '../utils/checkout.js';

const router = express.Router();

router.get('/checkout-preview', protect, async (req, res) => {
  const { cep = '', coupon = '' } = req.query;
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
  let shipping = calcShipping(subtotal, String(cep));
  let discount = calcDiscount(subtotal, String(coupon));

  if ((coupon || '').trim().toUpperCase() === 'FRETEGRATIS') shipping = 0;

  const total = finalizeTotals(subtotal, shipping, discount);

  res.json({ items, subtotal, shipping, discount, total });
});

export default router;
