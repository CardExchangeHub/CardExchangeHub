// export default Navbar;
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import LogIn from '../../components/LogIn/LogIn';
import Register from '../../components/Register/Register';
import useDebounce from '../../hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectAuth,
  selectAuthModal,
  logoutUser,
  toggleAuthModal,
} from '../../features/Auth/authSlice';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector(selectAuth);
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  // This is handled by redux store - Jeff
  const [isLoading, setLoading] = useState(false);

  const modalState = useAppSelector(selectAuthModal);
  // const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false); // State for sign-up modal

  // // custom debounce search hook to handle dynamic search input query
  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    // This would benefit from going in async thunk in features/cardsSlice, but
    // we will need to figure out how to integrate logic with our current infinite scroll - Jeff
    const fetchData = async () => {
      setLoading(true);
      setCards([]);
      const results = await fetch(
        `/reviews/?search=${debouncedSearch.toLowerCase()}`
      );
      const data = await results.json();
      console.log('data', data);
      setCards(data);
      setLoading(false);
    };
    if (debouncedSearch) fetchData();
  }, [debouncedSearch]);

  const handleSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCards([]);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
    location.reload();
  };

  return (
    <nav className="navbar">
      <Link
        to="/"
        className="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-red-500 via-yellow-300 via-green-400 to-blue-400 "
      >
        Card Xchange Hub
      </Link>
      <div className="flex items-center justify-center flex-grow">
        <SearchBar
          handleSearchQuery={handleSearchQuery}
          searchQuery={searchQuery}
          cards={cards}
        />
      </div>
      <div className="flex items-center space-x-4">
        {auth._id ? (
          <button
            className="text-xl text-gray-400 hover:text-white"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <div>
            <button
              className="text-xl text-gray-400 hover:text-white"
              // Handled with redux dispatch - Jeff
              // onClick={handleLoginClick} // Toggle the login modal state on click
              onClick={() => dispatch(toggleAuthModal())}
            >
              Log In
            </button>
            {/* <button onClick={handleSignUpClick}>Sign Up</button>{' '} */}
          </div>
        )}
        <Link to="/cart" className="text-xl text-gray-400 hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </Link>
      </div>
      {modalState && <LogIn />}
    </nav>
  );
};

export default Navbar;
