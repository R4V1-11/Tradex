import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./Profile.css"
import defaultImage from "./Profile.png"
import { Link } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    fund: 0,
  });

  const [addFundsAmount, setAddFundsAmount] = useState(0);

  // Function to fetch user data from the backend API
  const fetchUserData = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user && user.access_token;
    // Extract the userid from the user object
    const userid = user && user.user && user.user.id;
    console.log(userid)
    try {
      // Replace with your actual API endpoint
      const response = await fetch("http://localhost:5000/get_fund_by_userid", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ userid: userid })
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data[0]); // Assuming the API returns a list with a single user object
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("An error occurred during user data fetch:", error);
    }
  };

  // Simulate API call to add funds
  const handleAddFunds = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    // Extract the userid from the user object
    const token = user && user.access_token;

    const userid = user && user.user && user.user.id;
    try {
      // Replace with your actual API endpoint
      const response = await fetch("http://localhost:5000/add_fund_by_userid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ userid: userid, fund: addFundsAmount }),
    });

      if (response.ok) {
        // Update user data after adding funds
        fetchUserData();
        // Optionally, reset the addFundsAmount state
        setAddFundsAmount(0);
      } else {
        console.error("Failed to add funds");
      }
    } catch (error) {
      console.error("An error occurred during add funds:", error);
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
    <Navbar />
    <div className="profile-container">
      <div className="user-details card">
        <img src={defaultImage} alt="Profile" style={{ maxWidth: "30%", display: "block", margin: "0 auto" }} />
        <hr></hr>
        <h1>Hello{userData.name}</h1>
        <p>ID: {userData.id}</p>
        <p>Email: {userData.email}</p>
      </div>
      <div className="funds-section card">
        <h1>Fund Section</h1>
        <h1>${userData.fund}</h1>
        <hr></hr>
        <div>
          <h2>Add Funds</h2>
          <input
            type="number"
            value={addFundsAmount}
            onChange={(e) => setAddFundsAmount(parseFloat(e.target.value))}
          />
          <button className='add-button' onClick={handleAddFunds}>ADD</button>
        </div>
        <div>
          <Link to="/history">
            <button className="history-button">TRANSACTION HISTORY</button>
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
};

// Add this inline style object at the end of your component
const profileStyles = {
  maxWidth: '600px',
  margin: '0 auto',
  textAlign: 'center',
  padding: '20px',
};

export default Profile;