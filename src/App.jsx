import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ---------------- Components ----------------
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RecipeList from "./pages/RecipeList";
import AddRecipe from "./pages/AddRecipe";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecipeDetails from "./pages/recipeDetails";
import EditRecipe from "./pages/EditRecipe";
import Footer from "./components/Footer";

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
        <div className="overlay d-flex flex-column min-vh-100">
          
          <Navbar user={user} setUser={setUser} />

          
          <div className="container py-4 flex-grow-1">
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/recipes" element={<RecipeList user={user} />} />
              <Route path="/recipes/:id" element={<RecipeDetails user={user} />} />
              <Route path="/add" element={<AddRecipe user={user} />} />
              <Route path="/edit/:id" element={<EditRecipe user={user} />} />
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
