import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";


const BuyPage = () => {
  const [quantity, setQuantity] = useState(0);
  const [price2, setPrice2] = useState(null); 
  const navigate = useNavigate();
  const location = useLocation();
 
  // Retrieve the state passed from the Watchlist1 component
  const { ticker, price, userId ,quantitys} = location.state;
  console.log(ticker,price,userId);
  const totalPrice = parseFloat(price2 || price) * quantity;
  const handleSubmit = async (event) => {
    event.preventDefault();
    

    // Retrieve user ID from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user && user.access_token;

    try {
      const response = await fetch("http://127.0.0.1:5000/sell_stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ticker,
          userid: userId,
          price: price2 || price, 
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
        alert('Not enoguh stocks to sell.');

      }
    } catch (error) {
      console.error("An error occurred during the fetch:", error);
    }
  };
  const handleSetLimit = async (event) => {
    event.preventDefault();
console.log("test");
    // Retrieve user ID from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user && user.access_token;
    const userid = user && user.user && user.user.id;

console.log(ticker,userid,price,quantity)
    try {
      const response = await fetch("http://127.0.0.1:5000/bid_on_stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ticker,
          userid: userId,
          price: price2 || price, // Use the price from the second card if it's set
          quantity,
          action:"sell"

        })
      });

      if (response.ok) {
        // Handle successful limit setting
        console.log("Limit set successfully");
        navigate('/successPage'); // Redirect to a success page or back to the watchlist
      } else {
        // Handle error
        console.error("Failed to set limit");
        alert('Failed to set limit.');
      }
    } catch (error) {
      console.error("An error occurred during the fetch:", error);
    }
  };

  return (
    
  <div className="sell">
        <Navbar/>
    <div className="container"> 
      <div className="d-flex justify-content-between">
        <div className="card">
          <div className="card-header">
            <h2>Sell Stock: {ticker}</h2>
          </div>
          <div className="card-body">
            <h4>Price per unit: {price.toFixed(2)}</h4>
            <h4>Total Price for {quantity} units: {totalPrice.toFixed(2)}</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <h4>Available Quantity:{quantitys}</h4>
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
              <button type="submit" className="btn btn-danger">Sell</button>
            </form>
          </div>
      </div>
        <div className="card flex-fill">
            <div className="card-header">
              <h2>Set Limit Stock: {ticker}</h2>
            </div>
            <div className="card-body">
              <h4>Price per unit: {price2 ? price2 : 'Not set'}</h4>
              <h4>Total Price for {quantity} units: {totalPrice.toFixed(2)}</h4>
              <form onSubmit={handleSetLimit}> {/* Updated to use handleSetLimit */}
                <div className="mb-3">
                  <label htmlFor="price2" className="form-label">Price per unit (optional):</label>
                  <input
                    type="number"
                    id="price2"
                    name="price2"
                    placeholder="Set Price"
                    value={price2 || ''}
                    onChange={(e) => setPrice2(e.target.value)}
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-primary">Set Limit</button>
              </form>
            </div>
          </div>
      </div>
   </div>
 </div>
  );
};

export default BuyPage;
