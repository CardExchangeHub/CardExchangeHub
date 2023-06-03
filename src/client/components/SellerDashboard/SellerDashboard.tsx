import React, { useState, useEffect } from 'react';
import CardComponent from '../Card/Card';
import CardSaleForm from '../CardSaleForm/CardSaleForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchCardBySearch,
  fetchSellerCards,
  updateSellerCard,
  sellCard,
  toggleSearchModalView,
  deleteSellerCard,
  selectStatus,
  selectError,
  selectSearchModalView,
  selectCardFormModalView,
  selectSellerCards,
  selectCardsBySearch,
  selectCardToSell,
} from '../../features/CardsList/cardsSlice';
import { selectAuth } from '../../features/Auth/authSlice';
import { render } from '@testing-library/react';

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
    return cardStatus === 'loading' ? <p>Loading...</p> : null;
  };

  return (
    <div>
      {(searchModalView && (
        <div className="flex inset-0 flex-wrap justify-evenly z-50 bg-opacity-20">
          {selectedCards.map((card, i) => {
            return <CardComponent key={card.id} card={card} />;
          })}
          {renderLoadingState()}
          {cardStatus === 'failed' && (
            <div>
              <button onClick={() => dispatch(toggleSearchModalView())}>
                Search Again
              </button>
              <div>{error}</div>
            </div>
          )}
        </div>
      )) ||
        (cardFormModalView && <CardSaleForm />) || (
          <div>
            <input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
            <button onClick={() => handleSearch(cardName)}>Search</button>
            <div className="flex inset-0 flex-wrap justify-evenly z-50 bg-opacity-20">
              {sellerCards.map((card, i) => {
                return <CardComponent key={card.id} card={card} />;
              })}
              {renderLoadingState()}
              {cardStatus === 'failed' && <p>{error}</p>}
            </div>
          </div>
        )}
    </div>
  );
};

export default SellerDashboard;
