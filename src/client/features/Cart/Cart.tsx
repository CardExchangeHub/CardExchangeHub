import React, { useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
}

export const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showModal, setShowModal] = useState(false);

  const addItemToCart = (item: CartItem) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeItemFromCart = (itemId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const toggleModal = () => {
    setShowModal((prevValue) => !prevValue);
  };

  return (
    <>
      <button className="cart-toggle">Open Cart</button>
      <div className="cart-modal">
        <h2>Shopping Cart</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <span>{item.name}</span>
              <span>${item.price}</span>
              <button onClick={() => removeItemFromCart(item.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button>Checkout</button>
      </div>
    </>
  );
};
