import express from 'express';
import Product from '../models/Product.js';
app.use('/api/products', productRoutes);


const router = express.Router();

/**
 * POST /api/products
 * body: { name, description, price, stock, categories:[], images:[] }
 */
router.post('/', async (req, res) => {
  try {
    const created = await Product.create(req.body);
    return res.status(201).json(created);
  } catch (err) {
    return res.status(400).json({ message: 'Erro ao criar produto', error: err.message });
  }
});

/**
 * GET /api/products
 * query: page, limit, q, category, minPrice, maxPrice
 */
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 12, q, category, minPrice, maxPrice } = req.query;

    const query = { isActive: true };
    if (q) query.$text = { $search: q };
    if (category) query.categories = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const p = Math.max(parseInt(page), 1);
    const l = Math.min(parseInt(limit), 50);
    const skip = (p - 1) * l;

    const [items, total] = await Promise.all([
      Product.find(query).skip(skip).limit(l).sort({ createdAt: -1 }),
      Product.countDocuments(query)
    ]);

    return res.json({ items, page: p, total, pages: Math.ceil(total / l) });
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao listar', error: err.message });
  }
});

export default router;
