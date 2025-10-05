import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <button
      type="button"
      className="btn btn-ghost"
      onClick={() => setDark(v => !v)}
      title={dark ? 'Tema claro' : 'Tema escuro'}
      style={{ padding: '6px 10px', fontWeight: 700 }}
    >
      {dark ? '☀️' : '🌙'}
    </button>
  );
}
