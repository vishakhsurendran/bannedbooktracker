import React, { useState, useRef } from 'react';
import {Link, Navigate} from "react-router-dom";
import "./Login.css"
import { doSignIn } from "../firebase/auth";
import book_icon from "../pictures/book_icon.png"
import { useAuth } from "../contexts/authContext";

function AccountCreation() {

    //get logged in status
    const { userLoggedIn } = useAuth();

    //initialize variables
    const [name, setName] = useState('');
    const [location, setLocation] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Set name and location:', { name, location });
    };

    return (
        <div>
        <div className="login-container">
                <img
                    src={book_icon}
                    alt="book logo"
                    className="login-form-image" />
            <div>
                <form onSubmit={handleSubmit} className="accountcreation-form">
                    <div>
                        <h className="login-form-header">ACCOUNT CREATION</h>
                        <label className="login-form-subheader">BANNED BOOK TRACKER</label>
                        <label className="login-form-label">NAME</label>
                        <input
                            className="login-form-input"
                            value={name}
                            required />
                    </div>
                    <div>
                        <label className="login-form-label">LOCATION</label>
                        <input
                            className="login-form-input"
                            value={location}/>
                        <div className="login-form-spacer"></div>
                    </div>
                    {errorMessage && (
                            <span className='errormessage'>{errorMessage}</span>
                        )}
                    <button className="login-form-black-button" type="submit">CREATE ACCOUNT</button>
                </form>
                <div className="login-form-div">
                </div>
            </div>
        </div>
            </div>
  );
}

export default AccountCreation;