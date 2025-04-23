import {doSignIn} from "../firebase/auth";
import { auth } from "../firebase/firebase"

//Test that the sign in functionality is working correctly
test('Login functionality is working', async () => {

  await doSignIn("user@gmail.com", "password");
  const uid = auth.currentUser.uid;
  expect(uid).toBe("cj3xnp6jOEgKSItPXn4jKiyTrAu2");

});