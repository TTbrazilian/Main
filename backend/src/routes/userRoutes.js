import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', protect, async (req, res) => {
  const user = await User.findById(req.user).select('-password');
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
  res.json(user);
});

router.get('/me/addresses', protect, async (req, res) => {
  const user = await User.findById(req.user).select('addresses');
  res.json(user?.addresses || []);
});

router.post('/me/addresses', protect, async (req, res) => {
  const user = await User.findById(req.user);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

  const addr = req.body; 
  user.addresses.push(addr);
  await user.save();
  res.status(201).json(user.addresses[user.addresses.length - 1]);
});

router.put('/me/addresses/:addrId', protect, async (req, res) => {
  const user = await User.findById(req.user);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

  const a = user.addresses.id(req.params.addrId);
  if (!a) return res.status(404).json({ message: 'Endereço não encontrado' });

  Object.assign(a, req.body);
  await user.save();
  res.json(a);
});

router.delete('/me/addresses/:addrId', protect, async (req, res) => {
  const user = await User.findById(req.user);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

  const a = user.addresses.id(req.params.addrId);
  if (!a) return res.status(404).json({ message: 'Endereço não encontrado' });

  a.deleteOne();
  await user.save();
  res.status(204).end();
});

export default router;
