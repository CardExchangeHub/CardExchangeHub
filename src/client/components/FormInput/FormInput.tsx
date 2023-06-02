import React, { InputHTMLAttributes, forwardRef } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  const { name, label, placeholder, type, onChange, ...rest } = props;
  return (
    <div className="p-1 bg-white rounded-xl my-2">
      <div className="">
        {ref ? (
          <input
            ref={ref}
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            {...rest}
            required
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            {...rest}
            required
          />
        )}
        <label htmlFor={name}>{label}</label>
      </div>
    </div>
  );
});

export default FormInput;
