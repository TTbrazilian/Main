import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header style={styles.header}>
      <Link to="/" style={styles.brand}>
        NexusCart
      </Link>
      <nav style={styles.nav}>
        <NavLink to="/login" style={styles.link}>
          Entrar
        </NavLink>
        <NavLink to="/register" style={styles.linkPrimary}>
          Criar conta
        </NavLink>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 1rem",
    borderBottom: "1px solid #eee",
    position: "sticky",
    top: 0,
    background: "#fff",
    zIndex: 10,
  },
  brand: {
    fontWeight: 700,
    textDecoration: "none",
    color: "#111",
    fontSize: 20,
  },
  nav: { display: "flex", gap: ".75rem" },
  link: {
    textDecoration: "none",
    border: "1px solid #ddd",
    padding: ".5rem .75rem",
    borderRadius: 8,
    color: "#111",
  },
  linkPrimary: {
    textDecoration: "none",
    border: "1px solid #0d6efd",
    background: "#0d6efd",
    color: "#fff",
    padding: ".5rem .75rem",
    borderRadius: 8,
  },
};
