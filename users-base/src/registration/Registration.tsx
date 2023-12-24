import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../app/App";
import Form from "../form";
import { useState } from "react";

interface IRegistration {
  setActiveComponent: (value: string) => void;
}

const Registration = ({setActiveComponent}: IRegistration) => {
  const [registrationMessage, setRegistrationMessage] = useState("");

  const registrationButton = async (value: {
    email: string;
    password: string;
    name: string;
  }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );

      if (userCredential.user) {
        const userUid = userCredential.user.uid;

        const userDocRef = doc(collection(db, "users-base"), userUid);

        await setDoc(userDocRef, {
          email: value.email,
          name: value.name,
        });

        setRegistrationMessage("New user added to Firestore!");
      }
    } catch (error) {
      console.error("Error adding new user:", error);
    }
  };

  return (
    <Form
      title="Registration"
      emailInput={true}
      nameInput={true}
      passwordInput={true}
      buttonText="Sign up"
      alternativeText="Already have an account?"
      alternativeLinkText="Login"
      handleSubmit={registrationButton}
      setActiveComponent={setActiveComponent}
      activeComponent="Authentication"
      message={registrationMessage}
    />
  );
};

export default Registration;
