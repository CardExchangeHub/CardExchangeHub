import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  selectCartItems,
  selectTotalAmount,
  clearCart,
  getTotals,
} from '../../features/Cart/cartSlice';
import CardComponent from '../Card/Card';

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalAmount = useAppSelector(selectTotalAmount);

  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems]);

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {!cartItems.length ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <div className="start-shopping">
            <Link to="/">
              <span>start shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cartItems.map((card, i) => {
              return <CardComponent key={card.id} card={card} />;
            })}
          </div>
          <div className="cart-summary">
            <button
              className="clear-cart"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">${totalAmount}</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <button className="checkout">Check out</button>
              <div className="continue-shopping">
                <Link to="/">
                  <span>Continue Shopping</span>
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
