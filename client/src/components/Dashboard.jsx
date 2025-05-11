import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/auth");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🚗 Dashboard Access Granted</h2>
      <p style={styles.subText}>Manage your rentals, bookings, and profile here.</p>
      <button onClick={handleLogout} style={styles.button}>Logout</button>
    </div>
  );
};

// Fully restyled design
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to bottom right, #0f172a, #1e293b)",
    color: "#e0f2fe",
    textAlign: "center",
    padding: "0 20px",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#38bdf8",
    marginBottom: "10px",
  },
  subText: {
    fontSize: "1rem",
    color: "#94a3b8",
    marginBottom: "30px",
  },
  button: {
    padding: "14px 28px",
    backgroundColor: "#ef4444",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
    transition: "background 0.3s, transform 0.2s",
  },
};

export default Dashboard;
