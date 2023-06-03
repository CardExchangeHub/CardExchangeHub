import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import FormInput from '../FormInput/FormInput';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectAuth,
  selectAuthModal,
  toggleAuthModal,
  loginUser,
} from '../../features/Auth/authSlice';
import Register from '../Register/Register';

export interface UserInfo {
  email: string;
  password: string;
}

const LogIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector(selectAuth);
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const userRef = useRef<HTMLInputElement>(null);

  const modalState = useAppSelector(selectAuthModal);
  const [showSignUp, setShowSignUp] = useState(false);

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  // set focus on username input field
  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  // Maybe a better way to handle this? - Jeff
  useEffect(() => {
    if (auth._id) {
      setUserInfo({
        email: '',
        password: '',
      });

      navigate(from, { replace: true });
    }
  }, [auth]);

  const handleRegister = () => {
    setShowSignUp(true); // Show the "Sign Up" component after form submission
  };

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(loginUser(userInfo));
  };

  // possibly refactor to add conditional rendering in the return statement
  if (!modalState) {
    return null;
  }

  return (
    <div>
      {showSignUp ? (
        <Register />
      ) : (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-20">
          <div className="login">
            <button
              // className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              className="absolute p-0.5 top-2 right-2 border-2 border-white rounded-[100px] text-red-500 hover:text-white hover:bg-red-500 focus:outline-none"
              onClick={() => dispatch(toggleAuthModal())}
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
                ref={userRef}
                label=""
                value={userInfo.email}
                onChange={handleChange}
                placeholder="email@email.com"
                name="email"
                type="text"
              />
              <FormInput
                label=""
                value={userInfo.password}
                onChange={handleChange}
                placeholder="********"
                name="password"
                type="password"
              />
              {auth.loginStatus === 'failed' ? (
                <p className="text-red-500 font-bold">{auth.loginError}</p>
              ) : null}
              <button type="submit" className="add-cart-btn mt-3">
                {auth.loginStatus === 'pending' ? 'Submitting...' : 'Submit'}
              </button>
              <div className="mt-4 text-white">
                <Link to="register" className="mb-2 hover:underline">
                  Forgot password?
                </Link>
                <div className="mt-2">
                  <button className="hover:underline" onClick={handleRegister}>
                    Create an account{' '}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogIn;
