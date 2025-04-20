import './BookDetails.css';
import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import apiClient from "../axios/axiosConfig";
import { auth } from "../firebase/firebase";
import ReadingListCheckbox from "../components/ReadingListCheckbox";

const BookDetails = () => {
    const location = useLocation();
    const { book } = location.state || {};
    const navigate = useNavigate();
    const [error, setError] = useState('')

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
            <ReadingListCheckbox book={book}/>
            <button onClick={() => navigate('/search')}>Go Back to Search</button>
        </div>
    );
};

export default BookDetails;
