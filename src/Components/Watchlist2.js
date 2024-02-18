import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Watchlist1 = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    // Fetch stock prices from the backend when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/get_prices_wl2");
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
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  return (
    <div>
    <Navbar />
      <h2>Welcome to Tradex</h2>
      <p>Watchlist2</p>
      <div>
        {/* Display stock data */}
        {Object.entries(stockData).map(([ticker, stockInfo]) => (
          <div key={ticker}>
            <p>Ticker: {ticker}</p>
            <p>Price: {stockInfo.price}</p>
            <p>Time: {stockInfo.current_time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist1;
