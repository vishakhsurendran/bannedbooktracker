import * as firebase from 'firebase-mock';
import apiClient from "../axios/axiosConfig";
import {auth} from "../firebase/firebase";

//Test that the books display the correct details
test('Books display the correct details', async () => {
const mocksdk = new firebase.MockFirebaseSdk();

// Mock authentication state
mocksdk.auth().changeAuthState({
  uid: 'testuser',
  email: 'test@example.com',
});

// Get the mocked token
mocksdk.auth().getUser('testuser').then((user) => {
  user.getIdToken().then(async (token) => {
      await apiClient.post('/user/change_user_name/', {
                    token: token,
                    name: "Test",
                })

      await apiClient.post('/user/change_location/', {
          token: token,
          location: "Georgia",
      })

      const response = await apiClient.post('/user/get_user/', {
                user_id: 'testuser'
            });

      expect(response.data.location).toBe("Georgia");
      expect(response.data.name).toBe("Test");

      await apiClient.post('/user/change_user_name/', {
                    token: token,
                    name: "Name",
                })

      await apiClient.post('/user/change_location/', {
          token: token,
          location: "",
      })
  });
});
});