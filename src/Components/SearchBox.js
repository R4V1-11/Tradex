import React, { useState, useEffect } from 'react';
import "./Search.css"
import { FaSearch } from "react-icons/fa";

 
function SearchBox({currentPage }) { // Assuming userid is passed as a prop
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    // Extract the userid from the user object
    const token = user && user.access_token;
 
    const userid = user && user.user && user.user.id;
    useEffect(() => {
      if (inputValue.length >  0) {
        fetch('http://10.50.10.252:5000/get_first_row')
          .then(response => response.json())
          .then(data => setSuggestions(data))
          .catch(error => console.error('Error fetching data:', error));
      } else {
        setSuggestions([]);
      }
    }, [inputValue]);
 
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
 
    const filteredSuggestions = suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );
 
    const Addstocks = (suggestion, userid, currentPage) => {
        // Define the data you want to send to the server
        const data = {
            ticker: suggestion,
          userId: userid,
          WL_no: currentPage
        };
       console.log(data);
        // Convert the data to JSON format
        const jsonData = JSON.stringify(data);
      
        // Define the request options
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Include the token in the Authorization header if needed
            'Authorization': `Bearer ${token}`
          },
          body: jsonData
        };
      
        // Make the POST request to your server
        fetch('http://10.50.10.252:5000/add_stock_WL', requestOptions)
        .then(response => {
          if (response.ok) {
              // If the response is OK, parse the JSON and reload the page
              return response.json().then(data => {
                  console.log('Success:', data);
                  window.location.reload();
              });
          } else {
              // If the response is not OK, throw an error to be caught by the catch block
              alert("Stock already exist in this watchlist")
              throw new Error('Network response was not ok');
          }
      })
      .catch(error => {
          console.error('Error:', error);
          
          // Handle the error appropriately
      });
      };
      
 
    return (
      <div>
       <div className='input'>
        <input id='inputSearch'
          type="text"
          placeholder="Search..."
          value={inputValue}
          onChange={handleInputChange}
          name="inputSearch"
         
        />
        <label className='circle'  htmlFor="inputSearch">
           <FaSearch  />
        </label>
        </div>
        {inputValue.length >  0 && (
          <ul className='Lists'>
            {filteredSuggestions.map((suggestion, index) => (
              <li key={index} id='stocks'>{suggestion} <button className='btn' onClick={() => Addstocks(suggestion, userid,currentPage)}>+</button></li>
            ))}
          </ul>
        )}
      </div>
    );
}
 
export default SearchBox;