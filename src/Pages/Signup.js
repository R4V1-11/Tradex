import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignInForm = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    username: "",
    name: "",
    password: ""
  });

  const handleChange = (event) => {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    const { email, username, name, password } = state;
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
        navigate("/")
      } else {
        const errorData = await response.json();
        console.error("User registration failed:", errorData.message);
      }
    } catch (error) {
      console.error("An error occurred during user registration:", error);
    }
    console.log("The form was submitted with the following data:");
    console.log(state);
  };

  return (
    <div className="formContainer">
      <h1>SIGN UP</h1>
      <form className="formFields" onSubmit={handleSignup}>
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
            required value={state.email}
            onChange={handleChange}
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
            required value={state.username}
            onChange={handleChange}
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
            required value={state.name}
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
            value={state.password}
            onChange={handleChange}
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
};

export default SignInForm;
