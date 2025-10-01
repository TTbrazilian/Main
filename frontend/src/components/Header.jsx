import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,112,243,0.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <FaArrowLeft style={{ marginRight: 5 }} />
        </button>

        <Link to="/" style={styles.brand}>
          NexusCart
        </Link>
      </div>
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
  left: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
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
  backButton: {
    display: "flex",
    alignItems: "center",
    padding: ".5rem .75rem",
    border: "none",      
    background: "transparent", 
    cursor: "pointer",
    color: "#111",
    fontSize: 14,
    borderRadius: 8,
    transition: "all 0.2s ease",
  },
};