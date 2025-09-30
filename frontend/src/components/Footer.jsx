export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={{ margin: 0 }}>© {new Date().getFullYear()} NexusCart</p>
    </footer>
  );
}

const styles = {
  footer: {
    borderTop: "1px solid #eee",
    padding: "1rem",
    textAlign: "center",
    background: "#fff",
  },
};
