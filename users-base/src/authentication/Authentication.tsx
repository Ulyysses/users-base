import Form from "../form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../app/App";
import { formatLastLoginDate } from "../helpers/formateDate";
import { useState } from "react";

interface IAuthentication {
  setIsAuthenticated: (value: boolean) => void;
  setUserName: (value: string) => void;
  setActiveComponent: (value: string) => void;
}

const Authentication = ({
  setIsAuthenticated,
  setUserName,
  setActiveComponent
}: IAuthentication) => {
  const [errorMessage, setErrorMessage] = useState("");

  const authenticationButton = async (value: {
    email: string;
    password: string;
  }) => {
    try {
      setErrorMessage("");
      if (!value.email || !value.password) {
        throw new Error("Email and password are required");
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );

      const user = userCredential.user;
      const userDocRef = doc(db, "users-base", user?.uid);

      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userName = userDoc.data().name;
        await updateDoc(userDocRef, {
          lastlogin: formatLastLoginDate(new Date()),
          status: "Active",
        });
        setIsAuthenticated(true);
        setUserName(userName);

        console.log("Sign in");
      } else {
        console.error("User document not found");
      }
    } catch (error) {
      setErrorMessage("Check your e-mail and password!");
      console.error("Error signing in user:", error);
    }
  };

  return (
    <Form
      title="Login"
      emailInput={true}
      passwordInput={true}
      buttonText="Sign in"
      alternativeText="Forgot your password?"
      alternativeLinkText="Reset password"
      handleSubmit={authenticationButton}
      message={errorMessage}
      setActiveComponent={setActiveComponent}
      activeComponent="Reset password"
    />
  );
};

export default Authentication;
