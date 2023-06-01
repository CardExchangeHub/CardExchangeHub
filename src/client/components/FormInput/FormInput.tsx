import React, { InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  placeholder: string;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  placeholder,
  type,
  onChange,
  ...rest
}) => {
  return (
    <div className="p-1 bg-white rounded-xl my-2">
      <div className="">
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          {...rest}
        />
      </div>
    </div>
  );
};

export default FormInput;
