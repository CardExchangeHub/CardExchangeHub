import React, { useState } from 'react';
import FormInput from '../FormInput/FormInput';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectAuth,
  selectAuthModal,
  registerUser,
  toggleAuthModal,
} from '../../features/Auth/authSlice';
export interface UserInfo {
  email: string;
  password: string;
}

const Register = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const modalState = useAppSelector(selectAuthModal);
  const [user, setUser] = useState({ name: '', email: '', password: '' });

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser(user));
  };

  return (
    <>
      {modalState && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg p-8">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => dispatch(toggleAuthModal())}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <form onSubmit={handleSubmit}>
              <h2 className="text-lg mb-4 text-gray-800">Create an account</h2>
              <FormInput
                label="Name"
                name="name"
                onChange={handleChange}
                type="text"
                placeholder="name"
                value={user.name}
              />
              <FormInput
                label="Email"
                value={user.email}
                onChange={handleChange}
                placeholder="email@email.com"
                name="email"
                type="text"
              />
              <FormInput
                label="Password"
                value={user.password}
                onChange={handleChange}
                placeholder="********"
                name="password"
                type="password"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4 hover:bg-blue-600"
              >
                {auth.loginStatus === 'pending' ? 'Submitting...' : 'Submit'}
              </button>
              {auth.loginStatus === 'failed' && <p>{auth.loginError}</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
