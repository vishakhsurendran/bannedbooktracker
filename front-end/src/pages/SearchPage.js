import React from 'react';
import { Link } from 'react-router-dom';
import './SearchPage.css';

const SearchPage = () => {
  return (
    <div className="search-page">
      <h1 className="search-title">Search</h1>
      <div className="search-bar">
        <input type="text" placeholder="Search by Title, Author, or ISBN" />
        <button>Search</button>
      </div>
      <div className="results">
        <h2>Results</h2>
        <div className="result-item">
          <Link to="/book-details" className="result-link">
            Book Title and Author (Click to View Details Page)
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
