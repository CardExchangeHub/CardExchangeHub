import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import { getTotals } from './features/Cart/cartSlice';
import { loadUser } from './features/Auth/authSlice';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
store.dispatch(getTotals());
// Might not pertain to you because you are not using local storage
// store.dispatch(loadUser());

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
