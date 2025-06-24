import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ManagerDashboard from "./components/Dashboard/ManagerDashboard";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";

function App() {
  const [role, setRole] = useState("");          // "manager" or "employee"
  const [userId, setUserId] = useState(null);    // logged-in user's ID
  const [isSignup, setIsSignup] = useState(false); // toggle between login/signup

  const handleLogout = () => {
    setRole("");
    setUserId(null);
    setIsSignup(false);
  };

  const wrapperStyle = {
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f0f2f5",
    minHeight: "100vh",
    padding: "40px 20px",
    color: "#333",
  };

  const cardStyle = {
    maxWidth: "500px",
    margin: "auto",
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    textAlign: "center"
  };

  const linkStyle = {
    marginTop: "15px",
    fontSize: "0.95rem",
  };
  const logoutButtonStyle = {
  marginTop: "20px",
  padding: "10px 18px",
  fontSize: "16px",
  borderRadius: "6px",
  backgroundColor: "#e74c3c",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.3s",
};


  // Login or Signup screen
  if (!role) {
    return (
      <div style={wrapperStyle}>
        <div style={cardStyle}>
          {isSignup ? (
            <>
              <SignupPage
                onSignupSuccess={(data) => {
                  setRole(data.role);
                  setUserId(data.id);
                }}
              />
              <p style={linkStyle}>
                Already have an account?{" "}
                <button onClick={() => setIsSignup(false)}>Login</button>
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
              <p style={linkStyle}>
                Don't have an account?{" "}
                <button onClick={() => setIsSignup(true)}>Signup</button>
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  // Dashboard after login
  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        {role === "manager" && (
          <>
            <ManagerDashboard managerId={userId} />
            <button onClick={handleLogout} style={logoutButtonStyle}>
  🔒 Logout
</button>

          </>
        )}
        {role === "employee" && (
          <>
            <EmployeeDashboard employeeId={userId} />
            <button onClick={handleLogout} style={logoutButtonStyle}>
  🔒 Logout
</button>

          </>
        )}
      </div>
    </div>
  );
}

export default App;
