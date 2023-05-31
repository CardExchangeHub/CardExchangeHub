import React, { useEffect, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

import DropDown from '../Dropdown.tsx/DropdownSearchBar';
// import SearchListItem from './SearchListItem';
import useDebounce from '../../hooks/useDebounce';

interface DropDownSearchBarProps {
  handleSearchQuery: (e: ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
  cards: any[];
}
const DropDownSearchBar: React.FC<DropDownSearchBarProps> = ({
  handleSearchQuery,
  searchQuery,
  cards,
}) => {
  //   return (
  //     <div className="flex relative mx-auto">
  //       <div>
  //         <DropDown />
  //       </div>

  //       <div>
  //         <div>
  //           <input
  //             type="text"
  //             placeholder="search..."
  //             value={searchQuery}
  //             onChange={(e) => handleSearchQuery(e)}
  //           />
  //           <svg
  //             className="w-4 h-4 absolute left-2.5 top-3.5"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             stroke="currentColor"
  //           >
  //             <path
  //               stroke-linecap="round"
  //               stroke-linejoin="round"
  //               stroke-width="2"
  //               d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
  //             />
  //           </svg>
  //         </div>
  //         <ul className="bg-white border border-gray-100 w-full mt-2 ">
  //           {/* {cards.map((card) => (
  //             <SearchListItem key={card.id} card={card} />
  //           ))} */}
  //         </ul>
  //       </div>
  //     </div>
  //   );
  // };
  return (
    <div className="flex items-center relative mx-auto">
      <div>
        <DropDown />
      </div>

      <div className="flex items-center ml-2">
        <div className="relative">
          <input
            type="text"
            placeholder="search..."
            value={searchQuery}
            onChange={(e) => handleSearchQuery(e)}
            className="pl-8 pr-2 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 text-black" // Added "text-black" class
          />
          <svg
            className="w-4 h-4 absolute left-2.5 top-3.5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DropDownSearchBar;
