import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updatePassword } from "firebase/auth";

//contains functions for signing in and out
//created with assistance of tutorial at https://www.youtube.com/watch?v=WpIDez53SK4

export const doCreateUser = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignIn = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const doSignOut = () => {
    return auth.signOut();
};

export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password);
};
