import React from 'react';
import { Link } from 'react-router-dom';
import './LocationResult.css';

const LocationResult = () => {
  const results = [
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  ];

  return (
    <div className="location-results">
      <h1>Results</h1>
      <div className="results-list">
        {results.map((book) => (
          <div key={book.id} className="result-item">
            <Link
              to={{
                pathname: '/book-details',
                state: book,
              }}
              className="result-link"
            >
              {book.title} by {book.author}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationResult;
