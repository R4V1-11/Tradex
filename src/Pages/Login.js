import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import   './Login.css';
const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [emailError, setEmailError] = useState("");
 
  const navigate = useNavigate();
 
  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    
    if (name === 'email') {
      if (validateEmail(value)) {
        setFormData({ ...formData, [name]: value });
        setEmailError(""); // Clear the error message if the email is valid
      } else {
        setEmailError("Please enter a valid email address.");
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }  
  };
  const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(String(email).toLowerCase());}
 
  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = formData;
 
    const loginEndpoint = "http://127.0.0.1:5000/login";
 
    try {
      const response = await fetch(loginEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email, // Assuming username is the email
          password: password,
        }),
      });
 
      if (response.ok && emailError === "" ) {
        const data = await response.json();
        console.log("Login successful:", data);
        localStorage.setItem('user', JSON.stringify(data));
        // Use navigate instead of history.push
       
        navigate("/dash");
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData.error);
        // Handle login failure, show error message, etc.
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      // Handle network errors or other issues
    }
 
    if(emailError === ""){
    console.log("The form was submitted with the following data:");
    console.log(formData);}
    else{
      console.log("The form was not sent.")
    }
  };
 
 
  return (
    <div className="login-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">LOGIN</h1>
          <form className="form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email" style={{color: 'azure'}}>Email</label>
              <input
                type="email"
                id="email"
                className="formFieldInput"style={{color:"azure"}}
                placeholder="Enter your email"
                name="email"
                required
                onChange={handleChange}
              />
              {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="password" style={{color: 'azure'}}>Password</label>
              <input
                type="password"
                id="password"
                className="formFieldInput" style={{color:"azure"}}
                placeholder="Enter your password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                LOGIN
              </button>{" "}
              <Link to="/signup" className="btn btn-link">
                New User?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
 
export default LoginForm;