import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("username", username);
      form.append("new_password", newPassword);

      const res = await axios.put("https://feedback-system-backend-9djn.onrender.com/reset-password", form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Failed to reset password");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🔐 Forgot Password</h2>
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
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button style={styles.button} type="submit">
          Reset Password
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
  },
  title: {
    marginBottom: "20px",
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
