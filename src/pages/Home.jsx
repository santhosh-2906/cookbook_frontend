import { Link } from "react-router-dom";

function Home({ user }) {
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4 home-heading">Welcome to CookBook🍳</h1>

      <p className="mb-5 home-subtext">
        Save, organize, and cook your favorite recipes with step timers.
      </p>
      <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
        {user ? (
          // ---------------- Logged In ----------------
          <>
            <Link to="/recipes" className="btn btn-primary btn-lg">
              View My Recipes
            </Link>
            <Link to="/add" className="btn btn-success btn-lg">
              Add New Recipe
            </Link>
          </>
        ) : (
          // ---------------- Not Logged In ----------------
          <>
            <Link to="/login" className="btn btn-primary btn-lg">
              Login
            </Link>
            <Link to="/register" className="btn btn-success btn-lg">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
