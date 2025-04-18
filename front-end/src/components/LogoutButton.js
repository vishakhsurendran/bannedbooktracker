import React from 'react';
import { getAuth, signOut } from "firebase/auth";
import "./LogoutButton.css"

function LogoutButton({ onLogout }) {

    //retrieve current auth state
    const auth = getAuth();

    const handleLogout = async () => {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("Error signing out:", error);
        // Handle the error, e.g., display an error message to the user
      }
    };

    return (
        <button onClick={handleLogout} className="logout-button">LOGOUT</button>);
    }

    export default LogoutButton;