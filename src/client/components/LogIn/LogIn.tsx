import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import FormInput from '../FormInput/FormInput';

export interface UserInfo {
  email: string;
  password: string;
}

export function LoginUser(
  credentials: UserInfo,
  updateLoginStatus: (status: boolean) => void
) {
  return fetch('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === 'user authenticated') {
        updateLoginStatus(true);
        return true;
      } else {
        return false;
      }
    });
}

const LogIn: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Probably will use redux to manage log in state?

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loggedIn = await LoginUser(userInfo, setIsLoggedIn);
    if (loggedIn) {
      // Update login status or navigate to another page
      console.log('Logged in successfully');
    } else {
      // Handle failed login, display error message, etc.
      console.log('Login failed');
    }
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h2>Log In With Email</h2>
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
        <button type="submit">Submit</button>
        <button
          className="text-gray-700 text-sm font-bold hover:underline focus:outline-none"
          type="button"
        >
          Forgot Password?
        </button>
      </form>
    </div>
  );
};

export default LogIn;
