import React from "react";
import ProductCard from "../components/ProductCard";

const productsMock = [
  {
    id: 1,
    title: 'Camiseta ',
    description: 'Camiseta confortável para uso diário',
    price: 49.99,
    image: ''
  },
  {
    id: 2,
    title: 'Tênis ',
    description: 'Tênis confortável para o dia a dia',
    price: 149.99,
    image: ''
  },
  {
    id: 3,
    title: 'Mochila NexusCart',
    description: 'Mochila resistente e estilosa',
    price: 89.99,
    image: ''
  },
  {
    id: 4,
    title: 'Boné ',
    description: 'Boné casual para uso diário',
    price: 39.99,
    image: ''
  }
];

const ProductList = () => {
  return (
    <div style={styles.container}>
      {productsMock.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};
const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    padding: "30px",
    justifyItems: "center",
    backgroundColor: "#f8f9fa",
  },
};

export default ProductList;