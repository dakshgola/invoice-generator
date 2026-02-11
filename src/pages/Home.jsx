// src/pages/Home.jsx
import React from "react";
import { Button, Card } from "antd";
import { Plus } from "lucide-react";

const Home = ({ onCreate }) => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h1 style={styles.title}>Invoice Generator</h1>
        <Button
          type="primary"
          size="large"
          icon={<Plus size={18} />}
          onClick={onCreate}
        >
          Create Invoice
        </Button>
      </div>

      <div style={styles.cards}>
        <Card style={styles.card}>
          <h3>Total Revenue</h3>
          <p style={styles.value}>₹ 0</p>
        </Card>

        <Card style={styles.card}>
          <h3>Total Invoices</h3>
          <p style={styles.value}>0</p>
        </Card>

        <Card style={styles.card}>
          <h3>Pending Payments</h3>
          <p style={styles.value}>₹ 0</p>
        </Card>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "#f9fafb",
    padding: "60px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  value: {
    fontSize: "24px",
    fontWeight: "600",
    marginTop: "10px",
  },
};

export default Home;
