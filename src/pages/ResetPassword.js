import React, { useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("token", token);
      form.append("new_password", newPassword);
      const res = await axios.post("https://feedback-system-backend-9djn.onrender.com/reset-password", form);
      setMessage(res.data.message);
    } catch {
      setMessage("Reset failed or token expired");
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Reset Password</h2>
      <form onSubmit={handleReset}>
        <input
          style={styles.input}
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button style={styles.button} type="submit">Reset</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
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
  title: { marginBottom: "20px" },
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
    color: "green",
  },
};

export default ResetPassword;
