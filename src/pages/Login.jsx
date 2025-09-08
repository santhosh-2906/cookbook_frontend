// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";  // ✅ fixed Link import

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // ---------------- Handle Form Submit ----------------
  const handleLogin = (e) => {
    e.preventDefault();

    fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setMessage(data.error);
        } else {
          setMessage(data.message);

          const userData = { id: data.user_id, username: username };
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);

          navigate("/");
        }
      })
      .catch(() => {
        setMessage("Something went wrong");
      });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      {/* ---------------- Card Container ---------------- */}
      <div className="card shadow-sm bg-dark text-light">
        <div className="card-body">
          {/* ---------------- Heading ---------------- */}
          <h3 className="text-center mb-4">Login</h3>

          {/* ---------------- Login Form ---------------- */}
          <form onSubmit={handleLogin}>
            {/* username input */}
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* password input */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* login button */}
            <button type="submit" className="btn btn-warning w-100">
              Login
            </button>
          </form>

          {/* ---------------- Message Display ---------------- */}
          {message && <p className="text-center mt-3 text-danger">{message}</p>}

          {/* ---------------- Register Link ---------------- */}
          <p className="text-center mt-3">
            Don’t have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
