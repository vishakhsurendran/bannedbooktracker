import React, { useState } from 'react';
import "./Login.css"
import book_icon from "../pictures/book_icon.png"
import { Link, Navigate } from "react-router-dom";
import { doCreateUser } from "../firebase/auth";
import { useAuth } from "../contexts/authContext";

function SignUp() {

        const { userLoggedIn } = useAuth();

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [isRegistering, setIsRegistering] = useState(false);
        const [errorMessage, setErrorMessage] = useState('');

        const handleSubmit = async (e) => {
            e.preventDefault();

            if (password !== confirmPassword) {
                setErrorMessage("Passwords do not match!")
                setIsRegistering(false);
            }
            if(!isRegistering) {
                setIsRegistering(true)
                await doCreateUser(email, password)
            }
        }

        return (
            <div>
            {userLoggedIn && (<Navigate to={'/'} replace={true} />)}
            <div className="login-container">
                <Link to="/">
                    <img
                        src={book_icon}
                        alt="book logo"
                        className="login-form-image" />
                </Link>
                <div>
                    <form className="signup-form" onSubmit={handleSubmit}>
                        <div>
                            <h className="login-form-header">SIGN UP</h>
                            <label className="signup-form-subheader">BANNED BOOK TRACKER</label>
                            <label className="login-form-label" htmlFor="email">EMAIL</label>
                            <input
                                className="login-form-input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                        </div>
                        <div>
                            <div className="login-form-spacer"></div>
                            <label className="login-form-label" htmlFor="password">PASSWORD</label>
                            <input
                                className="login-form-input"
                                disabled={isRegistering}
                                type="password"
                                value={password}
                                onChange={(e) => {setPassword(e.target.value)}}
                                required />
                            <label className="login-form-label" htmlFor="password">CONFIRM PASSWORD</label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='off'
                                required
                                className="login-form-input"
                                value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }}
                                 />
                            {errorMessage && (
                            <span className='errormessage'>{errorMessage}</span>
                        )}
                            <div className="signup-form-spacer"></div>
                        </div>
                        <button className="login-form-black-button" type="submit" disabled={isRegistering}>CREATE ACCOUNT</button>
                    </form>
                    <div className="login-form-div">
                        <label className="login-form-text">ALREADY HAVE AN ACCOUNT?</label>
                        <Link to="/login">
                            <button className="login-form-white-button" type="submit">SIGN IN</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      );
    }

    export default SignUp;