import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import History from './History'


const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

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
          const total = data.reduce((total, stock) => total + stock.current_price * stock.quantity,  0);
          setSubtotal(total);
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
    <div className='Background'>
      <Navbar/>
      <h1>Portfolio</h1>
      <p style={{ textAlign: 'center'}}> Subtotal: {subtotal.toFixed(2)}</p>
      <div className="container-fluid pt-5">
        {stocks.map((stock, index) => (
          <div className="card mb-3" key={index}>
            <div className="card-body">
              <h5 className="card-title">{stock.ticker}</h5>
              <div className='row'>
                <div className='col'>
                  <div className='card-title'>
                      <strong>Price:</strong>{stock.price}
                  </div>
                </div>
              </div>
              <p className="card-text">
                <strong>Quantity:</strong> {stock.quantity}
              </p>
              <div className='row'>
                <div className='col'>
                  <div className='card-text'>
                      <strong>Original Price: </strong>{stock.price*stock.quantity}
                  </div>
                </div>
                <div className='col'>
                  <div className='card-text'>
                      <strong>Current Price: </strong>{stock.current_price*stock.quantity}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <History/>
    </div>
  );
};

export default StockList;
