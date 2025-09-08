// src/App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ---------------- Components ----------------
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RecipeList from "./pages/RecipeList";
import AddRecipe from "./pages/AddRecipe";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecipeDetails from "./pages/RecipeDetails";
import EditRecipe from "./pages/EditRecipe";

// ---------------- Assets & Styles ----------------
import homebg from "./assets/homebg.jpg";
import "./App.css";

function App() {
  // ---------------- State: Logged-in user ----------------
  const [user, setUser] = useState(null);

  // ---------------- Check localStorage on page refresh ----------------
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // ---------------- Render ----------------
  return (
    <Router>
      <div
        style={{
          backgroundImage: `url(${homebg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        {/* overlay for dark tint or styling */}
        <div className="overlay">
          {/* Navbar with login state */}
          <Navbar user={user} setUser={setUser} />

          {/* main content container */}
          <div className="container py-4">
            <Routes>
              {/* Home page */}
              <Route path="/" element={<Home user={user} />} />

              {/* Recipe list */}
              <Route path="/recipes" element={<RecipeList user={user} />} />

              {/* Recipe details */}
              <Route path="/recipes/:id" element={<RecipeDetails user={user} />} />

              {/* Add new recipe */}
              <Route path="/add" element={<AddRecipe user={user} />} />

              {/* Edit existing recipe */}
              <Route path="/edit/:id" element={<EditRecipe user={user} />} />

              {/* Login page */}
              <Route path="/login" element={<Login setUser={setUser} />} />

              {/* Register page */}
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
