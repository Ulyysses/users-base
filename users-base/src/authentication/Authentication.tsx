"use client"

import Form from "../form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../app/page";
import { formatLastLoginDate } from "../helpers/formateDate";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authUtils";

const Authentication = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { loginUser } = useAuth();

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
        loginUser(userName);
        await updateDoc(userDocRef, {
          lastlogin: formatLastLoginDate(new Date()),
        });
        router.push("base");
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
      alternativeText="Forgot your password? "
      alternativeLinkText="Reset password"
      alternativeLink="reset-password"
      handleSubmit={authenticationButton}
      message={errorMessage}
      setMessage={setErrorMessage}
      activeComponent="Reset password"
      extraLink="Registration"
    />
  );
};

export default Authentication;
