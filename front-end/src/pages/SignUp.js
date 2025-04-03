import React, { useState } from 'react';
import "./Login.css"
import book_icon from "./pictures/book_icon.png"
import { Link } from "react-router-dom";

    function SignUp() {
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

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
                    <form className="signup-form">
                        <div>
                            <h className="login-form-header">SIGN UP</h>
                            <label className="login-form-label" htmlFor="name">NAME</label>
                            <input
                                className="login-form-input"
                                type="name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required />
                            <label className="login-form-label" htmlFor="email">EMAIL</label>
                            <input
                                className="login-form-input"
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                        </div>
                        <div>
                            <div className="login-form-spacer"></div>
                            <label className="login-form-label" htmlFor="password">PASSWORD</label>
                            <input
                                className="login-form-input"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                            <label className="login-form-label" htmlFor="password">CONFIRM PASSWORD</label>
                            <input
                                className="login-form-input"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                            <div className="signup-form-spacer"></div>
                        </div>
                        <button className="login-form-black-button" type="submit">CREATE ACCOUNT</button>
                    </form>
                    <div className="login-form-div">
                        <label className="login-form-text">ALREADY HAVE AN ACCOUNT?</label>
                        <Link to="/">
                            <button className="login-form-white-button" type="submit">SIGN IN</button>
                        </Link>
                    </div>
                </div>
            </div>
      );
    }

    export default SignUp;