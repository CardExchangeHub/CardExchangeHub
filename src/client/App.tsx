import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import Sellers from './components/Sellers';
import './styles/main.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sellers" element={<Sellers />} />
      </Routes>
    </div>
  );
}

export default App;
