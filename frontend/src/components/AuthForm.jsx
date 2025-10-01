import { useState } from "react";

export default function AuthForm({
  title = "Entrar",
  submitLabel = "Continuar",
  mode = "login",
  onSubmit = () => {},
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{title}</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        {mode === "register" && (
          <div style={styles.field}>
            <label style={styles.label}>Nome</label>
            <input
              name="name"
              type="text"
              placeholder="Seu nome"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
        )}

        <div style={styles.field}>
          <label style={styles.label}>E-mail</label>
          <input
            name="email"
            type="email"
            placeholder="voce@email.com"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Senha</label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
            required
            minLength={6}
          />
        </div>

        <button type="submit" style={styles.button}>
          {submitLabel}
        </button>

        <p style={styles.helper}>
          {mode === "login"}
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 420,
    margin: "2rem auto",
    padding: "1.25rem",
    border: "1px solid #eee",
    borderRadius: 12,
    background: "#fff",
  },
  title: { fontSize: 24, marginBottom: "1rem" },
  form: { display: "flex", flexDirection: "column", gap: ".75rem" },
  field: { display: "flex", flexDirection: "column", gap: ".5rem" },
  label: { fontSize: 14, color: "#555" },
  input: {
    padding: ".65rem .75rem",
    borderRadius: 8,
    border: "1px solid #ddd",
    fontSize: 14,
  },
  button: {
    marginTop: ".5rem",
    padding: ".65rem .75rem",
    borderRadius: 8,
    border: "1px solid #0d6efd",
    background: "#0d6efd",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600,
  },
  helper: { fontSize: 12, color: "#666", marginTop: ".5rem" },
};
