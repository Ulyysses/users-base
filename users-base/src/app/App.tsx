import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Registration from "../registration";
import Authentication from "../authentication";
import { getFirestore } from "firebase/firestore";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import Base from "../base";
import ResetPassword from "../reset-password";

const firebaseConfig = {
  apiKey: "AIzaSyBim7UV1IgbZNIPIUxW6o6OIB5YL2gu4vY",
  authDomain: "users-base-e4174.firebaseapp.com",
  databaseURL: "https://users-base-e4174-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "users-base-e4174",
  storageBucket: "users-base-e4174.appspot.com",
  messagingSenderId: "248062882333",
  appId: "1:248062882333:web:fefbd30b21db9664268cf4",
  measurementId: "G-VS6JY591VC"
};

const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [activeComponent, setActiveComponent] = useState("Registration");

  return (
    <>
      {isAuthenticated ? (
        <Base userName={userName} setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <>
          {activeComponent === "Registration" && (
            <Registration setActiveComponent={setActiveComponent} />
          )}
          {activeComponent === "Authentication" && (
          <Authentication
            setIsAuthenticated={setIsAuthenticated}
            setUserName={setUserName}
            setActiveComponent={setActiveComponent}
          />
          )}
          {activeComponent === "Reset password" && (
          <ResetPassword setActiveComponent={setActiveComponent}/>
          )}
        </>
      )}
    </>
  );
};

export default App;
