
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import React from 'react';
import "./NavBar.css";
import Container from 'react-bootstrap/Container';
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import SearchPage from "../pages/SearchPage";
import BookDetails from "../pages/BookDetails";
import Accounts from "../pages/Accounts";
import Map from "../pages/Map";
import LocationResult from "../pages/LocationResult";
import Navbar from 'react-bootstrap/Navbar';

import book_icon from "../pictures/book_icon.png";
import account_icon from "../pictures/account_icon.png";
import message_icon from "../pictures/message_icon.png";
import notif_icon from "../pictures/notif_icon.png";

function NavBar() {
  return (

      <BrowserRouter>
          <Container>
      <Navbar className="navbar">
        <Navbar.Brand href="/">
          <img
          src={book_icon}
          alt="book icon"
          className="logo"/>
        </Navbar.Brand>
        <Link to="/" className="navbar-link">HOME</Link>
        <Link to="/lists" className="navbar-link">LISTS</Link>
          <Link to="/search" className="navbar-link">BROWSE</Link>
          <div className="spacer2"></div>
          <input
              type="search"
              placeholder="Search"
              className="navbar-search"
              style={{height: 30}}
          />
          <div className="spacer"></div>
          <img
                src={notif_icon}
                alt="notification icon"
                className="icon"/>
          <img
                src={message_icon}
                alt="message icon"
                className="icon"/>
          <Link to="/accounts" style={{ alignSelf: "flex-end" }}>
          <img
                src={account_icon}
                alt="account icon"
                className="icon"/>
          </Link>
      </Navbar>
      <Routes>
          <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/reset" element={<ForgotPassword />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/book-details" element={<BookDetails />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/map" element={<Map />} />
              <Route path="/location-result" element={<LocationResult />} />
      </Routes>
              </Container>
      </BrowserRouter>
  );
}

export default NavBar;