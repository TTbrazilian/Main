// Dia 1: placeholder de detalhes; Dia 3 buscará GET /api/products/:id
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();

  const handleAddToCart = () => {
    // Dia 1: sem integração. Apenas placeholder.
    console.log("Add to cart (UI only):", id);
    alert("Dia 1: botão de adicionar ao carrinho (sem API ainda).");
  };

  return (
    <section style={styles.wrap}>
      <div style={styles.layout}>
        <div style={styles.thumb} />
        <div style={styles.info}>
          <h2>Produto #{id}</h2>
          <p style={{ color: "#555" }}>
            Descrição do produto. (Substituir com dados reais no Dia 3.)
          </p>
          <button onClick={handleAddToCart} style={styles.button}>
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </section>
  );
}

const styles = {
  wrap: { maxWidth: 1100, margin: "0 auto", padding: "1rem" },
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.5rem",
  },
  thumb: {
    height: 320,
    background:
      "linear-gradient(135deg, rgba(13,110,253,0.2), rgba(102,16,242,0.2))",
    borderRadius: 12,
  },
  info: { display: "grid", alignContent: "start", gap: "0.75rem" },
  button: {
    textDecoration: "none",
    border: "1px solid #0d6efd",
    background: "#0d6efd",
    color: "#fff",
    padding: ".65rem 1rem",
    borderRadius: 10,
    fontWeight: 600,
    width: "fit-content",
  },
};
