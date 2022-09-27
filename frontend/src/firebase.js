import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth,signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut} from "firebase/auth";
import { getFirestore, query,getDocs,collection,where,addDoc,} from "firebase/firestore";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDS_MDwr-euRL2z2k3_MegSTGaimvd9Poo",
    authDomain: "exameasy-2fe2e.firebaseapp.com",
    projectId: "exameasy-2fe2e",
    storageBucket: "exameasy-2fe2e.appspot.com",
    messagingSenderId: "503971528272",
    appId: "1:503971528272:web:115a35bdcfd1b87b391b55",
    measurementId: "G-ZJC9WMHGSF"
  };

const app =initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// Google authentication function
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// signin
const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // signup
  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // send a password reset link to an email address
  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // signout
  const logout = () => {
    signOut(auth);
  };


  export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
  };