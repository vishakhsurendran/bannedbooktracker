import React, { useState } from 'react';
import "./Login.css"
import book_icon from "../pictures/book_icon.png";
import { Link } from "react-router-dom";

    function ForgotPassword() {
        const [email, setEmail] = useState('');

        /*const handleSubmit = (event) => {
            event.preventDefault();
            // Handle login logic here (e.g., API call)
            console.log('Logging in with:', { email, password });
            // After successful login, you might redirect the user or update the UI
        };*/

        return (
            <div className="login-container">
                <img
                    src={book_icon}
                    alt="book logo"
                    className="login-form-image" />

                <div>
                    <form className="forgotpassword-form">
                        <div>
                            <h className="login-form-header">FORGOT PASSWORD?</h>
                            <label className="login-form-subheader2">Enter the email associated with your account below. If an account exists with that email, a password reset link will be sent.</label>
                            <label className="login-form-label" htmlFor="email">EMAIL</label>
                            <input
                                className="login-form-input"
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                        </div>
                        <div className="login-form-spacer"></div>
                        <button className="login-form-black-button" type="submit">SEND RESET LINK</button>
                    </form>
                    <div className="login-form-div">
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <label className="login-form-hyperlink">RETURN TO SIGN IN</label>
                        </Link>
                    </div>
                </div>
            </div>
      );
    }

    export default ForgotPassword;