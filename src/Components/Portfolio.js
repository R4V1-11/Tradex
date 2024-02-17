import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";


const StockList = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      // Retrieve the user object from local storage
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user && user.access_token;
      // Extract the userid from the user object
      const userid = user && user.user && user.user.id;
      console.log(userid)

      try {
        const response = await fetch('http://127.0.0.1:5000/get_stock_by_userid', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ userid: userid }) // Use the userid from local storage
        });

        if (response.ok) {
          const data = await response.json();
          setStocks(data);
        } else {
          console.error('Failed to fetch stocks');
        }
      } catch (error) {
        console.error('An error occurred during the fetch:', error);
      }
    };

    fetchStocks();
  }, []);

  return (
    <div>
      <Navbar/>
      <h1>Portfolio</h1>
      <div className="container">
        {stocks.map((stock, index) => (
          <div className="card mb-3" key={index}>
            <div className="card-body">
              <h5 className="card-title">{stock.ticker}</h5>
              <p className="card-text">
                <strong>Price:</strong> {stock.price}
              </p>
              <p className="card-text">
                <strong>Quantity:</strong> {stock.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockList;
