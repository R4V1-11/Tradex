import React, { useState, useEffect } from "react";

const TransactionHistory = () => {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [userId, setUserId] = useState(/* replace with the actual user id */);

  // Function to fetch transaction history from the backend API
  const fetchTransactionHistory = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user && user.access_token;
    // Extract the userid from the user object
    const userid = user && user.user && user.user.id;
    try {
      // Replace with your actual API endpoint
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
    fetchTransactionHistory();
  }, [userId]);

  return (
    <div>
      <div className="transaction-history-container" style={historyStyles}>
        <h1>Transaction History</h1>
        {transactionHistory.length === 0 ? (
          <p>No transaction history available.</p>
        ) : (
          <ul>
            {transactionHistory.map((transaction, index) => (
              <li key={index}>
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

// Add this inline style object at the end of your component
const historyStyles = {
  maxWidth: '600px',
  margin: '0 auto',
  textAlign: 'center',
  padding: '20px',
};

export default TransactionHistory;
