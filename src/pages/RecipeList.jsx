// src/pages/RecipeList.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function RecipeList({ user }) {
  const [recipes, setRecipes] = useState([]);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // ---------------- Fetch Recipes ----------------
  useEffect(() => {
    if (!user) return;
    fetch(`${API_BASE}/recipes?user_id=${user.id}`)
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.log("Error:", err));
  }, [user]);

  // ---------------- Not Logged In ----------------
  if (!user) {
    return (
      <div className="container mt-5" style={{ maxWidth: "500px" }}>
        <div className="alert alert-warning text-center shadow-sm">
          <h5 className="mb-3">You’re not logged in</h5>
          <p>Please log in to view or add recipes.</p>
          <Link to="/login" className="btn btn-dark">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // ---------------- Render Recipes ----------------
  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Recipes</h2>

      {recipes.length === 0 ? (
        // ---------------- No Recipes ----------------
        <div className="text-center">
          <p>You don’t have any recipes yet. Add one to get started!</p>
          <Link to="/add" className="btn btn-success btn-lg">
            ➕ Add New Recipe
          </Link>
        </div>
      ) : (
        // ---------------- Recipe Cards ----------------
        <div className="row g-3">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="col-12 col-md-6 col-lg-4">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text text-muted">{recipe.category}</p>
                  <Link
                    to={`/recipes/${recipe.id}`}
                    className="btn btn-dark mt-auto"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipeList;
