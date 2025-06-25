import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setMessage("❌ Invalid or missing reset token.");
    }
  }, [token]);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const form = new FormData();
      form.append("username", username);
      form.append("new_password", newPassword);

      const res = await axios.put(
        "https://feedback-system-backend-9djn.onrender.com/reset-password",
        form
      );

      setMessage("✅ " + res.data.message);
      setIsSuccess(true);
    } catch {
      setMessage("❌ Reset failed or token expired");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>🔐 Reset Password</h2>
      <form onSubmit={handleReset}>
        <input
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset"}
        </button>
      </form>
      {message && (
        <p style={{ ...styles.message, color: isSuccess ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
}

const styles = {
  card: {
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
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },
  message: {
    marginTop: "15px",
    fontWeight: "bold",
  },
};

export default ResetPassword;
