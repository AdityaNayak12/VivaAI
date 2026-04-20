import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";

export const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const signin = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};
