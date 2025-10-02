// frontend/src/pages/Register.jsx
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

      // 1) Registrar
      await api.post('/api/users/register', { name, email, password });

      // 2) Login automático (seu backend retorna { token })
      const { data } = await api.post('/api/users/login', { email, password });

      // 3) Persistir token (user = null porque seu login atual não retorna dados do usuário)
      setAuth({ token: data.token, user: null });

      setOk('Cadastro realizado! Redirecionando...');
      // 4) Ir para Home (ou onde preferir)
      navigate('/');
    } catch (e) {
      const msg = e.response?.data?.message || 'Erro ao cadastrar';
      setErr(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 420, margin: '48px auto', padding: 16 }}>
      <h2 style={{ marginBottom: 16 }}>Criar conta</h2>

      {err && <p style={{ color: 'red', marginBottom: 12 }}>{err}</p>}
      {ok && <p style={{ color: 'green', marginBottom: 12 }}>{ok}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
        <label>
          Nome<br />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
            autoComplete="name"
          />
        </label>

        <label>
          Email<br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@exemplo.com"
            autoComplete="email"
          />
        </label>

        <label>
          Senha<br />
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type={showPwd ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
              style={{ flex: 1 }}
            />
            <button
              type="button"
              onClick={() => setShowPwd((s) => !s)}
              style={{ minWidth: 90 }}
            >
              {showPwd ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Cadastrar'}
        </button>
      </form>

      <p style={{ marginTop: 16 }}>
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </main>
  );
}
