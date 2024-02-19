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
import BuyPage from './Components/BuyPage';
import SuccessPage  from './Components/SuccessPage';
 
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<LoginForm />} />
          <Route path="/signup" exact element={<SignInForm />} />
          {/* <Route path="/dash" exact element={<Dashboard />} /> */}
          <Route path="/dash" exact element={<Watchlist1 />} />
          <Route path="/WL2" exact element={<Watchlist2 />}  />
          <Route path="/portfolio" exact element={<Portfolio />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/buyPage" exact element={<BuyPage />} />
          <Route path="/successPage" exact element={<SuccessPage />} />
 
         
 
        </Routes>
      </Router>
    </>
  );
}
 
export default App;