import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Postcardly
      </Link>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/designs">Designs</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>

      <Link to="/designs" className="nav-button">
        Write a Postcard
      </Link>
    </nav>
  );
}

export default Navbar;