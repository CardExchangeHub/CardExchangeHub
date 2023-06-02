import React, { forwardRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '../../features/CardsList/cardsSlice';
import {
  addToCart,
  removeFromCart,
  decreaseCart,
} from '../../features/Cart/cartSlice';
import { useAppDispatch } from '../../app/hooks';

interface CardProps {
  card: Card;
}

const CardComponent = forwardRef<HTMLDivElement, CardProps>(({ card }, ref) => {
  const { id, image, quality, marketPrice, sellerPrice, cartQuantity } = card;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleAddToCart = (card: Card) => {
    dispatch(addToCart(card));
    navigate('/cart');
  };

  const cardBody = (
    <div className="cards-container">
      <img className="w-60 rounded-2xl" src={image} alt="cards" />
      <p className="m-2 font-light">Quality: {quality}</p>
      <p className="m-2 font-light">Market Price: ${marketPrice}</p>
      <p className="m-2 font-light">Seller Price: ${sellerPrice}</p>
      {(pathname === '/cart' && (
        <div className="flex flex-col items-center">
          <p className="font-light">Quantity: x {cartQuantity}</p>
          <button
            className="clear-btn"
            onClick={() => dispatch(removeFromCart(card))}
          >
            Remove
          </button>

          {/* <p>Item total: {cartQuantity * sellerPrice}</p> */}
        </div>
      )) || (
        <button className="add-cart-btn" onClick={() => handleAddToCart(card)}>
          Add to Cart
        </button>
      )}
    </div>
  );

  return ref ? <div ref={ref}>{cardBody}</div> : <div>{cardBody}</div>;
});

export default CardComponent;
