import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookDetails.css';

const BookDetails = () => {
    const navigate = useNavigate();
  return (
    <div className="book-details">
      <div className="book-cover">Book Cover</div>
      <div className="book-info">
        <h1>1984</h1>
        <h2>by George Orwell</h2>
        <p><strong>Synopsis:</strong> stuff</p>
        <p><strong>Reason for Ban:</strong> reason</p>
        <p><strong>ISBN #:</strong> 1234567890</p>
      </div>
        <button onClick={() => navigate('/search')}>Go Back to Search</button>
    </div>
  );
};

export default BookDetails;
