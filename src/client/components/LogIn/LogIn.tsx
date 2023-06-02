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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg p-8">
            <form onSubmit={handleSubmit}>
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                // Handled by redux dispatch/actions - Jeff
                // onClick={handleClose}
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
              <h2 className="text-lg mb-4 text-gray-800">Log In With Email</h2>
              <FormInput
                ref={userRef}
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
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4 hover:bg-blue-600"
              >
                {auth.loginStatus === 'pending' ? 'Submitting...' : 'Submit'}
              </button>
              <div className="mt-4">
                <Link to="register" className="mb-2 text-black hover:underline">
                  Forgot password?
                </Link>
                <div className="mt-2">
                  <button onClick={handleRegister}>Create an account </button>
                </div>
              </div>
              {auth.loginStatus === 'failed' ? <p>{auth.loginError}</p> : null}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogIn;
