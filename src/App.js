import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ManagerDashboard from "./components/Dashboard/ManagerDashboard";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";

function App() {
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState(null);
  const [isSignup, setIsSignup] = useState(false);

  const handleLogout = () => {
    setRole("");
    setUserId(null);
    setIsSignup(false);
  };

  const styles = {
    wrapper: {
      fontFamily: "Segoe UI, sans-serif",
      background: "linear-gradient(135deg, #f6f9fc, #ddeaf6)",
      minHeight: "100vh",
      padding: "40px 20px",
      color: "#333",
    },
    card: {
      maxWidth: "500px",
      margin: "auto",
      backgroundColor: "#ffffff",
      borderRadius: "14px",
      padding: "35px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      textAlign: "center",
    },
    link: {
      marginTop: "25px",
      fontSize: "1rem",
    },
    switchBtn: {
      backgroundColor: "#4a90e2",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      padding: "10px 18px",
      fontSize: "15px",
      marginTop: "10px",
      cursor: "pointer",
      transition: "background-color 0.3s, transform 0.2s",
    },
    switchBtnHover: {
      backgroundColor: "#3c7dc9",
      transform: "scale(1.03)",
    },
    logoutBtn: {
      marginTop: "30px",
      padding: "12px 22px",
      fontSize: "16px",
      borderRadius: "6px",
      backgroundColor: "#e74c3c",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
  };

  if (!role) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.card}>
          {isSignup ? (
            <>
              <SignupPage
                onSignupSuccess={(data) => {
                  setRole(data.role);
                  setUserId(data.id);
                }}
              />
              <p style={styles.link}>
                Already have an account?{" "}
                <button
                  style={styles.switchBtn}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#3c7dc9"}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#4a90e2"}
                  onClick={() => setIsSignup(false)}
                >
                  Switch to Login
                </button>
              </p>
            </>
          ) : (
            <>
              <LoginPage
                onLogin={(data) => {
                  setRole(data.role);
                  setUserId(data.id);
                }}
              />
              <p style={styles.link}>
                Don’t have an account?{" "}
                <button
                  style={styles.switchBtn}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#3c7dc9"}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#4a90e2"}
                  onClick={() => setIsSignup(true)}
                >
                  Signup Here
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        {role === "manager" ? (
          <>
            <ManagerDashboard managerId={userId} />
            <button onClick={handleLogout} style={styles.logoutBtn}>
              🔒 Logout
            </button>
          </>
        ) : (
          <>
            <EmployeeDashboard employeeId={userId} />
            <button onClick={handleLogout} style={styles.logoutBtn}>
              🔒 Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
