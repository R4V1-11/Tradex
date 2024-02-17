import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";


const Watchlist1 = () => {
  const [stockData, setStockData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch stock prices from the backend when the component mounts
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user && user.access_token;
       // console.log(token)
        const response = await fetch("http://127.0.0.1:5000/get_prices_wl1", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setStockData(data);
        } else {
          console.error("Failed to fetch stock prices");
        }
      } catch (error) {
        console.error("An error occurred during the fetch:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData,  5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts



  const handleBuyClick = (ticker, price) => {
    // Retrieve user ID from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user && user.user && user.user.id;
    console.log(userId)

    // Navigate to the /buy route with state containing ticker, price, and userId
    navigate('/buyPage', { state: { ticker, price, userId } });
  };



  return (
    <div>
    {/* <h2>Welcome to Tradex</h2>
    <p>Watchlist1</p> */}
    <div className="container">
      {/* Display stock data */}
      {Object.entries(stockData).map(([ticker, stockInfo]) => (
        <div className="col-md-8" key={ticker}>
          <div className="card mb-4 w-100">
            <div className="card-body d-flex justify-content-between align-items-center">
              <h5 className="card-title">{ticker}</h5>
              <small className="text-muted">Time: {stockInfo.current_time}</small>
              <h5 className="card-title">{parseFloat(stockInfo.price).toFixed(2)}</h5>
              <button
                  className="btn btn-success"
                  style={{ width: '150px' }}
                  onClick={() => handleBuyClick(ticker, stockInfo.price)}
                >
                  Buy
                </button>
             
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default Watchlist1;
