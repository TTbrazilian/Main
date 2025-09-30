import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div style={styles.card}>
      <div style={styles.thumb} />
      <div style={styles.body}>
        <h3 style={styles.title}>{product.title}</h3>
        <p style={styles.price}>
          {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(product.price)}
        </p>
        <Link to={`/products/${product._id}`} style={styles.button}>
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
  },
};
