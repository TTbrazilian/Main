import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page-center">
      <div style={{ maxWidth: 720, textAlign: "center" }}>
        <h1 style={{ marginBottom: ".5rem" }}>Bem-vindo à NexusCart</h1>
        <p style={{ color: "#555" }}>
          Produtos Exclusivos de Alta Qualidade.
        </p>
        <div style={{ marginTop: "1rem" }}>
          <Link to="/products" style={styles.cta}>
            Ver produtos
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  cta: {
    textDecoration: "none",
    border: "1px solid #0d6efd",
    background: "#0d6efd",
    color: "#fff",
    padding: ".65rem 1rem",
    borderRadius: 10,
    fontWeight: 600,
  },
};
