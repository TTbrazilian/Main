import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";

function Home() {
  return (
    <div className="page-center">
      <div style={{ maxWidth: 600 }}>
        <h1 style={{ marginBottom: ".5rem" }}>Bem-vindo à NexusCart</h1>
        <p>Explore nossos produtos e faça seu cadastro para comprar.</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Header fixo no topo (64px) */}
      <Header />
      {/* Main ocupa a altura toda; as páginas usam .page-center */}
      <main style={{ minHeight: "calc(100vh - 64px)" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Futuro:
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
          */}
        </Routes>
      </main>
    </BrowserRouter>
  );
}
