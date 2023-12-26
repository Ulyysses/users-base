import { ChangeEvent } from "react";

interface INameInputProps {
  value: {
    name: string;
  };
  changeValue: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const NameInput = ({ value, changeValue }: INameInputProps) => {
  return (
    <div className="mb-3 row">
      <label htmlFor="name" className="col-sm-2 col-form-label">
        Name
      </label>
      <div className="col-sm-10">
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={value.name}
          onChange={changeValue}
        />
      </div>
    </div>
  );
};

export default NameInput;
