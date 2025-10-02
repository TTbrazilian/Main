import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';           // seu axios com baseURL
import { useAuth } from '../context/AuthProvider';

export default function Login() {
  const { setAuth } = useAuth();                 // <-- AQUI você pega o setAuth
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setErr('');
    try {
      // seu backend dia 1: POST /api/users/login -> { token }
      const { data } = await api.post('/api/users/login', { email, password });

      // >>> ESTE É O PONTO CERTO <<<
      // como o backend não envia "user", salve só o token por enquanto
      setAuth({ token: data.token, user: null });

      // redireciona para a home (ou para onde preferir)
      navigate('/');
    } catch (e) {
      setErr(e.response?.data?.message || 'Falha no login');
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 360, margin: '48px auto' }}>
      <h2>Entrar</h2>
      {err && <p style={{ color: 'red' }}>{err}</p>}
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
