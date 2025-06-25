import React, { useState } from "react";
import axios from "axios";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("username", username);
      form.append("password", password);

      const res = await axios.post("https://feedback-system-backend-9djn.onrender.com/login", form);
      if (res.data.role) {
        onLogin(res.data);
      } else {
        setMessage("Invalid credentials");
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          style={styles.input}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button style={styles.button} type="submit">Login</button>
      </form>
      {message && <p style={styles.error}>{message}</p>}
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
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default LoginPage;
