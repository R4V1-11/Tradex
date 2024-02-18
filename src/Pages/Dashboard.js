import React from "react";
import Navbar from "../Components/Navbar";
import Watchlist1 from "../Components/Watchlist1";
import { Redirect } from "react-router-dom";

const Dashboard = ({ authenticated }) => {
  // Redirect to login if not authenticated
  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Navbar />
      <Watchlist1 />
    </div>
  );
};

export default Dashboard;
