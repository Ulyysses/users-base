"use client";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Registration from "../registration";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBim7UV1IgbZNIPIUxW6o6OIB5YL2gu4vY",
  authDomain: "users-base-e4174.firebaseapp.com",
  databaseURL:
    "https://users-base-e4174-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "users-base-e4174",
  storageBucket: "users-base-e4174.appspot.com",
  messagingSenderId: "248062882333",
  appId: "1:248062882333:web:fefbd30b21db9664268cf4",
  measurementId: "G-VS6JY591VC",
};

const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

const App = () => {
  return <Registration />;
};

export default App;
