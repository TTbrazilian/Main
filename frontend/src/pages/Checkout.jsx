import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function Checkout() {
  const navigate = useNavigate();
  const [addr, setAddr] = useState({
    nome: '',
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
  });

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [saving, setSaving] = useState(false);

  // carrega carrinho
  async function loadCart() {
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

  useEffect(() => { loadCart(); }, []);

  const total = useMemo(() => {
    return (items || []).reduce((acc, i) => acc + (i.product?.price ?? 0) * i.qty, 0);
  }, [items]);

  async function placeOrder(e) {
    e.preventDefault();
    if (!items.length) {
      alert('Seu carrinho está vazio.');
      return;
    }
    if (!addr.nome || !addr.cep || !addr.rua || !addr.numero || !addr.cidade || !addr.estado) {
      alert('Preencha os campos obrigatórios do endereço.');
      return;
    }
    try {
      setSaving(true);
      
      const payload = {
        address: addr,
        note: '',
      };
      const { data } = await api.post('/api/orders', payload);
  
      navigate('/account/orders', { state: { placed: data?._id || true } });
    } catch (e) {
      alert(e.response?.data?.message || 'Erro ao finalizar pedido');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="card" style={{ padding: 16 }}>Carregando…</div>;
  if (err) return <div className="card" style={{ padding: 16, color: 'var(--danger)' }}>{err}</div>;

  return (
    <div className="grid" style={{ alignItems: 'start' }}>

      <form onSubmit={placeOrder} className="card" style={{ padding: 16 }}>
        <h2>Endereço de entrega</h2>
        <div style={{ display: 'grid', gap: 10, marginTop: 10 }}>
          <div>
            <label>Nome completo*</label>
            <input className="input" value={addr.nome} onChange={e=>setAddr({...addr, nome:e.target.value})} />
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'160px 1fr', gap:10 }}>
            <div>
              <label>CEP*</label>
              <input className="input" value={addr.cep} onChange={e=>setAddr({...addr, cep:e.target.value})} />
            </div>
            <div>
              <label>Bairro</label>
              <input className="input" value={addr.bairro} onChange={e=>setAddr({...addr, bairro:e.target.value})} />
            </div>
          </div>
          <div>
            <label>Rua*</label>
            <input className="input" value={addr.rua} onChange={e=>setAddr({...addr, rua:e.target.value})} />
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'140px 1fr', gap:10 }}>
            <div>
              <label>Número*</label>
              <input className="input" value={addr.numero} onChange={e=>setAddr({...addr, numero:e.target.value})} />
            </div>
            <div>
              <label>Complemento</label>
              <input className="input" value={addr.complemento} onChange={e=>setAddr({...addr, complemento:e.target.value})} />
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 120px', gap:10 }}>
            <div>
              <label>Cidade*</label>
              <input className="input" value={addr.cidade} onChange={e=>setAddr({...addr, cidade:e.target.value})} />
            </div>
            <div>
              <label>UF*</label>
              <input className="input" value={addr.estado} onChange={e=>setAddr({...addr, estado:e.target.value})} />
            </div>
          </div>

          <button className="btn btn-primary" type="submit" disabled={saving}>
            {saving ? 'Finalizando…' : 'Finalizar pedido'}
          </button>
        </div>
      </form>


      <aside className="card" style={{ padding: 16 }}>
        <h2>Resumo do pedido</h2>
        {!items.length ? (
          <p className="muted">Carrinho vazio.</p>
        ) : (
          <div style={{ display:'grid', gap:10, marginTop:10 }}>
            {items.map(i => {
              const id = i.product?._id || i.product;
              const name = i.product?.name || 'Produto';
              const price = i.product?.price ?? 0;
              const img = i.product?.images?.[0] || 'https://via.placeholder.com/100x80';
              return (
                <div key={id} style={{ display:'grid', gridTemplateColumns:'72px 1fr auto', gap:10, alignItems:'center' }}>
                  <img src={img} alt={name} style={{ width:72, height:54, objectFit:'cover', borderRadius:8 }} />
                  <div>
                    <div style={{ fontWeight:600 }}>{name}</div>
                    <div className="muted">Qtd: {i.qty}</div>
                  </div>
                  <div style={{ fontWeight:700 }}>R$ {Number(price * i.qty).toFixed(2)}</div>
                </div>
              );
            })}
            <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />
            <div style={{ display:'flex', justifyContent:'space-between', fontWeight:800 }}>
              <span>Total</span>
              <span>R$ {Number(total).toFixed(2)}</span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
