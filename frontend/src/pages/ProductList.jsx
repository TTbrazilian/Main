import ProductCard from "../components/ProductCard";

const MOCK = [
  { _id: "p1", title: "Camiseta", price: 79.9 },
  { _id: "p2", title: "Caneca", price: 39.9 },
  { _id: "p3", title: "Mochila", price: 199.9 },
  { _id: "p4", title: "Adesivos", price: 19.9 },
];

export default function ProductList() {
  return (
    <section style={styles.wrap}>
      <h2 style={styles.title}>Produtos</h2>
      <div style={styles.grid}>
        {MOCK.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </section>
  );
}

const styles = {
  wrap: { maxWidth: 1100, margin: "0 auto", padding: "1rem" },
  title: { margin: "0 0 1rem 0" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "1rem",
  },
};
