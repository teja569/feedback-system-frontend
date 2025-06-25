import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const form = new FormData();
      form.append("username", username);

      const res = await axios.post(
        "https://feedback-system-backend-9djn.onrender.com/forgot-password",
        form
      );
      setMessage("✅ " + res.data.message + " (Check console for link)");
    } catch (err) {
      setMessage("❌ User not found or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🔑 Forgot Password</h2>
      <form onSubmit={handleRequest}>
        <input
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? "Sending..." : "Get Reset Link"}
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "60px auto",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    fontFamily: "Segoe UI, sans-serif",
  },
  title: {
    marginBottom: "20px",
    fontSize: "1.5rem",
    color: "#2c3e50",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  message: {
    marginTop: "15px",
    color: "#333",
    fontWeight: "bold",
  },
};

export default ForgotPassword;
