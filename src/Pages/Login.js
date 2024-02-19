import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="formContainer">
      <h1>LOGIN</h1>
      <form className="formFields" onSubmit={handleLogin}>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="text">
            UserName
          </label>
          <input
            type="text"
            id="username"
            className="formFieldInput"
            placeholder="Enter your username"
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="formFieldInput"
            placeholder="Enter your password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="formField">
          <button type="submit" className="formFieldButton">
            Sign Up
          </button>{" "}
          <Link to="/signup" className="formFieldLink">
            New User?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
