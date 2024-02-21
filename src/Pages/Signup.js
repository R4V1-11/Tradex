import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import "../CSS/Signup.css"
 
const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    name: "",
    password: ""
  });
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState("");
 
  const handleChange = (event) => {
    const { target } = event;
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
    return regex.test(String(email).toLowerCase());
  };
 
  const handleSignup = async (event) => {
    event.preventDefault();
    const { email, username, name, password } = formData;
    const signupEndpoint = "http://127.0.0.1:5000/register_user";
 
    try {
      const response = await fetch(signupEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, username, name, password })
      });
 
      if (response.ok && emailError === "") {
        const data = await response.json();
        console.log("User registration successful:", data);
        navigate("/")
        
      } else {
        const errorData = await response.json();
        console.error("User registration failed:", errorData.message);
        
      }
    } catch (error) {
      console.error("An error occurred during user registration:", error);
      
    }
 
    console.log("The form was submitted with the following data:");
    console.log(formData);
  };
 
  return (
    <div className="backImg">
    <div className="container1 mt-4">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h1 className="text-center mb-2">SIGN UP</h1>
        <form className="form" onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="username" style={{color: 'azure'}}>UserName</label>
            <input
              type="text"
              id="username"
              className="formFieldInput"
              style={{color:"azure"}}
              placeholder="Enter your username"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
           <label htmlFor="email" style={{color: 'azure'}}>Email</label>
            <input
            type="email"
            id="email"
            className="formFieldInput"
            style={{color:"azure"}}
            placeholder="Enter your email"
            name="email"
            required
            onChange={handleChange}
           />
           {emailError && <p style={{ color: 'red' }}>{emailError}</p>} {/* Display the error message if there is one */}
          </div>
          <div className="form-group">
            <label htmlFor="name" style={{color: 'azure'}}>Name</label>
            <input
              type="text"
              id="name"
              className="formFieldInput"
              style={{color:"azure"}}
              placeholder="Enter your name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" style={{color: 'azure'}}>Password</label>
            <input
                type="password"
                id="password"
                className="formFieldInput"
                style={{color:"azure"}}
                placeholder="Enter your password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              REGISTER
            </button>{" "}
            <Link to="/" className="btn btn-link">
              Existing User?
            </Link>
          </div>
        </form>
      </div>
    </div>
  </div>
  </div>
 
  
  );
};
 
export default SignUpForm;