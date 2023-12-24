import { useEffect, useRef } from "react";

interface IIndeterminateCheckbox {
  indeterminate: boolean;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const IndeterminateCheckbox = ({
  indeterminate,
  checked,
  onChange,
}: IIndeterminateCheckbox) => {
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      if (ref.current) {
        ref.current.indeterminate = !checked && indeterminate;
      }
    }
  }, [ref, indeterminate, checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className=" cursor-pointer"
      checked={checked}
      onChange={onChange}
    />
  );
};

export default IndeterminateCheckbox;
