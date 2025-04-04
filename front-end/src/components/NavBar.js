/*
import { Link } from 'react-router-dom';


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
          <Link to="/" style={{ textDecoration: 'none' }}>HOME</Link>
        </li>
        <li className="navbar-link">
          <Link to="/mybooks" style={{ textDecoration: 'none' }}>MY BOOKS</Link>
        </li>
        <li className="navbar-link">
          <Link to="/browse" style={{ textDecoration: 'none' }}>BROWSE</Link>
        </li>
      </ul>
    </nav>
      <hr />
          </div>
  );
}

export default NavBar;*/
import React from 'react';
import "./NavBar.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import book_icon from "../pictures/book_icon.png";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function NavBar() {
  return (

    /*<Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img
          src={book_icon}
          alt="book icon"
          className="logo"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse >
          <Nav >
            <Nav.Link href="#home">HOME</Nav.Link>
            <Nav.Link href="#link">MY BOOKS</Nav.Link>
            <NavDropdown title="Dropdown" >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>*/

      <Navbar className="navbar">
        <Navbar.Brand href="#home">
          <img
          src={book_icon}
          alt="book icon"
          className="logo"/>
        </Navbar.Brand>
        <Nav.Link href="#home" className="navbar-link">HOME</Nav.Link>
        <Nav.Link href="#mybooks" className="navbar-link">MY BOOKS</Nav.Link>
        <NavDropdown title="BROWSE" className="navbar-link">
              <NavDropdown.Item href="#action/3.1">GENRE 1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                GENRE 2
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">GENRE 3</NavDropdown.Item>
        </NavDropdown>
          <Form inline>
            <Form.Control
              type="text"
              placeholder="Search"
              className="navbar-search"
            />
      </Form>
      </Navbar>

  );
}

export default NavBar;