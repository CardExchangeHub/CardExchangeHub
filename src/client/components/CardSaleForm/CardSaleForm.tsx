import { useState } from 'react';
import { selectCardToSell } from '../../features/CardsList/cardsSlice';
import { selectAuth } from '../../features/Auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { sellCard } from '../../features/CardsList/cardsSlice';
import e from 'express';
const CardSaleForm = () => {
  const { id, image, marketPrice } = useAppSelector(selectCardToSell);
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectAuth)._id;
  const [quantity, setQuantity] = useState(1);
  const [quality, setQuality] = useState('');
  const [sellerPrice, setSellerPrice] = useState(0);

  const handleSale = (e) => {
    e.preventDefault();
    if (userId) {
      dispatch(
        sellCard({
          userId,
          newCard: { id, image, marketPrice, quantity, quality, sellerPrice },
        })
      );
    }
  };

  return (
    <div>
      <img src={image} alt="" />
      <form onSubmit={(e) => handleSale(e)}>
        <p>Card Id: {id}</p>
        <p>Market Price: {marketPrice ? marketPrice : 'Not Available'}</p>
        <div>
          <label htmlFor="quality">Quality:</label>
          <select value={quality} onChange={(e) => setQuality(e.target.value)}>
            <option value="Mint">Mint</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Played">Played</option>
          </select>
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>
        <button type="submit">Sell</button>
      </form>
    </div>
  );
};

export default CardSaleForm;
