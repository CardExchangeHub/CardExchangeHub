import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import FormInput from '../FormInput/FormInput';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loginUser, selectAuth } from '../../features/Auth/authSlice';

export interface UserInfo {
  email: string;
  password: string;
}

// // This is now handled by redux - Jeff
// export function LoginUser(
//   credentials: UserInfo,
//   updateLoginStatus: (status: boolean) => void
// ) {
//   return fetch('/user/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(credentials),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.message === 'user authenticated') {
//         updateLoginStatus(true);
//         return true;
//       } else {
//         return false;
//       }
//     });
// }

const LogIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector(selectAuth);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // Probably will use redux to manage log in state?

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  console.log('userInfo', userInfo);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const loggedIn = await LoginUser(userInfo, setIsLoggedIn);
    // if (loggedIn) {
    //   // Update login status or navigate to another page
    //   console.log('Logged in successfully');
    // } else {
    //   // Handle failed login, display error message, etc.
    //   console.log('Login failed');
    // }
    dispatch(loginUser(userInfo));
  };
  if (!isOpen) {
    return null; // Return null if the modal is closed
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-20">
      <div className="login">
        <button
          className="absolute p-0.5 top-2 right-2 border-2 border-white rounded-[100px] text-red-500 hover:text-white hover:bg-red-500 focus:outline-none"
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl mb-4 text-white">Log In</h2>
          <FormInput
            label="Email"
            value={userInfo.email}
            onChange={handleChange}
            placeholder="email@email.com"
            name="email"
            type="text"
          />
          <FormInput
            label="Password"
            value={userInfo.password}
            onChange={handleChange}
            placeholder="********"
            name="password"
            type="password"
          />
          <button type="submit" className="add-cart-btn mt-4">
            {auth.loginStatus === 'pending' ? 'Submitting...' : 'Submit'}
          </button>
          {auth.loginStatus === 'failed' ? <p>{auth.loginError}</p> : null}
        </form>
      </div>
    </div>
  );
};

export default LogIn;
