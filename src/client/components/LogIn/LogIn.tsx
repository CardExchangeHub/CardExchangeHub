import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import FormInput from '../FormInput/FormInput';

interface UserInfo {
  email: string;
  password: string;
}

const loginUser = (
  credentials: UserInfo,
  updateLoginStatus: (status: boolean) => void
): void => {
  fetch('/user/login', {
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
      }
    });
};

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Separate state for isLoggedIn

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginUser(userInfo, setIsLoggedIn);
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h2>Log In With Email</h2>
        <FormInput
          value={email}
          onChange={handleChange}
          label="Email"
          placeholder="email@email.com"
          name="email"
        />
        <FormInput
          value={password}
          onChange={handleChange}
          label="Password"
          placeholder="********"
          name="password"
          type="password"
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
