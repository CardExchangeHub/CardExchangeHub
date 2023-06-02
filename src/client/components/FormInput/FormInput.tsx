import React, { InputHTMLAttributes, forwardRef } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  const { name, label, placeholder, type, onChange, ...rest } = props;

  return (
    <div>
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
  );
});

export default FormInput;

// used forward ref to focus the input field on the login page - Jeff
// const FormInput: React.FC<FormInputProps> = ({
//   name,
//   label,
//   placeholder,
//   type,
//   onChange,
//   ...rest
// }) => {
//   return (
//     <div>
//       <input
//         id={name}
//         name={name}
//         type={type}
//         placeholder={placeholder}
//         onChange={onChange}
//         {...rest}
//       />
//       <label htmlFor={name}>{label}</label>
//     </div>
//   );
// };

// export default FormInput;
