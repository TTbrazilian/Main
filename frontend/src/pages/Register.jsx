import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthProvider';

export default function Register() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [ok, setOk] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setErr('');
    setOk('');
    if (!name || !email || !password) {
      setErr('Preencha nome, email e senha.');
      return;
    }
    try {
      setLoading(true);
      await api.post('/api/users/register', { name, email, password });
      const { data } = await api.post('/api/users/login', { email, password });
      setAuth({ token: data.token, user: null });
      setOk('Cadastro realizado! Redirecionando…');
      navigate('/');
    } catch (e) {
      setErr(e.response?.data?.message || 'Erro ao cadastrar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ padding: 16, maxWidth: 420, margin:'24px auto' }}>
      <h2>Criar conta</h2>

      {err && <p style={{ color:'var(--danger)' }}>{err}</p>}
      {ok && <p style={{ color:'var(--primary)' }}>{ok}</p>}

      <label style={{ marginTop: 8 }}>Nome</label>
      <input className="input" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Seu nome" />

      <label style={{ marginTop: 8 }}>Email</label>
      <input className="input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="voce@exemplo.com" />

      <label style={{ marginTop: 8 }}>Senha</label>
      <div style={{ display:'flex', gap:8 }}>
        <input
          className="input"
          type={showPwd ? 'text' : 'password'}
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          placeholder="••••••••"
          style={{ flex:1 }}
        />
        <button type="button" className="btn btn-outline" onClick={()=>setShowPwd(s=>!s)} style={{ minWidth:90 }}>
          {showPwd ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>

      <button className="btn btn-primary" type="submit" disabled={loading} style={{ marginTop: 12 }}>
        {loading ? 'Enviando…' : 'Cadastrar'}
      </button>

      <p className="muted" style={{ marginTop: 12 }}>
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </form>
  );
}
