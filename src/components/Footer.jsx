
import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light py-4 mt-auto shadow-sm">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        
        <span>© {year} CookBook. All rights reserved.</span>

        
        <div className="d-flex gap-3 mt-2 mt-md-0">
          <Link to="/" className="text-light text-decoration-none">
            Home
          </Link>
          <Link to="/recipes" className="text-light text-decoration-none">
            Recipes
          </Link>
          <Link to="/add" className="text-light text-decoration-none">
            Add Recipe
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
