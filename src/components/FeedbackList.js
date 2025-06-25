import React, { useEffect, useState } from "react";
import axios from "axios";

function FeedbackList({ employeeId, isManager = false }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    strengths: "",
    improvements: "",
    sentiment: "positive",
  });

  useEffect(() => {
    axios
      .get(`https://feedback-system-backend-9djn.onrender.com/feedback/${employeeId}`)
      .then((res) => setFeedbacks(res.data.reverse()))
      .catch((err) => console.error("Error loading feedbacks:", err));
  }, [employeeId]);

  const startEdit = (fb) => {
    setEditingId(fb.id);
    setEditData({
      strengths: fb.strengths,
      improvements: fb.improvements,
      sentiment: fb.sentiment,
    });
  };

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const saveEdit = async (id) => {
    const form = new FormData();
    form.append("strengths", editData.strengths);
    form.append("improvements", editData.improvements);
    form.append("sentiment", editData.sentiment);

    try {
      await axios.put(`http://localhost:8000/feedback/update/${id}`, form);
      const updated = feedbacks.map((fb) =>
        fb.id === id ? { ...fb, ...editData } : fb
      );
      setFeedbacks(updated);
      setEditingId(null);
    } catch (err) {
      alert("Failed to update feedback.");
    }
  };

  return (
    <div>
      <h3 style={styles.heading}>📜 Feedback History</h3>
      {feedbacks.length === 0 ? (
        <p style={{ fontStyle: "italic" }}>No feedback found.</p>
      ) : (
        feedbacks.map((fb) => (
          <div
            key={fb.id}
            style={{
              ...styles.card,
              backgroundColor:
                fb.sentiment === "positive"
                  ? "#e0ffe0"
                  : fb.sentiment === "neutral"
                  ? "#fffce0"
                  : "#ffe0e0",
            }}
          >
            {editingId === fb.id ? (
              <>
                <textarea
                  value={editData.strengths}
                  onChange={(e) => handleEditChange("strengths", e.target.value)}
                  placeholder="Strengths"
                  style={styles.textarea}
                />
                <textarea
                  value={editData.improvements}
                  onChange={(e) => handleEditChange("improvements", e.target.value)}
                  placeholder="Improvements"
                  style={styles.textarea}
                />
                <select
                  value={editData.sentiment}
                  onChange={(e) => handleEditChange("sentiment", e.target.value)}
                  style={styles.select}
                >
                  <option value="positive">Positive</option>
                  <option value="neutral">Neutral</option>
                  <option value="negative">Negative</option>
                </select>
                <div style={styles.buttonRow}>
                  <button onClick={() => saveEdit(fb.id)} style={styles.saveBtn}>
                    💾 Save
                  </button>
                  <button onClick={() => setEditingId(null)} style={styles.cancelBtn}>
                    ❌ Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p><strong>Strengths:</strong> {fb.strengths}</p>
                <p><strong>Improvements:</strong> {fb.improvements}</p>
                <p><strong>Sentiment:</strong> {fb.sentiment}</p>
                <p style={styles.timestamp}>
                  <em>Received:</em> {new Date(fb.created_at).toLocaleString()}
                </p>
                {isManager && (
                  <button onClick={() => startEdit(fb)} style={styles.editBtn}>
                    ✏️ Edit
                  </button>
                )}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  heading: {
    fontSize: "1.3rem",
    marginBottom: "15px",
    color: "#2c3e50",
  },
  card: {
    border: "1px solid #ccc",
    padding: "16px",
    margin: "12px 0",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  textarea: {
    width: "100%",
    height: "80px",
    padding: "10px",
    fontSize: "15px",
    borderRadius: "6px",
    border: "1px solid #bbb",
    marginBottom: "10px",
    fontFamily: "Segoe UI, sans-serif",
    resize: "vertical",
  },
  select: {
    width: "100%",
    padding: "10px",
    fontSize: "15px",
    borderRadius: "6px",
    border: "1px solid #bbb",
    marginBottom: "10px",
    appearance: "none",
    backgroundImage:
      "url('data:image/svg+xml;utf8,<svg fill=%22gray%22 height=%2224%22 viewBox=%220 0 24 24%22 width=%2224%22 xmlns=%22http://www.w3.org/2000/svg%22><path d=%22M7 10l5 5 5-5z%22/></svg>')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
    backgroundColor: "#fff",
    backgroundSize: "18px",
  },
  timestamp: {
    fontSize: "0.9em",
    color: "#555",
    marginTop: "10px",
  },
  buttonRow: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
  },
  saveBtn: {
    padding: "8px 12px",
    backgroundColor: "#27ae60",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  cancelBtn: {
    padding: "8px 12px",
    backgroundColor: "#bdc3c7",
    color: "#2c3e50",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  editBtn: {
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "#f39c12",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default FeedbackList;
