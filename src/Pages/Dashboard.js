import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../Components/Navbar";

const Dashboard = () => (
  <div>
    <Navbar />
    <Link to="/WL1">Watchlist1</Link>
    <Link to="/WL2">Watchlist2</Link>
    <Link to="/about">About</Link>
    <Link to="/portfolio">Portfolio</Link>
  </div>
);

export default Dashboard;
