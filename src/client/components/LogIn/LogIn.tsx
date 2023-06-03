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
              <a href="/oauth/google">
                <div className="mt-4 bg-sky-500 text-gray-100 hover:text-white shadow font-bold text-sm py-3 px-4 rounded-2xl flex justify-start items-center cursor-pointer w-50 bg-blue-500">
                  <svg
                    viewBox="0 0 24 24"
                    className="fill-current mr-3 w-6 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
                  </svg>
                  <span className="border-l border-blue-500 h-6 w-1 block"></span>
                  <span className="pl-3">Sign in with Google</span>
                </div>
              </a>
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
