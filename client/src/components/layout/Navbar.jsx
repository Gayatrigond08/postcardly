import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Postcardly</h2>

      <ul className="nav-links">
        <li>Home</li>
        <li>Templates</li>
        <li>About</li>
      </ul>

      <button className="nav-button">
        Start Writing
      </button>
    </nav>
  );
}

export default Navbar;