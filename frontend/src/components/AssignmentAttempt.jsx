import React, { useState } from "react";
import Editor from "@monaco-editor/react";

function AssignmentAttempt(props) {
  const [query, setQuery] = useState("SELECT * FROM users;");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [hint, setHint] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. Execute Query Function
  async function runQuery() {
    setLoading(true);
    setError("");
    setResult(null);

    const currentUser = localStorage.getItem("cipherUser");

    try {
      const response = await fetch("http://localhost:4000/api/sql/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sql: query,
          username: currentUser,
          assignmentTitle: props.assignment.title,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(typeof data === "string" ? data : "Query Error Occurred");
      }
    } catch (err) {
      setError("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  }

  // 2. Get Hint Function
  async function getHint() {
    try {
      console.log("Sending to Backend:", query);
      setHint("Thinking... Please wait.");

      const response = await fetch("http://localhost:4000/api/sql/hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: props.assignment.title,
          userQuery: query,
        }),
      });
      const data = await response.json();
      setHint(data.hintText);
    } catch (err) {
      console.error("Hint Error");
      setHint("Could not connect to AI.");
    }
  }

  // 3. Helper to render Table from JSON Data
  const renderTable = (data) => {
    if (!data || data.length === 0)
      return (
        <p className="console-text">
          Query executed successfully. No rows returned.
        </p>
      );

    // Get headers from the first object keys
    const headers = Object.keys(data[0]);

    return (
      <table className="data-table">
        <thead>
          <tr>
            {headers.map((head) => (
              <th key={head}>{head}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {headers.map((col) => (
                <td key={col}>{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="attempt-container">
      {/* Header Section */}
      <div className="question-header">
        <h3>{props.assignment.title}</h3>
        <div className="schema-info">
          Schema: users (id, username, password) | orders (id, amount, status)
        </div>
        <p style={{ marginTop: "10px", color: "#555" }}>
          {props.assignment.desc}
        </p>
      </div>

      {/* Editor Section */}
      <div className="editor-wrapper">
        <div className="editor-label">SQL Editor</div>
        <Editor
          height="300px"
          defaultLanguage="sql"
          theme="light"
          value={query}
          onChange={(value) => setQuery(value)}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
          }}
        />
      </div>

      {/* Action Buttons */}
      <div className="action-bar">
        <button className="run-btn" onClick={runQuery} disabled={loading}>
          {loading ? "Running..." : "▶ Execute Query"}
        </button>
        <button className="hint-btn" onClick={getHint}>
          💡 Get Hint
        </button>
      </div>

      {/* Hint Display */}
      {hint && (
        <div className="hint-box">
          <strong>Hint:</strong> {hint}
        </div>
      )}

      {/* Results / Console Section */}
      <div className="results-section">
        <h4>Query Results</h4>

        {error ? (
          <div className="error-text">❌ Error: {error}</div>
        ) : result ? (
          Array.isArray(result) ? (
            renderTable(result)
          ) : (
            <pre className="console-text">
              {JSON.stringify(result, null, 2)}
            </pre>
          )
        ) : (
          <div className="console-text" style={{ opacity: 0.5 }}>
            &gt; Ready to execute...
            <br />
            &gt; Waiting for output...
          </div>
        )}
      </div>
    </div>
  );
}

export default AssignmentAttempt;
