import React, {useEffect, useState} from 'react';
import './Accounts.css';
import { useAuth } from "../contexts/authContext";
import {Navigate} from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import apiClient from "../axios/axiosConfig";
import { auth} from "../firebase/firebase";

const Accounts = () => {

    const { userLoggedIn } = useAuth();

    const [userInfo, setUserInfo] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
        try {
            const response = await apiClient.post('/user/get_user/', { user_id: auth.currentUser.uid });
            setUserInfo(response.data);
            console.log(response.data);
        } catch (err) {
            setError(err);
        }
        };
        fetchUser()
    }, []);

  return (
      <div>
          {!userLoggedIn && (<Navigate to='/login' replace={true} />)}
    <div className="accounts-page">
      <div className="profile-picture">Profile Picture</div>
      <div className="user-details">
        <div className="user-field">
          <label>Name:</label>
          <div className="field-input">{userInfo.name}</div>
        </div>
        <div className="user-field">
          <label>Location:</label>
          <div className="field-input">{userInfo.location}</div>
        </div>
        <div className="user-field">
          <label>Email:</label>
          <div className="field-input">Email</div>
        </div>
      </div>
      <div className="book-stats">
        <p>Number of Banned Books Read: [#]</p>
        <p>Currently Reading: [Book Title and Author]</p>
      </div>
        </div>
        <LogoutButton/>
      </div>
  );
};

export default Accounts;
