import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Watchlist.css";



const Watchlist1 = () => {
  const [stockData, setStockData] = useState([]);
  const navigate = useNavigate();
  const[Loading, isLoading] = useState(true);

  
  useEffect(() => {

    const user = JSON.parse(localStorage.getItem('user'));
    /*if (!user) {
      // If user data is not present, redirect to the login page
      navigate('/');
      return;
    }*/
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
      isLoading(false);
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
      <Navbar />
      <div className="container">
        { Loading ? (
          <div className="Loading-Container"></div> 
        ) : (
          Object.entries(stockData).map(([ticker, stockInfo]) => (
            <div className="stock-item" key={ticker}>
              <div className="stock-info">
                <h5 className="ticker">{ticker}</h5>
                <small className="text-muted">Time: {stockInfo.current_time}</small>
                <h5 className="price">${parseFloat(stockInfo.price).toFixed(2)}</h5>
              </div>
              <button
                className="buy-button"
                onClick={() => handleBuyClick(ticker, stockInfo.price)}
              >
                Buy
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  
  );
};

export default Watchlist1;