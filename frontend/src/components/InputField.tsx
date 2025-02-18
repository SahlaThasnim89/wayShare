import { InputFieldProps } from '../types/InputFieldTypes'
import React from "react";


const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(({ id, name, label, ...rest }: InputFieldProps, ref) => {
  return (
    <div className="flex flex-col">
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} name={name} ref={ref} {...rest} />
    </div>
  );
});

export default InputField;