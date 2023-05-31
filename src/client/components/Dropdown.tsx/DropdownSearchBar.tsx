import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Card {
  name: string;
  id: number;
}
const cardsData: Card[] = [
  { name: 'charizard', id: 1 },
  { name: 'blastoise', id: 2 },
  { name: 'venusaur', id: 3 },
];

const DropDown: React.FC = () => {
  const [cards, setCards] = useState<Card[]>(cardsData);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  //   useEffect(() => {
  //     const fetchCards = async () => {
  //       //this will be soemthign else
  //       const res = await fetch('/landlords/cities');
  //       const data = await res.json();
  //       console.log('cards', data);
  //       setCards(data);
  //     };
  //     fetchCards();
  //   }, []);
  // return (
  //   <div>
  //     {cards.map((card) => (
  //       <Link key={card.id} to={`/cards/${card.id}`}>
  //         {card.name}
  //       </Link>
  //     ))}
  //   </div>
  // );

  return (
    <div className="relative inline-block">
      <button
        className="text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
        onClick={handleToggle}
      >
        <span className="mr-1 text-white">Select Card</span>
        <svg
          className={`fill-current h-4 w-4 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{' '}
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute left-0 mt-2 w-40 rounded-md bg-white shadow-lg">
          {cards.map((card) => (
            <li
              key={card.id}
              className="py-1 px-4 hover:bg-gray-100 cursor-pointer"
              onClick={handleToggle}
            >
              <Link to={`/cards/${card.id}`} className="text-gray-800">
                {card.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
