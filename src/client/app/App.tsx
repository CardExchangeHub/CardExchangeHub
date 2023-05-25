import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from '../components/HomePage/HomePage';
import Sellers from '../components/Sellers';
import '../styles/main.css';
import NotFound from '../components/NotFound';
import LogIn from '../components/LogIn/LogIn';
import NavBar from '../components/NavBar/NavBar';

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sellers" element={<Sellers />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
