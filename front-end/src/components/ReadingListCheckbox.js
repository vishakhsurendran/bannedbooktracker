import React, {useEffect, useState} from 'react';
import apiClient from "../axios/axiosConfig";
import { auth } from "../firebase/firebase";
import {useAuth} from "../contexts/authContext";

function ReadingListCheckbox({book}) {

    const [checkbox, setCheckbox] = useState(false);
    const [error, setError] = useState('')

    //get user logged in state
    const { userLoggedIn } = useAuth();

    //if book is in reading list, mark checkbox automatically
    useEffect(() => {
        const handleCheckboxInitial = () => {
            if (userLoggedIn) {
                const uid = auth.currentUser.uid;
                const response = apiClient.post('/user/get_reading_list/', {
                    user_id: uid
                }).then(response => {
                    //if returned array contains book id, book is in reading list
                    if (JSON.stringify(response).includes("\"id\":" + book.book_id)) {
                        setCheckbox(true);
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        }; handleCheckboxInitial()
    }, []);

     const handleCheckboxChange = async () => {
         //if checkbox is not checked, call api and add to reading list upon click
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
        //if checkbox is checked, call api and remove book from reading list
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

     //only return component if user logged in
     if (userLoggedIn) {
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

}

export default ReadingListCheckbox