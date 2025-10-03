import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Não autorizado, token não fornecido' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

const admin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user).select('isAdmin');
    if (!user?.isAdmin) return res.status(403).json({ message: 'Acesso restrito: admin' });
    next();
  } catch (e) {
    res.status(500).json({ message: 'Erro de autorização' });
  }
};

export { protect, admin };
