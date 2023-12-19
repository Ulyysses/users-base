import classNames from "classnames";
import css from "./index.module.css";
import { ChangeEvent } from "react";

interface IPasswordInputProps {
  value: {
    password: string;
  };
  changeValue: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const PasswordInput = ({ value, changeValue }: IPasswordInputProps) => {
  return (
    <div className="mb-3 row">
      <label htmlFor="password" className="col-sm-2 col-form-label">
        Password
      </label>
      <div className="col-sm-10">
        <input
          type="password"
          className={classNames("form-control")}
          id="password"
          name="password"
          value={value.password}
          onChange={changeValue}
        />
      </div>
    </div>
  );
};

export default PasswordInput;
