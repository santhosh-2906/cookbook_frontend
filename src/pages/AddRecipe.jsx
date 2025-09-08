import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function AddRecipe({ user }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("veg");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState([{ description: "", time_minutes: "" }]);

  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // ---------------- Redirect if not logged in ----------------
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

  // ---------------- Steps Management ----------------
  const addStepField = () => {
    setSteps([...steps, { description: "", time_minutes: "" }]);
  };

  const handleStepChange = (index, field, value) => {
    const newSteps = [...steps];
    newSteps[index][field] = value;
    setSteps(newSteps);
  };

  // ---------------- Submit Form ----------------
  const handleSubmit = (e) => {
    e.preventDefault();

    const recipeData = {
      title,
      category,
      ingredients,
      steps,
      user_id: user.id,
    };

    fetch(`${API_BASE}/recipes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipeData),
    })
      .then((res) => res.json())
      .then(() => navigate("/recipes"))
      .catch((err) => console.log("Error:", err));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Add New Recipe</h2>

      <form className="card p-4 shadow" onSubmit={handleSubmit}>
        {/* ---------------- Title ---------------- */}
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* ---------------- Category ---------------- */}
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
            <option value="snacks">Snacks</option>
            <option value="others">Others</option>
          </select>
        </div>

        {/* ---------------- Ingredients ---------------- */}
        <div className="mb-3">
          <label className="form-label">Ingredients</label>
          <textarea
            className="form-control"
            rows="3"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>

        {/* ---------------- Steps ---------------- */}
        <h5>Steps</h5>
        {steps.map((step, index) => (
          <div key={index} className="row g-2 mb-2">
            <div className="col-8">
              <input
                className="form-control"
                placeholder="Step description"
                value={step.description}
                onChange={(e) =>
                  handleStepChange(index, "description", e.target.value)
                }
              />
            </div>
            <div className="col-4">
              <input
                type="number"
                className="form-control"
                placeholder="Time (mins)"
                value={step.time_minutes}
                onChange={(e) =>
                  handleStepChange(index, "time_minutes", e.target.value)
                }
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-outline-primary btn-sm mb-3"
          onClick={addStepField}
        >
          + Add Step
        </button>

        {/* ---------------- Submit Button ---------------- */}
        <div className="d-grid">
          <button type="submit" className="btn btn-success">
            Save Recipe
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRecipe;
