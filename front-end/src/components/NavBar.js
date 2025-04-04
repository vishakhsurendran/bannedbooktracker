import React from 'react';
import { Link } from 'react-router-dom';
import "./NavBar.css";
import book_icon from "../pictures/book_icon.png";

function NavBar() {
  return (
      <div>
    <nav>
      <ul className="navbar" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li>
            <img
                src={book_icon}
                alt="Banned Book Tracker Logo"
                className="logo"/>
        </li>
        <li className="navbar-link">
          <Link to="/">HOME</Link>
        </li>
        <li className="navbar-link">
          <Link to="/mybooks">MY BOOKS</Link>
        </li>
        <li className="navbar-link">
          <Link to="/browse">BROWSE</Link>
        </li>
      </ul>
    </nav>
      <hr />
          </div>
  );
}

export default NavBar;