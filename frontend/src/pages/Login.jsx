import { Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";

export default function Login() {
  return (
    <section className="page-center">
      <div style={{ width: "100%", maxWidth: 480 }}>
        <AuthForm
          title="Entrar"
          submitLabel="Entrar"
          mode="login"
          onSubmit={(data) => {
            console.log("Login submit (UI only):", data);
          }}
        />
        <p style={{ textAlign: "center", marginTop: ".5rem" }}>
          Não tem conta? <Link to="/register">Crie agora</Link>
        </p>
      </div>
    </section>
  );
}
