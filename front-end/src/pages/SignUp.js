import React, { useState } from 'react';
import "./Login.css"
import book_icon from "../pictures/book_icon.png"
import {Link, Navigate} from "react-router";
import {doCreateUser, handleFirebaseError} from "../firebase/auth";
import { useAuth } from "../contexts/authContext";
import apiClient from "../axios/axiosConfig";
import { auth } from "../firebase/firebase";

function SignUp() {

        const { userLoggedIn } = useAuth();

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [name, setName] = useState('');
        const [location, setLocation] = useState('');
        const [isRegistering, setIsRegistering] = useState(false);
        const [errorMessage, setErrorMessage] = useState('');

        const handleSubmit = async (e) => {
            e.preventDefault();

            //reset error message
            setErrorMessage("");

            if(!isRegistering) {
                try {
                    //check for matching passwords
                    if (password !== confirmPassword) {
                    setErrorMessage("Passwords do not match!")
                    }
                    else {
                        //create new user, checking existing users
                        await doCreateUser(email, password);
                        console.log('Logging in with:', { email, password });

                        //create user tuple in database
                        const token = await auth.currentUser.getIdToken();
                        await apiClient.post('/user/add_user/', {
                        token: token,
                        name: name,
                        location: location
                        })

                        setIsRegistering(true)}
                } catch (err) {
                    setErrorMessage(handleFirebaseError(err.code));
                    console.log(err.code);
                }
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
                            <label className="login-form-label" htmlFor="email">EMAIL <span style={{color: "red"}}>*</span></label>
                            <input
                                className="login-form-input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                        </div>
                        <div>
                            <div className="login-form-spacer"></div>
                            <label className="login-form-label" htmlFor="password">PASSWORD <span style={{color: "red"}}>*</span></label>
                            <input
                                className="login-form-input"
                                type="password"
                                value={password}
                                onChange={(e) => {setPassword(e.target.value)}}
                                required />
                            <label className="login-form-label" htmlFor="password">CONFIRM PASSWORD <span style={{color: "red"}}>*</span></label>
                            <input
                                type="password"
                                autoComplete='off'
                                required
                                className="login-form-input"
                                value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }}
                                 />
                            <div className="login-form-spacer"></div>
                            <label className="login-form-label">NAME <span style={{color: "red"}}>*</span></label>
                        <input
                            className="login-form-input"
                            value={name} onChange={(e) => { setName(e.target.value) }}
                            required />
                    <div>
                        <label className="login-form-label">LOCATION</label>
                        <input
                            className="login-form-input"
                            value={location} onChange={(e) => { setLocation(e.target.value) }}/>
                        <div className="login-form-spacer"></div>
                    </div>
                            {errorMessage && (
                            <span className='errormessage'>{errorMessage}</span>
                        )}
                        </div>
                        <button className="login-form-black-button" type="submit" >CREATE ACCOUNT</button>
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