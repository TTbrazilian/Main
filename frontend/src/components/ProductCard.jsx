import { Link } from 'react-router-dom';

export default function ProductCard({ p }) {
  const img = p.images?.[0] || 'https://via.placeholder.com/600x400?text=Produto';
  return (
    <article className="card" style={{ overflow:'hidden', display:'flex', flexDirection:'column' }}>
      <img src={img} alt={p.name} style={{ width:'100%', aspectRatio:'4/3', objectFit:'cover' }} />
      <div style={{ padding: 12, display:'flex', flexDirection:'column', gap: 8 }}>
        <span className="badge">Novo</span>
        <h3 style={{ margin:'4px 0' }}>{p.name}</h3>
        <div style={{ fontWeight:800, color:'var(--primary)' }}>R$ {Number(p.price ?? 0).toFixed(2)}</div>
        <div style={{ display:'flex', gap:8, marginTop:'auto' }}>
          <Link className="btn btn-outline" to={`/products/${p._id}`}>Detalhes</Link>
          <Link className="btn btn-primary" to={`/products/${p._id}`}>Comprar</Link>
        </div>
      </div>
    </article>
  );
}