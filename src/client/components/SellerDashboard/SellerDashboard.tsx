import React, { useState, useEffect } from 'react';
import CardComponent from '../Card/Card';
import CardSaleForm from '../CardSaleForm/CardSaleForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchCardBySearch,
  fetchSellerCards,
  toggleSearchModalView,
  selectStatus,
  selectError,
  selectSearchModalView,
  selectCardFormModalView,
  selectSellerCards,
  selectCardsBySearch,
  selectCardToSell,
} from '../../features/CardsList/cardsSlice';
import { selectAuth } from '../../features/Auth/authSlice';

const SellerDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedCards = useAppSelector(selectCardsBySearch);
  const sellerCards = useAppSelector(selectSellerCards);
  const searchModalView = useAppSelector(selectSearchModalView);
  const cardFormModalView = useAppSelector(selectCardFormModalView);
  const cardStatus = useAppSelector(selectStatus);
  const cardToSell = useAppSelector(selectCardToSell);
  const { _id } = useAppSelector(selectAuth);
  const error = useAppSelector(selectError);
  const [cardName, setCardName] = useState('');
  const [price, setPrice] = useState(0);
  const [quality, setQuality] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const { signal } = controller;

    if (_id) {
      dispatch(fetchSellerCards({ userId: _id, options: { signal } }));
    }

    return () => controller.abort();
  }, []);

  const handleSearch = (cardName: string) => {
    dispatch(toggleSearchModalView());
    dispatch(fetchCardBySearch(cardName.toLocaleLowerCase()));
    setCardName('');
  };

  const renderLoadingState = () => {
    return cardStatus === 'loading' ? (
      <div role="status">
        <svg
          aria-hidden="true"
          className="w-20 h-20 mt-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-400"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    ) : null;
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="font-bold my-5 text-5xl opacity-30 mt-8">
        What are you looking to sell?
      </h2>
      <div className="flex items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="enter card name"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
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
        <button
          className="add-cart-btn w-40 h-12 ml-4"
          onClick={() => handleSearch(cardName)}
        >
          Search
        </button>
      </div>

      {(searchModalView && (
        <div className="flex inset-0 flex-wrap justify-evenly z-50 bg-opacity-20">
          {selectedCards.map((card, i) => {
            return <CardComponent key={card.cardId} card={card} />;
          })}
          {renderLoadingState()}
          {cardStatus === 'failed' && (
            <div>
              <div className="mt-4 tracking-wdiest opacity-50">{error}</div>
            </div>
          )}
        </div>
      )) ||
        (cardFormModalView && <CardSaleForm />) || (
          <div className="flex flex-col justify-center items-center">
            <div className="flex inset-0 flex-wrap justify-evenly z-50 bg-opacity-20">
              {sellerCards.map((card, i) => {
                return <CardComponent key={card.cardId} card={card} />;
              })}
              {renderLoadingState()}
            </div>
          </div>
        )}
    </div>
  );
};

export default SellerDashboard;
