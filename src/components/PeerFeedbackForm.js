import React, { useEffect, useState } from "react";
import axios from "axios";

function PeerFeedbackForm({ senderId }) {
  const [employees, setEmployees] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/employees")
      .then((res) => setEmployees(res.data))
      .catch(() => setEmployees([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/peer-feedback", {
        sender_id: senderId,
        receiver_id: receiverId,
        message,
        anonymous,
      });
      setStatus("Feedback submitted successfully!");
      setReceiverId("");
      setMessage("");
      setAnonymous(false);
    } catch {
      setStatus("Failed to send feedback.");
    }
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>🤝 Send Peer Feedback</h3>
      <form onSubmit={handleSubmit}>
        <label style={styles.label}>To:</label>
        <select
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          required
          style={styles.input}
        >
          <option value="">-- Select Peer --</option>
          {employees
            .filter((emp) => emp.id !== senderId)
            .map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.username} (ID: {emp.id})
              </option>
            ))}
        </select>

        <label style={styles.label}>Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="Write your feedback..."
          style={styles.textarea}
        />

        <div style={styles.checkbox}>
          <input
            type="checkbox"
            checked={anonymous}
            onChange={() => setAnonymous(!anonymous)}
          />
          <span style={{ marginLeft: "8px" }}>Send anonymously</span>
        </div>

        <button type="submit" style={styles.button}>
          Submit
        </button>
        {status && <p style={styles.status}>{status}</p>}
      </form>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: "10px",
    padding: "25px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    maxWidth: "500px",
    margin: "20px auto",
  },
  title: {
    marginBottom: "15px",
    fontSize: "1.3rem",
    color: "#333",
  },
  label: {
    fontWeight: "bold",
    display: "block",
    marginTop: "10px",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    marginBottom: "15px",
  },
  textarea: {
    width: "100%",
    height: "80px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    marginBottom: "15px",
  },
  checkbox: {
    marginBottom: "15px",
    display: "flex",
    alignItems: "center",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },
  status: {
    marginTop: "10px",
    color: "green",
  },
};

export default PeerFeedbackForm;
