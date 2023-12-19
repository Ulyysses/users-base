import Form from "../form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../app/App";

const formatLastLoginDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    day: "numeric",
    month: "short",
    year: "numeric"
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(date);
};

const Authentication = ({ setIsRegistrationActive, isRegistrationActive }) => {
  const authenticationButton = async (value) => {
    try {
      console.log("Email:", value.email);
      console.log("Password:", value.password);

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
      console.log("Document path:", userDocRef.path);

      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        await updateDoc(userDocRef, {
          lastlogin: formatLastLoginDate(new Date()),
          status: 'active'
        });

        console.log("Sign in");
      } else {
        console.error("User document not found");
      }
    } catch (error) {
      console.error("Error signing in user:", error);
    }
  };

  return (
    <Form
      setIsRegistrationActive={setIsRegistrationActive}
      isRegistrationActive={isRegistrationActive}
      title="Login"
      emailInput={true}
      passwordInput={true}
      buttonText="Sign in"
      alternativeText="Don't have an account yet?"
      alternativeLink="../registration"
      alternativeLinkText=" Registration"
      handleSubmit={authenticationButton}
    />
  );
};

export default Authentication;
