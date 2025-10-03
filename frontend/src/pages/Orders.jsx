import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  async function load() {
    try {
      setLoading(true);
      const { data } = await api.get('/api/orders'); // retorna lista do usuário logado
      setOrders(data?.items || data || []); // suporta ambos formatos
    } catch (e) {
      setErr(e.response?.data?.message || 'Falha ao carregar pedidos');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  if (loading) return <div className="card" style={{ padding: 16 }}>Carregando…</div>;
  if (err) return <div className="card" style={{ padding: 16, color: 'var(--danger)' }}>{err}</div>;

  return (
    <div className="card" style={{ padding: 16 }}>
      <h2>Meus pedidos</h2>
      {!orders.length ? (
        <p className="muted">Você ainda não tem pedidos.</p>
      ) : (
        <div style={{ display:'grid', gap:12, marginTop: 12 }}>
          {orders.map((o) => (
            <article key={o._id} className="card" style={{ padding: 12 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:12, flexWrap:'wrap' }}>
                <div>
                  <div style={{ fontWeight:700 }}>Pedido #{o._id?.slice(-6)}</div>
                  <div className="muted">
                    {o.items?.length || 0} itens — Total: <strong>R$ {Number(o.total ?? 0).toFixed(2)}</strong>
                  </div>
                </div>
                <div className="badge" style={{ background:'rgba(34,197,94,.12)' }}>
                  {o.status || 'PLACED'}
                </div>
              </div>
              {o.items?.length ? (
                <div style={{ display:'grid', gap:8, marginTop:10 }}>
                  {o.items.map((it, idx) => (
                    <div key={idx} style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:8 }}>
                      <div className="muted">
                        {it.product?.name || 'Produto'} — qtd {it.qty}
                      </div>
                      <div style={{ fontWeight:700 }}>
                        R$ {Number((it.price ?? it.product?.price ?? 0) * it.qty).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
