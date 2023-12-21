import EmailInput from "../inputs/email-input";
import PasswordInput from "../inputs/password-input";
import NameInput from "../inputs/name-input";
import css from "./index.module.css";
import { ChangeEvent, useState } from "react";

interface IForm {
  title: string;
  emailInput?: boolean;
  passwordInput?: boolean;
  nameInput?: boolean;
  buttonText: string;
  alternativeText?: string;
  alternativeLink?: string;
  alternativeLinkText?: string;
  handleSubmit: (value: { email: string; name: string }) => void;
  isRegistrationActive?: boolean;
  setIsRegistrationActive?: (value: boolean) => void;
  message?: string;
  link?: boolean
}

const Form = ({
  title,
  emailInput,
  passwordInput,
  nameInput,
  buttonText,
  alternativeText,
  alternativeLinkText,
  handleSubmit,
  setIsRegistrationActive,
  isRegistrationActive,
  message,
  link
}: IForm) => {
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeValue = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const newValue = {
      ...value,
      [event.target.name]: event.target.value,
    };
    setValue(newValue);
  };

  const changeForm = () => {
    setIsRegistrationActive(!isRegistrationActive);
  };

  return (
    <section className={css.form_wrapper}>
      <form className={css.form}>
        <h2 className={css.title}>{title}</h2>
        {emailInput && <EmailInput changeValue={changeValue} value={value} />}
        {nameInput && <NameInput changeValue={changeValue} value={value} />}
        {passwordInput && (
          <PasswordInput changeValue={changeValue} value={value} />
        )}
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleSubmit(value)}
        >
          {buttonText}
        </button>
      </form>
      <div className={css.alternative}>
        {message && <p className={css.error_message}>{message}</p>}
        <p>
          {alternativeText}
          <button onClick={changeForm} className={css.switching_button}>
            {alternativeLinkText}
          </button>
        </p>
      </div>
    </section>
  );
};

export default Form;
