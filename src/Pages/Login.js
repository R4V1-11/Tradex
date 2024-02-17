import React, { Component } from "react";
import { Link } from "react-router-dom";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleChange(event) {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name =
      target.name
      ;
    this.setState({
      [name]: value
    });
  }
  async handleLogin(event) {
    event.preventDefault();
    const { username, password } = this.state;
    // Your Flask backend endpoint for login
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
        // You can update the state or perform other actions upon successful login
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
    console.log(this.state);
    return <Link to ="/WL1" />
  }
  
  render() {
    return (
      <div className="formContainer">
        <h1>LOGIN</h1>
        <form className="formFields" onSubmit={this.handleLogin}>
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
              required value={this.state.username}
              onChange={this.handleChange}
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
              required value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="formField">
            <button className="formFieldButton">Sign Up</button>{" "}
            <Link to="/signup" className="formFieldLink">
              New User?
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
export default LoginForm;