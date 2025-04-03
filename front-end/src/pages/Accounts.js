import React from 'react';
import './Accounts.css';

const Accounts = () => {
  return (
    <div className="accounts-page">
      <div className="profile-picture">Profile Picture</div>
      <div className="user-details">
        <div className="user-field">
          <label>Name:</label>
          <div className="field-input">Name</div>
        </div>
        <div className="user-field">
          <label>Location:</label>
          <div className="field-input">Location</div>
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
  );
};

export default Accounts;
