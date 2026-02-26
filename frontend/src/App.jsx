import React, { useState } from "react";
import "./App.scss";
import AssignmentList from "./components/AssignmentList";
import AssignmentAttempt from "./components/AssignmentAttempt";
import Auth from "./components/Auth";

function App() {
  const [user, setUser] = useState(localStorage.getItem("cipherUser") || null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // Login Function (Saves to LocalStorage)
  const handleLogin = (username) => {
    setUser(username);
    localStorage.setItem("cipherUser", username);
  };

  // Logout Function (Clears LocalStorage)
  const handleLogout = () => {
    setUser(null);
    setSelectedAssignment(null);
    localStorage.removeItem("cipherUser");
  };

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="app-container__header">
        <h1>CipherSQL Studio</h1>

        {user && (
          <div className="user-info">
            <span>
              Hello, <b>{user}</b>
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      {!user ? (
        <Auth onLogin={handleLogin} />
      ) : (
        <main>
          {selectedAssignment ? (
            <div className="assignment-workspace">
              <button
                className="back-btn"
                onClick={() => setSelectedAssignment(null)}
                style={{
                  marginBottom: "15px",
                  padding: "8px 16px",
                  cursor: "pointer",
                  backgroundColor: "#e5e7eb",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                ← Back to Dashboard
              </button>
              <AssignmentAttempt assignment={selectedAssignment} />
            </div>
          ) : (
            <AssignmentList onSelect={(item) => setSelectedAssignment(item)} />
          )}
        </main>
      )}
    </div>
  );
}

export default App;
