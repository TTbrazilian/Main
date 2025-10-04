import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { api } from '../services/api';

export default function CartBadge() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false); 
  const loc = useLocation();

  async function load() {
    const token = localStorage.getItem('token');
    if (!token) { setVisible(false); setCount(0); return; }
    setVisible(true);
    try {
      const { data } = await api.get('/api/cart/summary');
      setCount(Number(data?.count ?? 0));
    } catch {
      setCount(0);
    }
  }

  useEffect(() => { load(); }, [loc.pathname]);

  if (!visible) return null;

  return (
    <Link to="/cart" className="btn btn-outline" title="Carrinho" style={{ position:'relative' }}>
      Carrinho
      {count > 0 && (
        <span
          aria-label={`Itens no carrinho: ${count}`}
          style={{
            position:'absolute', top:-6, right:-6,
            background:'var(--primary)', color:'#fff',
            borderRadius:999, fontSize:12, fontWeight:800,
            padding:'2px 6px', lineHeight:1
          }}
        >
          {count}
        </span>
      )}
    </Link>
  );
}
