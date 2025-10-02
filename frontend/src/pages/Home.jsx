import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section style={{ paddingTop: 24, paddingBottom: 24 }}>
      <div
        className="card"
        style={{
          padding: 32,
          overflow: "hidden",
          background:
            "linear-gradient(135deg, var(--surface) 0%, rgba(34,197,94,.08) 100%)",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ marginBottom: 8 }}>Bem-vindo à NexusCart</h1>
          <p className="muted" style={{ margin: 0 }}>
            Produtos exclusivos com a melhor qualidade.
          </p>

          <div style={{ marginTop: 16, display: "flex", gap: 10, justifyContent: "center" }}>
            <Link to="/products" className="btn btn-primary">
              Ver produtos
            </Link>
            <Link to="/login" className="btn btn-outline">
              Entrar
            </Link>
          </div>
        </div>
      </div>

      <div
        className="grid"
        style={{ marginTop: 20 }}
      >
        <article className="card" style={{ padding: 16 }}>
          <h2>Seleção Premium</h2>
          <p className="muted">Curadoria com foco em design e qualidade.</p>
        </article>

        <article className="card" style={{ padding: 16 }}>
          <h2>Entrega Ágil</h2>
          <p className="muted">Envios rastreados e prazos transparentes.</p>
        </article>

        <article className="card" style={{ padding: 16 }}>
          <h2>Suporte Humano</h2>
          <p className="muted">Atendimento eficiente.</p>
        </article>
      </div>


      <div className="card" style={{ padding: 24, marginTop: 20, textAlign: "center" }}>
        <h2 style={{ marginBottom: 8 }}>Comece sua jornada</h2>
        <p className="muted" style={{ marginTop: 0 }}>
          Descubra ofertas e novidades atualizadas.
        </p>
      </div>
    </section>
  );
}
