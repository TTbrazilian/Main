import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
      }}
    >
      <div style={styles.thumb} />
      <div style={styles.body}>
        <h3 style={styles.title}>{product.title}</h3>
        <p style={styles.price}>
          {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(product.price)}
        </p>
        <p style={styles.description}>{product.description}</p>
        <Link
          to={`/products/${product._id}`}
          style={styles.button}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#0056b3")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#0d6efd")}
        >
          Ver detalhes
        </Link>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #eee",
    borderRadius: 12,
    overflow: "hidden",
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.2s ease-in-out",
  },
  thumb: {
    height: 140,
    background:
      "linear-gradient(135deg, rgba(13,110,253,0.2), rgba(102,16,242,0.2))",
  },
  body: { padding: "0.75rem 1rem", display: "grid", gap: "0.5rem" },
  title: { fontSize: 16, margin: 0 },
  price: { fontWeight: 700, margin: 0 },
  button: {
    marginTop: "0.25rem",
    textDecoration: "none",
    border: "1px solid #0d6efd",
    background: "#0d6efd",
    color: "#fff",
    padding: ".5rem .75rem",
    borderRadius: 8,
    textAlign: "center",
    transition: "background 0.2s",
  },
};
