import React, {useEffect, useState} from 'react';
import apiClient from "../axios/axiosConfig";
import { auth } from "../firebase/firebase";
import {useAuth} from "../contexts/authContext";

function ReadCheckbox({book}) {

    const [checkbox, setCheckbox] = useState(false);
    const [error, setError] = useState('')

    //get logged in status
    const { userLoggedIn } = useAuth();

    //if book is read, mark checkbox automatically
    useEffect(() => {
        const handleCheckboxInitial = () => {
            if (userLoggedIn) {
                const uid = auth.currentUser.uid;
                const response = apiClient.post('/user/get_reading_list/', {
                    user_id: uid
                }).then(response => {
                    for (let i = 0; i < response.data.length; i++) {
                        //if returned array item contains book id and "true", item has been read
                        if (JSON.stringify(response.data[i]).includes("\"id\":" + book.book_id) && JSON.stringify(response.data[i]).includes("true")) {
                            setCheckbox(true);
                        }
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        }; handleCheckboxInitial()
    }, []);

    const handleCheckboxChange = async () => {
        //if checkbox is not checked, call api and set to read upon click
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
        //if checkbox is checked, call api and set to unread upon click
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

    //only return component if user logged in
    if (userLoggedIn){
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

}

export default ReadCheckbox