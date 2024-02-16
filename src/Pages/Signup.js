import React, { Component } from "react";
import { Link } from "react-router-dom";

class SignInForm extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      username: "",
      name: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleChange(event) {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  async handleSignup(event) {
    //signup logic here
    //const loginEndpoint = "http://127.0.0.1:5000/register_user";
    event.preventDefault();

    const { email, username, name, password } = this.state;

    // Your Flask backend endpoint for user registration
    const signupEndpoint = "http://127.0.0.1:5000/register_user";

    try {
      const response = await fetch(signupEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: username,
          name: name,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User registration successful:", data);
        // You can update the state or perform other actions upon successful registration
      } else {
        const errorData = await response.json();
        console.error("User registration failed:", errorData.message);
        // Handle registration failure, show error message, etc.
      }
    } catch (error) {
      console.error("An error occurred during user registration:", error);
      // Handle network errors or other issues
    }
    console.log("The form was submitted with the following data:");
    console.log(this.state);
  }

  render() {
    return (
      <div className="formContainer">
      <h1>SIGN UP</h1>
        <form className="formFields" onSubmit={this.handleSignup}>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="email">
              E-Mail Address
            </label>
            <input
              type="email"
              id="email"
              className="formFieldInput"
              placeholder="Enter your email"
              name="email"
              required value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

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
            <label className="formFieldLabel" htmlFor="email">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="formFieldInput"
              placeholder="Enter your name"
              name="name"
              required value={this.state.name}
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
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>

          <div className="formField">
            <button className="formFieldButton">Sign Up</button>{" "}
            <Link to="/" className="formFieldLink">
              Already a user?
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default SignInForm; 