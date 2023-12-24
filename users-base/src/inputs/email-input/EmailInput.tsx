import { ChangeEvent } from "react";

interface IEmailInputProps {
  value: {
    email: string;
  };
  changeValue: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const EmailInput = ({ value, changeValue }: IEmailInputProps) => {
  return (
    <div className="mb-3 row">
      <label htmlFor="email" className="col-sm-2 col-form-label">
        Email
      </label>
      <div className="col-sm-10">
        <input
          type="text"
          className="form-control"
          id="email"
          name="email"
          value={value.email}
          onChange={changeValue}
        />
      </div>
    </div>
  );
};

export default EmailInput;
