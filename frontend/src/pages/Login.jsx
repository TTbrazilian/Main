import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthProvider';

export default function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr('');
    try {
      setLoading(true);
      const { data } = await api.post('/api/users/login', { email, password });
      setAuth({ token: data.token, user: null });
      navigate('/');
    } catch (e) {
      setErr(e.response?.data?.message || 'Falha no login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ padding: 16, maxWidth: 420, margin:'24px auto' }}>
      <h2>Entrar</h2>
      {err && <p style={{ color:'var(--danger)' }}>{err}</p>}

      <label style={{ marginTop: 8 }}>Email</label>
      <input className="input" type="email" placeholder="voce@exemplo.com" value={email} onChange={(e)=>setEmail(e.target.value)} />

      <label style={{ marginTop: 8 }}>Senha</label>
      <input className="input" type="password" placeholder="••••••••" value={password} onChange={(e)=>setPassword(e.target.value)} />

      <button className="btn btn-primary" type="submit" disabled={loading} style={{ marginTop: 12 }}>
        {loading ? 'Entrando…' : 'Entrar'}
      </button>

      <p className="muted" style={{ marginTop: 12 }}>
        Não tem conta? <Link to="/register">Criar conta</Link>
      </p>
    </form>
  );
}
