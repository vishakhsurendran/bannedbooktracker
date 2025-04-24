import React, { useState } from 'react';
import { Link } from 'react-router';
import './SearchPage.css';
import apiClient from "../axios/axiosConfig";
import { useLocation } from 'react-router';
import { useEffect } from 'react';

const SearchPage = () => {
    const location = useLocation();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchQuery = params.get('query');
        if (searchQuery) {
            setQuery(searchQuery);
            handleSearch(searchQuery);
        }
    }, [location]);

    const handleSearch = async (searchQuery) => {
        if (!searchQuery.trim()) {
            setError('Please enter a search term.');
            return;
        }
        setError('');
        try {
            const response = await apiClient.post('http://127.0.0.1:8000"/books/title/', { title: searchQuery });
            setResults(response.data);
        } catch (err) {
            setError('Error fetching search results.');
            console.error('Search Error:', err.response?.data || err.message);
        }
    };

    return (
        <div>
            <h2>Search Results for "{query}"</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="results">
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
        </div>
    );
};

export default SearchPage;