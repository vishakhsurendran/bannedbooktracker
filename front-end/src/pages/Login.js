import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css"
import book_icon from "./pictures/book_icon.png"

    function Login() {

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit = (event) => {
            event.preventDefault();
            // Handle login logic here (e.g., API call)
            console.log('Logging in with:', { email, password });
            // After successful login, you might redirect the user or update the UI
        };

        /*let navigate = useNavigate();
        const routeTo = () => {
            let path = "/signup";
            navigate(path);
        }*/

        return (
            <div className="login-container">
                <img
                    src={book_icon}
                    alt="book logo"
                    className="login-form-image" />

                <div>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div>
                            <h className="login-form-header">SIGN IN</h>
                            <label className="login-form-subheader">BANNED BOOK TRACKER</label>
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
                            <label className="login-form-label" htmlFor="password">PASSWORD</label>
                            <input
                                className="login-form-input"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                            <label className="login-form-hyperlink">FORGOT YOUR PASSWORD?</label>
                            <div className="login-form-spacer"></div>
                        </div>
                        <button className="login-form-black-button" type="submit">SIGN IN</button>
                    </form>
                    <div className="login-form-div">
                        <label className="login-form-text">NEW TO BANNED BOOK TRACKER?</label>
                        <button className="login-form-white-button" type="submit">SIGN UP</button>
                    </div>
                </div>
            </div>
      );
    }

    export default Login;