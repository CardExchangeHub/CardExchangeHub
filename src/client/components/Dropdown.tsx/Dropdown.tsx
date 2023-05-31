import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DropDown = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const fetchCards = async () => {
      const res = await fetch('/cards');
      const data = await res.json();
      setCards(data);
    };
    fetchCards();
  }, []);

  return (
    <div className="p-10">
      <div className="dropdown inline-block relative">
        <button className="text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{' '}
          </svg>
        </button>
        <ul className="dropdown-menu absolute hidden pt-1 text-gray-700 w-33 max-h-52 overflow-y-auto">
          {cards.map((card) => {
            return (
              <Link to={`/landlord/reviews/${card}`}>
                <li
                  className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block
                  whitespace-no-wrap"
                >
                  {card}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DropDown;
