import * as firebase from 'firebase-mock';
import apiClient from "../axios/axiosConfig";

test('API adds and removes books to/from reading list', async () => {
const mocksdk = new firebase.MockFirebaseSdk();

// Mock authentication state
mocksdk.auth().changeAuthState({
  uid: 'testuser',
  email: 'test@example.com',
});

// Get the mocked token
mocksdk.auth().getUser('testuser').then((user) => {
  user.getIdToken().then((token) => {
    const response = apiClient.post('/user/add_reading_list/', {
                    token: token,
                    book_id: 2,
                    is_read: false
                });
    expect(response.data.length).toBeGreaterThan(0);

    const response2 = apiClient.post('/user/remove_reading_list/', {
                    token: token,
                    book_id: book.book_id,
                });

    expect(response.data.length).toBe(0);
  });
});
});