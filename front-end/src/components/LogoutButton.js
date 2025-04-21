import React from 'react';
import { getAuth } from "firebase/auth";
import { doSignOut } from "../firebase/auth";
import "./LogoutButton.css"

function LogoutButton({ onLogout }) {

    //retrieve current auth state
    const auth = getAuth();

    //sign out on click
    const handleLogout = async () => {
      try {
        await doSignOut();
      } catch (error) {
        console.error("Error signing out:", error);
      }
    };

    return (
        <button onClick={handleLogout} className="logout-button">LOGOUT</button>);
    }

    export default LogoutButton;