import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../app/App";
import Form from "../form";
import { useState } from "react";

const ResetPassword = () => {
  const [resetMessage, setResetMessage] = useState("");

  const resetPasswordButton = (value: { email: string }) => {
    setResetMessage("");
    return sendPasswordResetEmail(auth, value.email)
      .then(() => {
        setResetMessage("Password reset sent to your email");
        console.log(
          "An email with a link to reset your password has been sent"
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Form
      message={resetMessage}
      title="Reset password"
      emailInput={true}
      buttonText="Send"
      alternativeText="Check your email and "
      alternativeLinkText=" Sign in"
      handleSubmit={resetPasswordButton}
    />
  );
};

export default ResetPassword;
