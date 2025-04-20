import React, { useState, useRef } from 'react';
import {Link, Navigate} from "react-router-dom";
import "./Login.css"
import { doSignIn, handleFirebaseError } from "../firebase/auth";
import book_icon from "../pictures/book_icon.png"
import { useAuth } from "../contexts/authContext";
import {getAuth} from "firebase/auth";
import { auth } from "../firebase/firebase";

//written in part with help of tutorial at https://www.youtube.com/watch?v=WpIDez53SK4
//and Nitij's react-firebase-auth-boilerplate at https://github.com/Nitij/react-firebase-auth-boilerplate/tree/main
function Login() {

    //get logged in status
    const { userLoggedIn } = useAuth();

    //initialize variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await doSignIn(email, password);
            console.log('Logging in with:', { email, password });
            console.log(auth.currentUser.getIdToken());
            setIsSigningIn(true);
        } catch (err) {
            setErrorMessage(handleFirebaseError(err.code));
            console.log(err.code);
        }
    };

    return (
        <div>
            {userLoggedIn && (<Navigate to='/accounts' replace={true} />)}
        <div className="login-container">
            <Link to="/">
                <img
                    src={book_icon}
                    alt="book logo"
                    className="login-form-image" />
            </Link>
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
                            onChange={(e) => {setEmail(e.target.value)}}
                            required />
                    </div>
                    <div>
                        <label className="login-form-label" htmlFor="password">PASSWORD</label>
                        <input
                            className="login-form-input"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                            required />
                        {errorMessage && (
                            <span className='errormessage'>{errorMessage}</span>
                        )}
                        <Link to="/reset" style={{ textDecoration: 'none' }}>
                            <label className="login-form-hyperlink">FORGOT YOUR PASSWORD?</label>
                        </Link>
                        <div className="login-form-spacer"></div>
                    </div>
                    <button className="login-form-black-button" type="submit">SIGN IN</button>
                </form>
                <div className="login-form-div">
                    <label className="login-form-text">NEW TO BANNED BOOK TRACKER?</label>
                    <Link to="/signup">
                        <button className="login-form-white-button" type="submit" disabled={isSigningIn}>SIGN UP</button>
                    </Link>
                </div>
            </div>
        </div>
            </div>
  );
}

export default Login;