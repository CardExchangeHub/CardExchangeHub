import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { selectCardToSell } from '../../features/CardsList/cardsSlice';
import { selectAuth } from '../../features/Auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { sellCard } from '../../features/CardsList/cardsSlice';

const CardSaleForm = () => {
  const { cardId, image, marketPrice } = useAppSelector(selectCardToSell);
  const navigate = useNavigate();
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
          newCard: {
            cardId,
            image,
            marketPrice,
            quantity,
            quality,
            sellerPrice,
          },
        })
      );
      navigate('/');
    }
  };

  return (
    <div className="cards-container">
      <img src={image} alt="" />
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={(e) => handleSale(e)}
      >
        <p className="text-lg opacity-0">Card Id: {cardId}</p>
        <p className="text-lg opacity-50">
          Market Price: ${marketPrice ? marketPrice : 'Not Available'}
        </p>
        <div>
          <label className="text-lg opacity-50" htmlFor="quality">
            Quality:
          </label>
          <select
            className="opacity-50 bg-gray-50 border border-gray-300 text-gray-900 h-7 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-24 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
          >
            <option value="Mint">Mint</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Played">Played</option>
          </select>
        </div>
        <div>
          <label className="text-lg opacity-50" htmlFor="quantity">
            Quantity:
          </label>
          <input
            className="opacity-50 bg-gray-50 border border-gray-300 text-gray-900 h-7 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-20 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="number"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="your-price" className="text-lg opacity-50">
            Your Price:
          </label>
          <input
            type="number"
            id="your-price"
            value={sellerPrice}
            onChange={(e) => setSellerPrice(parseInt(e.target.value))}
            className="opacity-50 bg-gray-50 border border-gray-300 text-gray-900 h-7 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-16 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button className="checkout-btn w-32 mb-0" type="submit">
          Sell
        </button>
      </form>
    </div>
  );
};

export default CardSaleForm;
