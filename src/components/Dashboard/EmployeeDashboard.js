import React, { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import PeerFeedbackForm from "../PeerFeedbackForm";

ChartJS.register(ArcElement, Tooltip, Legend);

function EmployeeDashboard({ employeeId }) {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/feedback/${employeeId}`
        );
        setFeedbackList(res.data.reverse());
      } catch (err) {
        console.error("Failed to load feedback", err);
      }
    };

    fetchFeedback();
  }, [employeeId]);

  const sentimentCounts = {
    positive: 0,
    neutral: 0,
    negative: 0,
  };

  feedbackList.forEach((fb) => {
    if (fb.sentiment in sentimentCounts) {
      sentimentCounts[fb.sentiment]++;
    }
  });

  const data = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        label: "Sentiment",
        data: [
          sentimentCounts.positive,
          sentimentCounts.neutral,
          sentimentCounts.negative,
        ],
        backgroundColor: ["#66ff66", "#fff266", "#ff6666"],
        borderColor: ["#33cc33", "#e0c200", "#cc0000"],
        borderWidth: 1,
      },
    ],
  };

  const handleAcknowledge = async (feedbackId) => {
    try {
      await axios.put(
        `http://localhost:8000/feedback/acknowledge/${feedbackId}`
      );
      const updated = feedbackList.map((fb) =>
        fb.id === feedbackId ? { ...fb, acknowledged: true } : fb
      );
      setFeedbackList(updated);
    } catch (err) {
      alert("Failed to acknowledge");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome, Employee</h2>

      {feedbackList.length > 0 && (
        <div style={styles.chartSection}>
          <h3>Sentiment Summary</h3>
          <div style={styles.chartWrapper}>
            <Doughnut data={data} />
          </div>
        </div>
      )}

      <h3 style={styles.subheading}>Feedback Received</h3>
      {feedbackList.length === 0 ? (
        <p>No feedback yet.</p>
      ) : (
        feedbackList.map((fb) => (
          <div
            key={fb.id}
            style={{
              ...styles.feedbackCard,
              backgroundColor:
                fb.sentiment === "positive"
                  ? "#e0ffe0"
                  : fb.sentiment === "neutral"
                  ? "#fffce0"
                  : "#ffe0e0",
            }}
          >
            <p>
              <strong>Strengths:</strong> {fb.strengths}
            </p>
            <p>
              <strong>Improvements:</strong> {fb.improvements}
            </p>
            <p>
              <strong>Sentiment:</strong> {fb.sentiment}
            </p>
            <p style={styles.timestamp}>
              <em>Received on:</em> {new Date(fb.created_at).toLocaleString()}
            </p>
            {!fb.acknowledged ? (
              <button
                style={styles.ackBtn}
                onClick={() => handleAcknowledge(fb.id)}
              >
                Mark as Read
              </button>
            ) : (
              <p style={styles.acknowledged}>✔ Acknowledged</p>
            )}
          </div>
        ))
      )}

      <div style={styles.peerSection}>
        <h3>🤝 Send Feedback to Peer</h3>
        <PeerFeedbackForm senderId={employeeId} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "Segoe UI, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
  },
  subheading: {
    marginTop: "40px",
    marginBottom: "20px",
  },
  chartSection: {
    textAlign: "center",
    marginBottom: "40px",
  },
  chartWrapper: {
    maxWidth: "300px",
    margin: "20px auto",
  },
  feedbackCard: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "15px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  timestamp: {
    fontSize: "0.9em",
    color: "#555",
    marginTop: "10px",
  },
  ackBtn: {
    marginTop: "10px",
    padding: "8px 12px",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  acknowledged: {
    color: "green",
    fontWeight: "bold",
    marginTop: "10px",
  },
  peerSection: {
    marginTop: "40px",
    paddingTop: "20px",
    borderTop: "2px solid #eee",
  },
};

export default EmployeeDashboard;