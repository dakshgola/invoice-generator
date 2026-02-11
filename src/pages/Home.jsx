import React from "react";
import { Button, Card } from "antd";
import { Plus } from "lucide-react";

const Home = ({ onCreate }) => {
  return (
    <div style={styles.wrapper}>
      {/* Logo */}
      <div style={styles.navbar}>
        <h2 style={styles.logo}>InvoiceGen</h2>
      </div>

      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.title}>
          Simple. Fast. Professional Invoices.
        </h1>

        <p style={styles.subtitle}>
          A clean and minimal invoice generator built with React & Ant Design.
          Create, calculate, and print invoices instantly.
        </p>

        <Button
          type="primary"
          size="large"
          icon={<Plus size={18} />}
          onClick={onCreate}
          style={styles.heroButton}
        >
          Start Creating
        </Button>
      </div>

      {/* Features */}
      <div style={styles.features}>
        <Card style={styles.card}>
          <h3>⚡ Instant Calculations</h3>
          <p>
            Automatic subtotal, GST, and grand total calculations in real-time.
          </p>
        </Card>

        <Card style={styles.card}>
          <h3>🖨 Print Ready</h3>
          <p>
            Generate professional invoice previews and print them instantly.
          </p>
        </Card>

      </div>

      {/* Footer */}
      <div style={styles.footer}>
        Designed for simplicity

      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "#f9fafb",
    padding: "60px 80px",
  },

  navbar: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "60px",
  },

  logo: {
    fontSize: "22px",
    fontWeight: "600",
  },

  hero: {
    textAlign: "center",
    maxWidth: "700px",
    margin: "0 auto 80px",
  },

  title: {
    fontSize: "42px",
    fontWeight: "700",
    marginBottom: "20px",
  },

  subtitle: {
    fontSize: "18px",
    color: "#6b7280",
    marginBottom: "30px",
  },

  heroButton: {
    height: "50px",
    padding: "0 30px",
    fontSize: "16px",
    borderRadius: "8px",
  },

  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
    marginBottom: "80px",
  },

  card: {
    borderRadius: "14px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
    border: "1px solid #f0f0f0",
  },

  footer: {
    textAlign: "center",
    color: "#9ca3af",
    fontSize: "14px",
  },
};

export default Home;
