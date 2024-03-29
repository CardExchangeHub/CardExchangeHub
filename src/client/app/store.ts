import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cardsReducer from '../features/CardsList/cardsSlice';
import cartReducer from '../features/Cart/cartSlice';
import authReducer from '../features/Auth/authSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import type { PreloadedState } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

const rootReducer = combineReducers({
  cart: persistedReducer,
  cards: cardsReducer,
  auth: authReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    preloadedState,
  });
};

export const store = setupStore();

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
