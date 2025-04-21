import React from 'react';
import './Map.css';
import {useNavigate} from "react-router";

const Map = () => {
    const navigate = useNavigate();
  return (
    <div className="map-page">
      <div className="map-box">
        <p>Map</p>
      </div>
      <div className="location-input">
        <h1>UPDATE MY LOCATION</h1>
        <p>Enter your school district to discover what books are banned in your area.</p>
        <label htmlFor="school-district">SCHOOL DISTRICT</label>
        <input
          type="text"
          id="school-district"
          placeholder="Enter your school district"
        />
        <button onClick={() => navigate('/location-result')}>Update</button>
      </div>
    </div>
  );
};

export default Map;

