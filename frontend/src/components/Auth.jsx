import React, { useState } from "react";
import styles from "./Auth.module.scss";

function Auth(props) {
  const [isLogin, setIsLogin] = useState(true);

  // Form States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI States
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    const endpoint = isLogin ? "/login" : "/signup";
    const url = `https://ciphersql-studio-at9e.onrender.com/api/auth${endpoint}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          props.onLogin(data.user);
        } else {
          alert("Signup successful! Please login.");
          setIsLogin(true);
          setUsername("");
          setPassword("");
          setConfirmPassword("");
        }
      } else {
        // Backend sent an error (e.g., User exists)
        setError(data.error || "Authentication failed");
      }
    } catch (err) {
      console.error(err);
      setError("Cannot connect to server. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className={styles.authWrapper}>
      <div className={styles.authContainer}>
        {/* Header */}
        <div className={styles.authHeader}>
          <div className={styles.logoCircle}>
            <span className={styles.lockIcon}>🔐</span>
          </div>
          <h1 className={styles.title}>
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className={styles.subtitle}>
            {isLogin ? "Login to CipherSQL" : "Join CipherSQL Today"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.authForm}>
          {/* Username Field */}
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>👤</span>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                className={styles.input}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>🔑</span>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className={styles.input}
              />
            </div>
          </div>

          {/* Confirm Password Field (Only for Signup) */}
          {!isLogin && (
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Confirm Password
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>🔒</span>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  required
                  className={styles.input}
                />
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className={styles.errorMessage}>
              <span className={styles.errorIcon}>⚠️</span>
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`${styles.submitBtn} ${loading ? styles.loading : ""} `}
          >
            {loading ? (
              <>
                <span className={styles.spinner}></span>
                {isLogin ? "Logging in..." : "Creating..."}
              </>
            ) : isLogin ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Toggle Login/Signup */}
        <div className={styles.toggleSection}>
          <p className={styles.toggleText}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span onClick={toggleAuthMode} className={styles.toggleLink}>
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
