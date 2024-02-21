// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file for styling

const Navbar = () => (
  <nav className="navbar-container">
    <Link to="/dash" className="brand">
      TradeX
    </Link>
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
    </ul>
  </nav>
);

export default Navbar;
