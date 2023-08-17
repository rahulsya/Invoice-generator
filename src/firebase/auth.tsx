import firebase_app from "./config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
export const auth = getAuth(firebase_app);

export const signIn = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error: any) {
    return Promise.reject({
      status: error.code,
      message: error.message,
    });
  }
};
