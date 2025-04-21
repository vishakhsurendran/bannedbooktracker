import './BookDetails.css';
import React from 'react';
import {Navigate, useLocation} from 'react-router';
import { useNavigate } from 'react-router';
import ReadingListCheckbox from "../components/ReadingListCheckbox";
import ReadCheckbox from "../components/ReadCheckbox";
import {useAuth} from "../contexts/authContext";

const ReadingListDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    //get logged in state
    const { userLoggedIn } = useAuth();
    //get book info
    const { book } = location.state || {};

    if (!book) {
        return <p>No book data available.</p>
    }

    return (
        <div>
            {!userLoggedIn && (<Navigate to='/accounts' replace={true} />)}
            <h1>{book.title}</h1>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Type of Ban:</strong> {book.type_of_ban}</p>
            <p><strong>State:</strong> {book.state}</p>
            <p><strong>District:</strong> {book.district}</p>
            <ReadingListCheckbox book={book} />
            <div ></div>
            <ReadCheckbox book={book} />
            <div className="login-form-spacer"></div>
            <button onClick={() => navigate('/lists')}>Go Back to Reading List</button>
        </div>
    );
};

export default ReadingListDetails;