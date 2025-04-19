import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchPage.css';
import apiClient from "../axios/axiosConfig";

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!query.trim()) {
            setError('Please enter a search term.');
            return;
        }
        setError('');
        try {
            const response = await apiClient.post('http://127.0.0.1:8000/books/title/', { title: query });
            setResults(response.data);
        } catch (err) {
            setError('Error fetching search results.');
            console.error('Search Error:', err.response?.data || err.message);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a book by title"
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p className="error-message">{error}</p>}
            <div className="results">
                <h2>Results</h2>
                {results.length > 0 ? (
                    results.map((book, index) => (
                        <div key={index} className="result-item">
                            <Link
                                to={{
                                    pathname: `/book-details`,
                                }}
                                state={{
                                    book: {
                                        title: book.title,
                                        author: book.author,
                                        type_of_ban: book.type_of_ban,
                                        state: book.state,
                                        district: book.district,
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
        </div>
    );
};

export default SearchPage;
