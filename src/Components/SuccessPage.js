import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      // If user data is not present, redirect to the login page
      navigate('/');
      return;
    }
    // Set a timer to redirect to the watchlist page after  2 seconds
    const timer = setTimeout(() => {
      navigate('/dash'); // Replace '/watchlist' with the actual path to your watchlist page
    },  2000);

    // Clear the timer if the component is unmounted before the timer ends
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">Success!</h4>
          <p>Your order has been executed.</p>
          <hr />
          <p className="mb-0">
            <i className="bi bi-check-circle-fill" style={{ color: 'green' }}></i>
            &nbsp;
          </p>
         
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
