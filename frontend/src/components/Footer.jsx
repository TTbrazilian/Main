export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container" style={{ padding: 16, color: 'var(--muted)' }}>
        © {new Date().getFullYear()} NexusCart — Todos os direitos reservados
      </div>
    </footer>
  );
}
