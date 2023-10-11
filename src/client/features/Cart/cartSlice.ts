import { CombinedState, createSlice } from '@reduxjs/toolkit';
import { CardFromSearch, CardForSale } from '../CardsList/cardsSlice';
import { RootState } from '../../app/store';

export interface Cart {
  cartItems: CardForSale[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
}

const initialState: Cart = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const removeItem = (state: Cart, action: any): CardForSale[] => {
  const updatedCartItems = state.cartItems.filter(
    (cartItem) => cartItem.cardId !== action.payload.cardId
  );
  return updatedCartItems;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.cardId === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity++;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = removeItem(state, action);
    },
    decreaseCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.cardId === action.payload.id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity--;
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        state.cartItems = removeItem(state, action);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    getTotals: (state) => {
      const { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { seller, cartQuantity } = cartItem;
          if (seller && cartQuantity) {
            const itemTotal = seller * cartQuantity;
            cartTotal.total += itemTotal;
            cartTotal.quantity += cartQuantity;
          }
          return cartTotal;
        },
        { total: 0, quantity: 0 }
      );
      state.cartTotalAmount = total;
      state.cartTotalQuantity = quantity;
    },
  },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } =
  cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectTotalAmount = (state: RootState) =>
  state.cart.cartTotalAmount;
export default cartSlice.reducer;
