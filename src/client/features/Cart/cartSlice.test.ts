import cardsReducer, {
  Cart,
  addToCart,
  removeFromCart,
  decreaseCart,
  clearCart,
  getTotals,
} from './cartSlice';
import { CardForSale } from '../CardsList/cardsSlice';
import CardSaleForm from '../../components/CardSaleForm/CardSaleForm';

describe('cart reducer', () => {
  const initialState: Cart = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
  };

  const cartItem: CardForSale = {
    cardId: '3',
    image: '',
    cartQuantity: 1,
    quality: 'good',
    marketPrice: 5,
    sellerPrice: 10,
    dateAdded: '5/5/2021',
  };
  it('should handle initial cart state', () => {
    expect(cardsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should add item to cart', () => {
    const { cartTotalQuantity, cartTotalAmount, cartItems } = cardsReducer(
      initialState,
      addToCart(cartItem)
    );
    expect(cartItems.length).toEqual(1);
  });

  it('should remove item from cart', () => {
    const { cartItems } = cardsReducer(initialState, addToCart(cartItem));
    expect(cartItems.length).toEqual(1);
    const { cartItems: cartItems2 } = cardsReducer(
      initialState,
      removeFromCart(cartItem)
    );
    expect(cartItems2.length).toEqual(0);
  });

  it('should decrease item from cart', () => {
    const state = cardsReducer(initialState, addToCart(cartItem));
    expect(state.cartItems.length).toEqual(1);
    const { cartItems: cartItems2 } = cardsReducer(
      state,
      decreaseCart(cartItem)
    );
    expect(cartItems2.length).toEqual(0);
  });

  it('should clear cart', () => {
    const state = cardsReducer(initialState, addToCart(cartItem));
    expect(state.cartItems.length).toEqual(1);
    const { cartItems: cartItems2 } = cardsReducer(state, clearCart());
    expect(cartItems2.length).toEqual(0);
  });

  it('should get totals', () => {
    const state = cardsReducer(initialState, addToCart(cartItem));
    expect(state.cartItems.length).toEqual(1);
    const { cartTotalQuantity, cartTotalAmount } = cardsReducer(
      state,
      getTotals()
    );
    expect(cartTotalQuantity).toEqual(1);
    expect(cartTotalAmount).toEqual(10);
  });
});
