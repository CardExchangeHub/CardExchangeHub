// export default Navbar;
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Cart } from '../../features/Cart/Cart';
import SearchBar from '../../components/SearchBar/SearchBar';
import useDebounce from '../../hooks/useDebounce';

const Navbar: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  // // custom debounce search hook to handle dynamic search input query
  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
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

  return (
    <nav className="flex items-center justify-between bg-gray-800 text-white p-4">
      <Link to="/" className="text-2xl font-bold">
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
        <Link to="login" className="hover:text-gray-300">
          Log In
        </Link>
        {/* <button className="hover:text-gray-300" onClick={handleCartClick}>
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
            />{' '}
          </svg>
        </button> */}
        {/* {isCartOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Cart />
          <button
            className="absolute top-4 right-4 text-white"
            onClick={handleCartClick}
            aria-label="Close"
          >
            Close
          </button>
        </div>
      )} */}
        <Link to="/cart" className="hover:text-gray-300">
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
    </nav>
  );
};

export default Navbar;
