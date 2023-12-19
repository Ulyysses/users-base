// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Table from "../table";
import Registration from "../registration";
import Authentication from "../authentication";
import { getFirestore } from "firebase/firestore";
import { useState } from "react";
import { getAuth } from "firebase/auth";
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
