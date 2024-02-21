import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import   './Login.css';
const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
 
  const navigate = useNavigate();
 
  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
 
    setFormData({
      ...formData,
      [name]: value
    });
  };
 
  const handleLogin = async (event) => {
    event.preventDefault();
    const { username, password } = formData;
 
    const loginEndpoint = "http://127.0.0.1:5000/login";
 
    try {
      const response = await fetch(loginEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username, // Assuming username is the email
          password: password,
        }),
      });
 
      if (response.ok) {
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
 
    console.log("The form was submitted with the following data:");
    console.log(formData);
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
                value={formData.email}
                onChange={handleChange}
              />
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