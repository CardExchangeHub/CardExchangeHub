import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from '../components/HomePage';
import Sellers from '../components/Sellers';
import NotFound from '../components/NotFound';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sellers" element={<Sellers />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
