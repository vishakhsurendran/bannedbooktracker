import React, {useEffect, useState} from 'react';
import './Accounts.css';
import { useAuth } from "../contexts/authContext";
import {Navigate} from "react-router";
import LogoutButton from "../components/LogoutButton";
import apiClient from "../axios/axiosConfig";
import { auth} from "../firebase/firebase";

const Accounts = () => {

    const { userLoggedIn } = useAuth();

    const [userInfo, setUserInfo] = useState([]);
    const [error, setError] = useState('');
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [readCount, setReadCount] = useState(0);

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

    useEffect(() => {
    const fetchReadCount = async () => {
        try {
            const response = await apiClient.post('/user/get_read_count/', {
                user_id: auth.currentUser.uid,
            });
            setReadCount(response.data);
        }
        catch (err) {
            setError(err);
        }
    };
    fetchReadCount();
    }, []);


    const handleSave = async() => {
        try {
            if (name !== userInfo.name) {
                await apiClient.post('/user/change_user_name/', {
                    token: auth.currentUser.stsTokenManager.accessToken,
                    name: name,
                })
            }
            if (location !== userInfo.location) {
                await apiClient.post('/user/change_location/', {
                    token: auth.currentUser.stsTokenManager.accessToken,
                    location: location,
                })
            }
            const response = await apiClient.post('/user/get_user/', {
                user_id: auth.currentUser.uid
            });
            setUserInfo(response.data);
            setEditing(false);
        }
        catch (err) {
            setError(err.message);
        }
    };

  return (
      <div>
          {!userLoggedIn && (<Navigate to='/login' replace={true} />)}
        <div className="accounts-page">
          <div className="user-details">
            <div className="user-field">
              <label>Name:</label>
                {editing ? (
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                ) : (
                    <div className="field-input">{userInfo.name}</div>
                    )}
                </div>
                <div className="user-field">
                  <label>Location:</label>
                    {editing ? (
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            />
                    ) : (
                        <div className="field-input">{userInfo.location}</div>
                    )}
                </div>
                <div className="user-field">
                  <label>Email:</label>
                  <div className="field-input">Email is hidden</div>
                </div>
              </div>
              <div className="book-stats">
                <p>Number of Banned Books Read: {readCount}</p>
                <p>Currently Reading: [Book Title and Author]</p>
              </div>
            {editing ? (
                <button onClick={handleSave}>Save</button>
            ) : (
                <button onClick={() => setEditing(true)}>Edit</button>
            )}
                </div>
                <LogoutButton/>
      </div>
  );
};

export default Accounts;
