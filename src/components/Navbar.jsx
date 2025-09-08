import { Link, useNavigate } from "react-router-dom";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  // ---------------- Logout Handler ----------------
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        {/* ---------------- Brand ---------------- */}
        <Link className="navbar-brand fw-bold text-success fs-3" to="/">
          🍴 Cook<span className="text-warning">Book</span>
        </Link>

        {/* ---------------- Mobile Toggle ---------------- */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ---------------- Nav Links ---------------- */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {/* Home always visible */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {/* Authenticated user links */}
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/recipes">Recipes</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add">Add Recipe</Link>
                </li>
              </>
            )}
          </ul>

          {/* ---------------- Auth Buttons ---------------- */}
          <ul className="navbar-nav">
            {user ? (
              <li className="nav-item">
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
