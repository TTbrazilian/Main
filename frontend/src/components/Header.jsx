import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; 

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const showBack = location.pathname !== '/';

  return (
    <header className="site-header">
      <div className="container nav" style={{ gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {showBack && (
            <button
              type="button"
              className="btn btn-ghost"
              aria-label="Voltar"
              onClick={() => navigate(-1)}
              title="Voltar"
              style={{ padding: 8 }}
            >
              <FaArrowLeft />
            </button>
          )}
          <Link to="/" style={{ fontWeight: 800, fontSize: 18 }}>NexusCart</Link>
        </div>

        <nav style={{ display:'flex', gap:12, alignItems:'center' }}>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/products">Produtos</NavLink>
          <NavLink to="/login">Entrar</NavLink>
          <NavLink to="/register" className="btn btn-primary btn-cta">Criar conta</NavLink>
          {/* ↑ usamos uma classe extra `btn-cta` para forçar cor do texto no hover */}
        </nav>
      </div>
    </header>
  );
}
