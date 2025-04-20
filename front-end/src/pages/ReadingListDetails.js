import './BookDetails.css';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ReadingListCheckbox from "../components/ReadingListCheckbox";
import ReadCheckbox from "../components/ReadCheckbox";

const ReadingListDetails = () => {
    const location = useLocation();
    const { book } = location.state || {};
    const navigate = useNavigate();

    if (!book) {
        return <p>No book data available.</p>
    }
    return (
        <div>
            <h1>{book.title}</h1>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Type of Ban:</strong> {book.type_of_ban}</p>
            <p><strong>State:</strong> {book.state}</p>
            <p><strong>District:</strong> {book.district}</p>
            <ReadingListCheckbox book={book} />
            <ReadCheckbox book={book} />
            <button onClick={() => navigate('/lists')}>Go Back to Reading List</button>
        </div>
    );
};

export default ReadingListDetails;