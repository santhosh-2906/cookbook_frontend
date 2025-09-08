// src/pages/RecipeDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function RecipeDetails({ user }) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [cooking, setCooking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // ---------------- Fetch Recipe ----------------
  useEffect(() => {
    if (!user) return;
    fetch(`${API_BASE}/recipes/${id}?user_id=${user.id}`)
      .then((res) => res.json())
      .then((data) => setRecipe({ ...data.recipe, steps: data.steps }))
      .catch((err) => console.log("Error:", err));
  }, [id, user]);

  // ---------------- Countdown Timer ----------------
  useEffect(() => {
    if (!cooking || paused || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooking, paused, timeLeft]);

  // ---------------- Auto-Advance Step ----------------
  useEffect(() => {
    if (!cooking || !recipe) return;
    if (timeLeft === 0 && !paused) {
      if (currentStep < recipe.steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
        setTimeLeft(recipe.steps[currentStep + 1].time_minutes * 60);
      } else {
        alert("All steps completed!");
        setCooking(false);
      }
    }
  }, [timeLeft, cooking, paused, currentStep, recipe]);

  // ---------------- Delete Recipe ----------------
  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (!confirmDelete) return;

    fetch(`${API_BASE}/recipes/${id}?user_id=${user.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => navigate("/recipes"))
      .catch((err) => console.log("Error:", err));
  };

  // ---------------- Cooking Controls ----------------
  const startCooking = () => {
    if (!recipe || !recipe.steps || recipe.steps.length === 0) {
      alert("No steps found for this recipe.");
      return;
    }
    setCurrentStep(0);
    setTimeLeft(recipe.steps[0].time_minutes * 60);
    setCooking(true);
    setPaused(false);
  };

  const skipStep = () => {
    if (!recipe || currentStep >= recipe.steps.length - 1) {
      alert("No more steps to skip.");
      setCooking(false);
      return;
    }
    setCurrentStep((prev) => prev + 1);
    setTimeLeft(recipe.steps[currentStep + 1].time_minutes * 60);
  };

  const togglePause = () => setPaused((prev) => !prev);
  const stopCooking = () => {
    setCooking(false);
    setPaused(false);
    setCurrentStep(0);
    setTimeLeft(0);
  };

  // ---------------- Render ----------------
  if (!user) {
    return <p className="text-center mt-5">Please log in to view this recipe.</p>;
  }

  if (!recipe) {
    return (
      <div className="text-center mt-5">
        <p>You have no saved recipe. Click "Add New" to create one!</p>
        <Link to="/add" className="btn btn-dark mt-2">Add New Recipe</Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          {/* ---------------- Recipe Info ---------------- */}
          <h2 className="card-title">{recipe.title}</h2>
          <p><strong>Category:</strong> {recipe.category}</p>
          <p><strong>Ingredients:</strong> {recipe.ingredients}</p>

          {/* ---------------- Steps ---------------- */}
          <h4>Steps</h4>
          <ul className="list-group mb-3">
            {recipe.steps &&
              recipe.steps.map((step, index) => (
                <li key={index} className="list-group-item">
                  {step.description} ({step.time_minutes} mins)
                </li>
              ))}
          </ul>

          {/* ---------------- Edit/Delete Buttons ---------------- */}
          <div className="mb-3">
            <Link to={`/edit/${id}`} className="btn btn-primary me-2">
              Edit
            </Link>
            <button onClick={handleDelete} className="btn btn-danger">
              Delete
            </button>
          </div>

          {/* ---------------- Cooking Section ---------------- */}
          {!cooking ? (
            <button onClick={startCooking} className="btn btn-success">
              Start Cooking
            </button>
          ) : (
            <div className="mt-3">
              <h5>
                Step {currentStep + 1}: {recipe.steps[currentStep].description}
              </h5>
              <p>
                Time left: {Math.floor(timeLeft / 60)}:
                {("0" + (timeLeft % 60)).slice(-2)}
              </p>

              <div className="d-flex flex-wrap gap-2">
                <button onClick={skipStep} className="btn btn-warning">
                  Skip Step
                </button>
                <button onClick={togglePause} className="btn btn-secondary">
                  {paused ? "Resume" : "Pause"}
                </button>
                <button onClick={stopCooking} className="btn btn-danger">
                  Stop
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
