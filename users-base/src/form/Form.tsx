import EmailInput from "../inputs/email-input";
import PasswordInput from "../inputs/password-input";
import NameInput from "../inputs/name-input";
import css from "./index.module.css";
import { ChangeEvent, useState } from "react";
import Link from "next/link";

interface IForm {
  title: string;
  emailInput?: boolean;
  passwordInput?: boolean;
  nameInput?: boolean;
  buttonText: string;
  alternativeText: string;
  alternativeLinkText: string;
  alternativeLink: string;
  handleSubmit: (value: {
    email: string;
    name: string;
    password: string;
  }) => void;
  message: string;
  setMessage: (value: string) => void;
  setActiveComponent?: (value: string) => void;
  activeComponent: string;
  extraLink?: string;
  autoComplete?: string;
}

const Form = ({
  title,
  emailInput,
  passwordInput,
  nameInput,
  buttonText,
  alternativeText,
  alternativeLinkText,
  alternativeLink,
  handleSubmit,
  message,
  setMessage,
  extraLink,
  autoComplete
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
    setMessage?.("");
  };

  return (
    <section className={css.form_wrapper}>
      <form className={css.form}>
        <h2 className={css.title}>{title}</h2>
        {emailInput && <EmailInput changeValue={changeValue} value={value} />}
        {nameInput && <NameInput changeValue={changeValue} value={value} />}
        {passwordInput && (
          <PasswordInput changeValue={changeValue} value={value} autoComplete={autoComplete}/>
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
          <Link href={alternativeLink} className={css.switching_button}>
            {alternativeLinkText}
          </Link>
        </p>
        {extraLink && <Link href="/" className={css.switching_button}>{extraLink}</Link>}
      </div>
    </section>
  );
};

export default Form;
