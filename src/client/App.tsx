import React from 'react';
import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Sellers from './components/Sellers';
import Cart from './components/Cart/Cart';
import NotFound from './components/NotFound/NotFound';
import LogIn from './components/LogIn/LogIn';
import NavBar from './components/NavBar/NavBar';
import './styles/main.css';

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/sellers" element={<Sellers />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
