import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
export const Navbar = () => {
  return (
    <div className='nav'>
        <div className="logo">
            TradeX
        </div>
        <ul>
            <li><Link to="/" style={{textDecoration:"none",color:"black"}}>Home</Link></li>
            <li><Link to="about" style={{textDecoration:"none",color:"black"}}>About</Link></li>
            <li><Link to="portfolio" style={{textDecoration:"none",color:"black"}}>PortFolio</Link></li>
            <li ><Link to="contact" style={{textDecoration:"none",color:"black"}}>contact</Link></li>
        </ul>
    </div>
  )
}
