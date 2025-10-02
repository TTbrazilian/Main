import express from 'express';
import Product from '../models/Product.js';


const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const created = await Product.create(req.body);
    return res.status(201).json(created);
  } catch (err) {
    return res.status(400).json({ message: 'Erro ao criar produto', error: err.message });
  }
});


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

router.put('/:id', async (req, res) => {
  try {
    const allowed = ['name','description','price','stock','categories','images','isActive'];
    const data = {};
    for (const k of allowed) if (k in req.body) data[k] = req.body[k];

    if (data.price != null && Number(data.price) < 0) {
      return res.status(400).json({ message: 'Preço inválido' });
    }
    if (data.stock != null && Number(data.stock) < 0) {
      return res.status(400).json({ message: 'Estoque inválido' });
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Produto não encontrado' });
    return res.json(updated);
  } catch (err) {
    return res.status(400).json({ message: 'Erro ao atualizar', error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Produto não encontrado' });
    return res.status(200).json({ message: 'Produto desativado', product: updated });
  } catch (err) {
    return res.status(400).json({ message: 'Erro ao desativar', error: err.message });
  }
});

router.patch('/:id/restore', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: true },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Produto não encontrado' });
    return res.json(updated);
  } catch (err) {
    return res.status(400).json({ message: 'Erro ao reativar', error: err.message });
  }
});

router.patch('/:id/stock', async (req, res) => {
  try {
    const { delta } = req.body;
    if (typeof delta !== 'number' || !Number.isFinite(delta)) {
      return res.status(400).json({ message: 'delta numérico é obrigatório' });
    }

    const prod = await Product.findById(req.params.id);
    if (!prod) return res.status(404).json({ message: 'Produto não encontrado' });

    const newStock = (prod.stock ?? 0) + delta;
    if (newStock < 0) return res.status(400).json({ message: 'Estoque não pode ficar negativo' });

    prod.stock = newStock;
    await prod.save();
    return res.json(prod);
  } catch (err) {
    return res.status(400).json({ message: 'Erro ao ajustar estoque', error: err.message });
  }
});


export default router;
