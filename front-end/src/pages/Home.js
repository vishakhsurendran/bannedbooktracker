import React, { useState, useEffect } from 'react';
import apiClient from '../axios/axiosConfig';

function Home() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await apiClient.post('/books/state/', {
                    state: 'Florida',
                });
                console.log('Response:', response.data);
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div>
            <h1>Banned Books in Florida</h1>
            <ul>
                {books.length > 0 ? (
                    books.map((book, index) => (
                        <li key={index}>
                            <pre>{JSON.stringify(book, null, 2)}</pre>
                        </li>
                    ))
                ) : (
                    <p>Couldn't get the books...</p>
                )}
            </ul>
        </div>
    );
}

export default Home;