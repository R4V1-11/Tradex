// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";


const Navbar = () =>{
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear all local storage
    localStorage.clear();
    // Navigate to the login page
    navigate('/');
  };

return (
  <nav className="navbar-container">
    <div className="brand">Tradex</div>
    <ul className="nav-links">
      <li>
        <Link to="/dash" className="nav-button">
          Watchlist1
        </Link>
      </li>
      <li>
        <Link to="/WL2" className="nav-button">
          Watchlist2
        </Link>
      </li>
      <li>
        <Link to="/portfolio" className="nav-button">
          Portfolio
        </Link>
      </li>
      <li>
        <Link to="/about" className="nav-button">
          About
        </Link>
      </li>
      <li>
        <Link to="/Profile" className="nav-button">
          Profile
        </Link>
      </li>
      <li>
          <button className="nav-button" onClick={handleSignOut}>
            Sign Out
          </button>
        </li>
    </ul>
  </nav>
);
};
export default Navbar;
