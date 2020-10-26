import React from 'react';
import { Link } from "react-router-dom";


//style
import './../App.css';


export default function Nav() {
  return (
  <nav>
      <div className="logo">
          <Link to="/">
              Logo
          </Link>
      </div>
      <ul className="router">
          <li>
              <Link to="/">Home</Link>
          </li>
          <li>
              <Link to="/Movies">Movies</Link>
          </li>
          <li>
              <Link to="/Sorting">Sorting</Link>
          </li>
          <li>
              <Link to="/Search">Search</Link>
          </li>
      </ul>
  </nav>
  )
}