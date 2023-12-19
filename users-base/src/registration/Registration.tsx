import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../app/App";
import Form from "../form";

const Registration = ({ setIsRegistrationActive, isRegistrationActive }) => {
  const registrationButton = async (value) => {
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

        console.log("New user added to Firestore!");
      }
    } catch (error) {
      console.error("Error adding new user:", error);
    }
  };

  return (
    <Form
      setIsRegistrationActive={setIsRegistrationActive}
      isRegistrationActive={isRegistrationActive}
      title="Registration"
      emailInput={true}
      nameInput={true}
      passwordInput={true}
      buttonText="Sign up"
      alternativeText="Already have an account?"
      alternativeLink="../authentication"
      alternativeLinkText=" Login"
      handleSubmit={registrationButton}
    />
  );
};

export default Registration;
