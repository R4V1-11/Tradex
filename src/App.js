import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInForm from './Components/Signup';
import LoginForm from './Components/Login';
import Navbar from './Components/Login';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<LoginForm />} />
          <Route path="/signup" exact element={<SignInForm />} />
          <Route path="/dash" exact element={<Navbar />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
