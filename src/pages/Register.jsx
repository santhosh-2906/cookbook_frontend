// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // ---------------- Handle Register Submit ----------------
  const handleRegister = (e) => {
    e.preventDefault();

    fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setMessage(data.error);
        } else {
          setMessage(data.message);
          // move to login page after success
          navigate("/login");
        }
      })
      .catch(() => {
        setMessage("Something went wrong");
      });
  };

  // ---------------- Render Form ----------------
  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <div className="card bg-dark text-light shadow-sm">
        <div className="card-body">
          <h2 className="mb-4 text-center">Register</h2>

          {/* registration form */}
          <form onSubmit={handleRegister}>
            {/* username input */}
            <div className="mb-3">
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
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* submit button */}
            <button type="submit" className="btn btn-warning w-100">
              Register
            </button>
          </form>

          {/* show response message */}
          {message && (
            <p className="text-center mt-3 text-muted">{message}</p>
          )}

          {/* link to login page */}
          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
