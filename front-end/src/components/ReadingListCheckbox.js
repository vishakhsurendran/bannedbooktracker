import React, {useEffect, useState} from 'react';
import apiClient from "../axios/axiosConfig";
import { auth } from "../firebase/firebase";

function ReadingListCheckbox({book}) {

    const [checkbox, setCheckbox] = useState(false);
    const [error, setError] = useState('')

    useEffect(() => {
        const handleCheckboxInitial = () => {
            const uid = auth.currentUser.uid;
            const response = apiClient.post('/user/get_reading_list/', {
                user_id: uid
                }).then(response =>{
                    if (JSON.stringify(response).includes("\"id\":" + book.book_id)) {
                    setCheckbox(true);
                }
                }).catch(err =>{
                    console.log(err);
                })
        }; handleCheckboxInitial()
    }, []);

     const handleCheckboxChange = async () => {
        if (!checkbox) {
            try {
                const token = await auth.currentUser.getIdToken();
                const response = await apiClient.post('/user/add_reading_list/', {
                    token: token,
                    book_id: book.book_id,
                    is_read: false
                });
            }
            catch (err) {
                setError('Error adding to reading list.');
                console.log(error);
            }
        }
        else if (checkbox) {
            try {
                const token = await auth.currentUser.getIdToken();
                const response = await apiClient.post('/user/remove_reading_list/', {
                    token: token,
                    book_id: book.book_id,
                });
                console.log(response);
            }
            catch (err) {
                setError('Error removing from reading list.');
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
             {checkbox ? 'Added to Reading List' : 'Add to Reading List'}
         </label>)
}

export default ReadingListCheckbox