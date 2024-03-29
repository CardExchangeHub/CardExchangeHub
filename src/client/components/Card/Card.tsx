import React, { forwardRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  CardForSale,
  toggleSearchModalView,
  clearCardsListBySearch,
  setCardToSell,
  CardFromSearch,
} from '../../features/CardsList/cardsSlice';
import {
  addToCart,
  removeFromCart,
  decreaseCart,
} from '../../features/Cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

interface CardProps {
  card: CardForSale | CardFromSearch;
}

const CardComponent = forwardRef<HTMLDivElement, CardProps>(({ card }, ref) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { cardId, image, marketPrice } = card;

  const handleAddToCart = (card) => {
    dispatch(addToCart(card));
    navigate('/cart');
  };

  const handleAddToSell = (card) => {
    dispatch(clearCardsListBySearch());
    dispatch(toggleSearchModalView());
    dispatch(setCardToSell(card));
  };

  const cardBody = (
    <div className="cards-container">
      <h2></h2>
      <img className="w-60 rounded-2xl" src={image} alt="cards" />
      <p className="m-2 opacity-50">
        Quality: {'condition' in card && card.condition}
      </p>
      <p className="m-2 font-bold opacity-40">
        Market Price:{' '}
        {(marketPrice !== null && `  $${marketPrice}`) || 'Not Available'}
      </p>
      {'seller' in card && (
        <p className="m-2 opacity-50">Seller Price: ${card.seller}</p>
      )}

      {(pathname === '/cart' && (
        <div className="flex flex-col items-center">
          <p className="opacity-50">
            Quantity: x {'cartQuantity' in card && card.cartQuantity}
          </p>
          <button
            className="clear-btn"
            onClick={() => dispatch(removeFromCart(card))}
          >
            Remove
          </button>
        </div>
      )) ||
        (pathname === '/' && (
          <button
            className="add-cart-btn"
            onClick={() => handleAddToCart(card)}
          >
            Add to Cart
          </button>
        )) ||
        ('seller' in card && !card.seller && (
          <button
            className="add-cart-btn"
            onClick={() => handleAddToSell(card)}
          >
            Add Card to Sell
          </button>
        )) || (
          <button
            className="add-cart-btn"
            onClick={() => handleAddToCart(card)}
          >
            Edit Card Listing
          </button>
        )}
    </div>
  );

  return ref ? <div ref={ref}>{cardBody}</div> : <div>{cardBody}</div>;
});

export default CardComponent;
