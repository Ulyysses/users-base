"use client"

import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../app/page";
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
      title="Reset password"
      emailInput={true}
      buttonText="Send"
      alternativeText="Check your email and "
      alternativeLinkText="Sign in"
      alternativeLink="authentication"
      handleSubmit={resetPasswordButton}
      message={resetMessage}
      setMessage={setResetMessage}
      activeComponent="Authentication"
    />
  );
};

export default ResetPassword;
