// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Registration from "../registration";
import Authentication from "../authentication";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import Base from "../base";
import firebase from "firebase/compat/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import ResetPassword from "../reset-password";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBim7UV1IgbZNIPIUxW6o6OIB5YL2gu4vY",
  authDomain: "users-base-e4174.firebaseapp.com",
  projectId: "users-base-e4174",
  storageBucket: "users-base-e4174.appspot.com",
  messagingSenderId: "248062882333",
  appId: "1:248062882333:web:fefbd30b21db9664268cf4",
  measurementId: "G-VS6JY591VC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
// const storage = getStorage(app);

// const imageRef = ref(storage, "unchecked.svg");

// const addCheckbox = () => {
//   getDownloadURL(imageRef)
//     .then(async (url) => {
//       const userCollectionRef = collection(db, "users-base");

//       const querySnapshot = await getDocs(userCollectionRef);

//       querySnapshot.forEach(async (snapshot) => {
//         const userDocRef = doc(db, "users-base", snapshot.id);
//         await updateDoc(userDocRef, {
//           checkbox: url,
//         });
//       });
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// addCheckbox();

const App = () => {
  // const [isRegistrationActive, setIsRegistrationActive] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [activeComponent, setActiveComponent] = useState("Registration");

  return (
    <>
      {isAuthenticated ? (
        <Base userName={userName} setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <>
          {isRegistrationActive ? (
            <Registration
              setIsRegistrationActive={setIsRegistrationActive}
              isRegistrationActive={isRegistrationActive}
            />
          ) : (
            <Authentication
              setIsAuthenticated={setIsAuthenticated}
              setUserName={setUserName}
              setIsRegistrationActive={setIsRegistrationActive}
              isRegistrationActive={isRegistrationActive}
            />
          )}
        </>
      )}
      <ResetPassword />
    </>
  );
};

export default App;
