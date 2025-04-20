import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import apiClient from "../axios/axiosConfig";
import { auth } from "../firebase/firebase";
import './SearchPage.css'

function ReadingList() {
    const [list, setList] = useState([]);
    const [error, setError] = useState('');

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
                console.log(err.code);
            }
        }; initializeList()
    }, []);

    return (
        <div className="results">
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