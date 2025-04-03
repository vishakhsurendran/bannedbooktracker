import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./Login.css"
import { useRef } from "react";
import {firestore} from "../firebase";
import {addDoc, collection} from "@firebase/firestore";
import book_icon from "./pictures/book_icon.png"

export default function Login() {
    const messageRef = useRef();
    const ref = collection(firestore, "messages");

    const handleSave = async (e) => {
        e.preventDefault();
        console.log(messageRef.current.value);

        let data = {
        message:messageRef.current.value,
        }
        try {
            addDoc(ref, data);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <form onSubmit={handleSave}>
                <label>Enter Message</label>
                <input type="text" ref={messageRef} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

    /*function Login() {

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit = (event) => {
            event.preventDefault();
            // Handle login logic here (e.g., API call)
            console.log('Logging in with:', { email, password });
            // After successful login, you might redirect the user or update the UI
        };

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
                            <Link to="/reset">
                                <label className="login-form-hyperlink">FORGOT YOUR PASSWORD?</label>
                            </Link>
                            <div className="login-form-spacer"></div>
                        </div>
                        <button className="login-form-black-button" type="submit">SIGN IN</button>
                    </form>
                    <div className="login-form-div">
                        <label className="login-form-text">NEW TO BANNED BOOK TRACKER?</label>
                        <Link to="/signup">
                            <button className="login-form-white-button" type="submit">SIGN UP</button>
                        </Link>
                    </div>
                </div>
            </div>
      );
    }

    export default Login;*/