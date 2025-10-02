import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function ProductList() {
  const [sp, setSp] = useSearchParams();
  const page = Number(sp.get('page') || 1);
  const q = sp.get('q') || '';
  const sort = sp.get('sort') || '-createdAt';

  const [data, setData] = useState({ items: [], page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  const [qInput, setQInput] = useState(q);

  async function load() {
    try {
      setLoading(true);
      setErr('');
      const params = new URLSearchParams({
        page: String(page),
        limit: '12',
        ...(q ? { q } : {}),
        ...(sort ? { sort } : {}),
      }).toString();
      const { data } = await api.get(`/api/products?${params}`);
      setData(data);
    } catch (e) {
      setErr(e.response?.data?.message || 'Falha ao carregar produtos');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [page, sort, q]);

  function onSearch(e) {
    e.preventDefault();
    setSp(prev => {
      if (qInput) prev.set('q', qInput); else prev.delete('q');
      prev.set('page', '1');
      return prev;
    });
  }
  function changeSort(e) {
    const v = e.target.value;
    setSp(prev => { prev.set('sort', v); prev.set('page', '1'); return prev; });
  }

  const pages = useMemo(() => Array.from({ length: data.pages || 1 }, (_, i) => i + 1), [data.pages]);

  return (
    <div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:12, margin:'8px 0 16px' }}>
        <form onSubmit={onSearch} style={{ display:'flex', gap:8 }}>
          <input
            className="input"
            value={qInput}
            onChange={(e) => setQInput(e.target.value)}
            placeholder="Buscar por nome ou descrição…"
          />
          <button className="btn btn-primary">Buscar</button>
        </form>

        <div>
          <select className="input" value={sort} onChange={changeSort} title="Ordenar" style={{ minWidth:180 }}>
            <option value="-createdAt">Mais recentes</option>
            <option value="createdAt">Mais antigos</option>
            <option value="price">Menor preço</option>
            <option value="-price">Maior preço</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="card" style={{ height: 300, background:'linear-gradient(90deg,#f3f5f7 0%,#eef2f5 50%,#f3f5f7 100%)' }} />
          ))}
        </div>
      ) : err ? (
        <p style={{ color:'var(--danger)' }}>{err}</p>
      ) : !data.items?.length ? (
        <div className="card" style={{ padding: 32, textAlign:'center', color:'var(--muted)' }}>
          <p>Nenhum produto encontrado.</p>
          {q && (
            <p style={{ marginTop: 8 }}>
              <Link to="/products" className="btn btn-outline">Limpar filtros</Link>
            </p>
          )}
        </div>
      ) : (
        <>
          <div className="grid">
            {data.items.map((p) => <ProductCard key={p._id} p={p} />)}
          </div>

          {pages.length > 1 && (
            <nav style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent:'center' }}>
              {pages.map(n => (
                <Link
                  key={n}
                  to={`/products?${new URLSearchParams({ q, sort, page: String(n) }).toString()}`}
                  className="btn"
                  style={{
                    background: n === page ? 'linear-gradient(135deg, var(--primary), var(--accent))' : 'var(--surface)',
                    color: n === page ? '#fff' : 'var(--text)',
                    border: n === page ? 'none' : '1px solid var(--border)'
                  }}
                >
                  {n}
                </Link>
              ))}
            </nav>
          )}
        </>
      )}
    </div>
  );
}
