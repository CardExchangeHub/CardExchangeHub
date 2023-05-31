import React, { forwardRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '../../features/CardsList/cardsSlice';
import { addToCart, removeFromCart, decreaseCart } from '../../features/Cart/cartSlice';
import { useAppDispatch } from '../../app/hooks';

interface CardProps {
  card: Card;
}

const CardComponent = forwardRef<HTMLDivElement, CardProps>(({ card }, ref) => {
  const { id, images, quality, marketPrice, sellerPrice, cartQuantity } = card;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleAddToCart = (card: Card) => {
    dispatch(addToCart(card));
    navigate('/cart');
  };

  const cardBody = (
    <div>
      <img src={images.small} alt="cards" />
      <p>Quality: {quality}</p>
      <p>Market Price: ${marketPrice}</p>
      <p>Seller Price: ${sellerPrice}</p>
      {(pathname === '/cart' && (
        <div className="card-cart-components">
          <button onClick={() => dispatch(removeFromCart(card))}>Remove</button>
          <p>Quantity: {cartQuantity}</p>
          <p>Item total: {cartQuantity * sellerPrice}</p>
        </div>
      )) || <button onClick={() => handleAddToCart(card)}>Add to Cart</button>}
    </div>
  );

  return ref ? <div ref={ref}>{cardBody}</div> : <div>{cardBody}</div>;
});

export default CardComponent;
