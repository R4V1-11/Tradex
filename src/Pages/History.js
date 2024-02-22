import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import './History.css';
import { Link, useNavigate } from "react-router-dom";


 
const TransactionHistory = () => {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [userId, setUserId] = useState;
  const navigate = useNavigate();

  
  // Function to fetch transaction history from the backend API
  const fetchTransactionHistory = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user && user.access_token;
    
    const userid = user && user.user && user.user.id;
    try {
      
      const response = await fetch("http://localhost:5000/get_history_by_userid", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ userid: userid}),
 
      });
 
      if (response.ok) {
        const data = await response.json();
        setTransactionHistory(data);
      } else {
        console.error("Failed to fetch transaction history");
      }
    } catch (error) {
      console.error("An error occurred during transaction history fetch:", error);
    }
  };
 
  // Fetch transaction history on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      // If user data is not present, redirect to the login page
      navigate('/');
      return;
    }
    fetchTransactionHistory();
  }, [userId]);
 
  return (
    <div>
    <Navbar />
    <div className="History-container">
        <h1 style={{color:'white', alignContent:"center"}}>Transaction History</h1>
        {transactionHistory.length === 0 ? (
          <p>No transaction history available.</p>
        ) : (
          <ul>
            {transactionHistory.map((transaction, index) => (
              <li key={index} className="transaction-list">
                <p>Ticker: {transaction.ticker}</p>
                <p>Price: ${transaction.price}</p>
                <p>Quantity: {transaction.quantity}</p>
              </li>
            ))}
          </ul>
        )}
    </div>
    </div>
  );
};
 

const historyStyles = {
  maxWidth: '600px',
  margin: '0 auto',
  textAlign: 'center',
  padding: '20px',
};
 
export default TransactionHistory;