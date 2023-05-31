import React from 'react';
import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
import HomePage from './components/HomePage';
import Sellers from './components/Sellers';
import Cart from './components/Cart/Cart';
import NotFound from './components/NotFound/NotFound';
import './styles/main.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/sellers" element={<Sellers />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
