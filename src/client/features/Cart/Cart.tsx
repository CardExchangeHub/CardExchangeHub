import React, { useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
}

export const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'dragon', price: 10 },
    { id: 2, name: 'dragon', price: 20 },
  ]);

  const addItemToCart = (item: CartItem) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeItemFromCart = (itemId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <>
      <div className="cart">
        <h2 className="mb-1 font-bold ">Your Cart</h2>
        <ul>
          {cartItems.map((item) => (
            <li
              className="p-2 m-1 rounded-xl border-dotted border-white border-2"
              key={item.id}
            >
              <button
                className="delete-btn"
                onClick={() => removeItemFromCart(item.id)}
              >
                -
              </button>
              <span className="m-1 font-light">{item.name}</span>
              <span className="m-1 font-light">${item.price}</span>
            </li>
          ))}
        </ul>
        <div className="m-4 font-bold">Total: ${calculateTotalPrice()}</div>
        <button className="checkout-btn">Checkout</button>
      </div>
    </>
  );
};
