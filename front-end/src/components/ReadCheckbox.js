import React, {useEffect, useState} from 'react';
import apiClient from "../axios/axiosConfig";
import { auth } from "../firebase/firebase";

function ReadCheckbox({book}) {

    const [checkbox, setCheckbox] = useState(false);
    const [error, setError] = useState('')

    const handleCheckboxChange = async () => {
        if (!checkbox) {
            try {
                const token = await auth.currentUser.getIdToken();
                const response = await apiClient.post('/user/mark_is_read/', {
                    token: token,
                    book_id: book.book_id,
                });
            }
            catch (err) {
                setError('Error marking read.');
                console.log(error);
            }
        }
        else if (checkbox) {
            try {
                const token = await auth.currentUser.getIdToken();
               const response = await apiClient.post('/user/mark_is_unread/', {
                    token: token,
                    book_id: book.book_id,
                });
                console.log(response);
            }
            catch (err) {
                setError('Error marking unread.');
                console.log(error);
            }
        }
        setCheckbox(!checkbox);
    };

     return (
         <label>
                <input
                    type="checkbox"
                    checked={checkbox}
                    onChange={handleCheckboxChange}
                />
                {checkbox ? 'Read' : 'Unread'}
         </label>
     )
}

export default ReadCheckbox