import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      form.append("username", username);
      form.append("password", password);

      const res = await axios.post(
        "https://feedback-system-backend-9djn.onrender.com/login",
        form
      );

      if (res.data.role) {
        onLogin(res.data); // Pass user data to parent
      } else {
        setMessage("❌ Invalid credentials");
      }
    } catch {
      setMessage("⚠️ Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>🔐 Feedback Portal Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          style={styles.input}
          placeholder="👤 Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="password"
          placeholder="🔒 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? "⏳ Logging in..." : "🚀 Login"}
        </button>
      </form>

      <div style={styles.linkWrapper}>
        <Link to="/forgot-password" style={styles.forgotLink}>
          ❓ Forgot Password?
        </Link>
        <br />
        <Link to="/signup" style={styles.signupLink}>
          📝 Don't have an account? Sign up
        </Link>
      </div>

      {message && <p style={styles.error}>{message}</p>}
    </div>
  );
}

const styles = {
  card: {
    maxWidth: "400px",
    margin: "80px auto",
    padding: "40px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
    textAlign: "center",
    fontFamily: "Segoe UI, sans-serif",
  },
  title: {
    fontSize: "1.8rem",
    color: "#2c3e50",
    marginBottom: "25px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "18px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
    transition: "border 0.3s ease",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#27ae60",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  error: {
    marginTop: "12px",
    color: "#e74c3c",
    fontWeight: "600",
  },
  linkWrapper: {
    marginTop: "15px",
  },
  forgotLink: {
    color: "#2980b9",
    textDecoration: "none",
    fontSize: "14px",
  },
  signupLink: {
    color: "#34495e",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "bold",
    marginTop: "8px",
    display: "inline-block",
  },
};

export default LoginPage;
