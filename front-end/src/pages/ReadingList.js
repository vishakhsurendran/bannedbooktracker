import React, {useEffect, useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import apiClient from "../axios/axiosConfig";
import { auth } from "../firebase/firebase";
import './SearchPage.css'
import {useAuth} from "../contexts/authContext";

function ReadingList() {
    const [list, setList] = useState([]);
    const [error, setError] = useState('');

    const { userLoggedIn } = useAuth();

    //use uid to fetch list items for display on screen, if any
    useEffect(() => {
        const initializeList = async () => {
            try {
                const uid = auth.currentUser.uid;
                const response = await apiClient.post('/user/get_reading_list/', {
                    user_id: uid,
                    is_read: true
                });
                setList(response.data);
            } catch (err) {
                setError('Error fetching reading list.');
                console.log(error);
            }
        }; initializeList()
    }, []);

    //print results and pass book data to list-details page
    return (
        <div className="results">
            {!userLoggedIn && (<Navigate to='/accounts' replace={true} />)}
                <h2>Reading List</h2>
                {list.length > 0 ? (
                    list.map((book, index) => (
                        <div key={index} className="result-item">
                            <Link
                                to={{
                                    pathname: `/list-details`,
                                }}
                                state={{
                                    book: {
                                        title: book.title,
                                        author: book.author,
                                        type_of_ban: book.type_of_ban,
                                        state: book.state,
                                        district: book.district,
                                        book_id: book.id,
                                    },
                                }}
                                className="result-link"
                            >
                                {book.title} by {book.author} in {book.state}
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </div>
    )

}

export default ReadingList;