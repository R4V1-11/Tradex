import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import SignInForm from './Components/Login2';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          /*<Route path="/demo" exact element={<SignInForm />} />*/
        </Routes>
      </Router>
    </>
  );
}

export default App;
