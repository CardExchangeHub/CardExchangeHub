import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  selectCartItems,
  selectTotalAmount,
  clearCart,
  getTotals,
} from '../../features/Cart/cartSlice';
import { selectAuth } from '../../features/Auth/authSlice';
import CardComponent from '../Card/Card';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const cartItems = useAppSelector(selectCartItems);
  const totalAmount = useAppSelector(selectTotalAmount);

  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="font-bold mb-5 text-5xl opacity-30">Your Cart</h2>
      {!cartItems.length ? (
        <div className="flex flex-col justify-center items-center">
          <p className="font-light opacity-30 text-xl tracking-widest">
            - Your cart is currently empty -
          </p>
          <div className="start-shopping">
            <Link to="/">
              <span className="shop-btn">start shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          {/* <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div> */}
          <div className="flex justify-evenly flex-wrap border-dotted border-2 border-white rounded-[50px] mx-20">
            {cartItems.map((card, i) => {
              return <CardComponent key={card.id} card={card} />;
            })}
          </div>
          <div className="flex flex-col justfiy-center items-center">
            <button className="clear-btn" onClick={() => dispatch(clearCart())}>
              Clear Cart
            </button>
            <div className="flex flex-col justfiy-center items-center">
              <div className="subtotal">
                <span className="font-bold text-xl">Subtotal: </span>
                <span className="font-bold text-xl text-green-500">
                  ${totalAmount}
                </span>
              </div>
              <p className="font-light">
                * Taxes and shipping calculated at checkout
              </p>
              {auth._id ? (
                <button className="checkout-btn bg-red">Check out</button>
              ) : (
                <button
                  className="checkout-btn bg-red"
                  onClick={() => navigate('/login')}
                >
                  Login to check out
                </button>
              )}

              <div className="continue-shopping">
                <Link to="/">
                  <span className="shop-btn">Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
