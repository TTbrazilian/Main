import { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';

export default function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  async function load() {
    try {
      setLoading(true);
      const { data } = await api.get('/api/cart');
      setItems(data || []);
    } catch (e) {
      setErr(e.response?.data?.message || 'Falha ao carregar carrinho');
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(productId) {
    try {
      await api.delete(`/api/cart/${productId}`);
      setItems(prev => prev.filter(i => (i.product?._id || i.product) !== productId));
    } catch (e) {
      alert(e.response?.data?.message || 'Erro ao remover item');
    }
  }

  async function updateQty(productId, qty) {
    try {
      const { data } = await api.patch(`/api/cart/${productId}`, { qty });
      setItems(data);
    } catch (e) {
      alert(e.response?.data?.message || 'Erro ao atualizar quantidade');
    }
  }

  const total = useMemo(() => {
    return (items || []).reduce((acc, i) => {
      const p = i.product?.price ?? 0;
      return acc + p * i.qty;
    }, 0);
  }, [items]);

  useEffect(() => { load(); }, []);

  if (loading) return <main style={{ padding: 24 }}><p>Carregando...</p></main>;
  if (err) return <main style={{ padding: 24 }}><p style={{color:'red'}}>{err}</p></main>;

  return (
    <main style={{ padding: 24, maxWidth: 960, margin: '0 auto' }}>
      <h1>Meu Carrinho</h1>
      {!items.length && <p>Seu carrinho está vazio.</p>}

      {items.map(i => {
        const id = i.product?._id || i.product;
        const name = i.product?.name || 'Produto';
        const price = i.product?.price ?? 0;
        const img = i.product?.images?.[0] || 'https://via.placeholder.com/120x80';
        return (
          <div key={id} style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: 12, alignItems: 'center', padding: 12, borderBottom: '1px solid #eee' }}>
            <img src={img} alt={name} style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 8 }} />
            <div>
              <div style={{ fontWeight: 600 }}>{name}</div>
              <div>R$ {price.toFixed(2)}</div>
              <div style={{ marginTop: 8 }}>
                Qtd:&nbsp;
                <input
                  type="number"
                  min={1}
                  value={i.qty}
                  onChange={e => updateQty(id, Number(e.target.value))}
                  style={{ width: 64 }}
                />
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <button onClick={() => removeItem(id)}>Remover</button>
            </div>
          </div>
        );
      })}

      {!!items.length && (
        <section style={{ marginTop: 16, textAlign: 'right' }}>
          <h3>Total: R$ {total.toFixed(2)}</h3>
          <a href="/checkout">
            <button>Finalizar compra</button>
          </a>
        </section>
      )}
    </main>
  );
}
