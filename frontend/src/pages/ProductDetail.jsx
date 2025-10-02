import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [p, setP] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/api/products/${id}`);
        setP(data);
      } catch (e) {
        setErr(e.response?.data?.message || 'Produto não encontrado');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  async function addToCart() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login', { state: { from: `/products/${id}` } });
        return;
      }
      await api.post('/api/cart', { productId: id, qty: Number(qty) });
      alert('Adicionado ao carrinho!');
    } catch (e) {
      alert(e.response?.data?.message || 'Erro ao adicionar ao carrinho');
    }
  }

  if (loading) return <div className="card" style={{ padding: 24 }}>Carregando…</div>;
  if (err) return <div className="card" style={{ padding: 24, color: 'var(--danger)' }}>{err}</div>;
  if (!p) return null;

  const img = p.images?.[0] || 'https://via.placeholder.com/800x600?text=Produto';

  return (
    <div className="card" style={{ padding: 16 }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 24 }}>
        <img
          src={img}
          alt={p.name}
          style={{ width: '100%', aspectRatio:'4/3', objectFit: 'cover', borderRadius: 10 }}
        />
        <section>
          <h1>{p.name}</h1>
          <p className="muted" style={{ margin:'6px 0 10px' }}>{p.description || 'Sem descrição'}</p>
          <p style={{ fontSize: 24, fontWeight: 800, color:'var(--primary)' }}>
            R$ {Number(p.price ?? 0).toFixed(2)}
          </p>

          <div style={{ display:'flex', gap: 10, alignItems:'center', marginTop: 12 }}>
            <label className="muted">Qtd</label>
            <input
              className="input"
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
              style={{ width: 100 }}
            />
            <button
              className="btn btn-primary"
              onClick={addToCart}
              disabled={!p.isActive || (p.stock ?? 0) <= 0}
            >
              {(!p.isActive || (p.stock ?? 0) <= 0) ? 'Indisponível' : 'Adicionar ao carrinho'}
            </button>
          </div>

          <p className="muted" style={{ marginTop: 8 }}>
            {p.stock > 0 ? `Estoque: ${p.stock}` : 'Sem estoque'}
          </p>
        </section>
      </div>
    </div>
  );
}
