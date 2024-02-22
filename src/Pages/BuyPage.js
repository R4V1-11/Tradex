import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";


const BuyPage = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
 
  // Retrieve the state passed from the Watchlist1 component
  const { ticker, price, userId } = location.state;
  const totalPrice = parseFloat(price) * quantity;
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Retrieve user ID from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user && user.access_token;

    try {
      const response = await fetch("http://127.0.0.1:5000/buy_stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ticker,
          userid: userId,
          price,
          quantity
        })

      });

      if (response.ok) {
        // Handle successful purchase
        console.log("Stock purchased successfully");
        navigate('/successPage'); // Redirect to a success page or back to the watchlist
      } else {
        // Handle error
        console.error("Failed to purchase stock");
        alert('Insufficient funds for the purchase.');

      }
    } catch (error) {
      console.error("An error occurred during the fetch:", error);
    }
  };

  return (
    <div className="sell">
    <div>
        <Navbar/>
    <div className="container">
       
    <div className="card">
      <div className="card-header">
        <h2>Buy Stock: {ticker}</h2>
      </div>
      <div className="card-body">
        <h4>Price per unit: {price.toFixed(2)}</h4>
        
        <h4>Total Price for {quantity} units: {totalPrice.toFixed(2)}</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">Buy</button>
        </form>
      </div>
    </div>
  </div>
  </div>
  </div>
  );
};

export default BuyPage;
