import { Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";

export default function Register() {
  return (
    <section className="page-center">
      <div style={{ width: "100%", maxWidth: 480 }}>
        <AuthForm
          title="Criar conta"
          submitLabel="Cadastrar"
          mode="register"
          onSubmit={(data) => {
            console.log("Register submit (UI only):", data);
          }}
        />
        <p style={{ textAlign: "center", marginTop: ".5rem" }}>
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </section>
  );
}
