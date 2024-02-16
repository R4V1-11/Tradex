import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInForm from './Pages/Signup';
import LoginForm from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Portfolio from "./Components/Portfolio";
import About from "./Components/About";
import Watchlist1 from './Components/Watchlist1';
import Watchlist2 from './Components/Watchlist2';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<LoginForm />} />
          <Route path="/signup" exact element={<SignInForm />} />
          <Route path="/dash" exact element={<Dashboard />} />
          <Route path="/WL1" exact element={<Watchlist1 />} />
          <Route path="/WL2" exact element={<Watchlist2 />}  />
          <Route path="/portfolio" exact element={<Portfolio />} />
          <Route path="/about" exact element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
