import React, { useState } from 'react';
import { Router, Routes, Route, useNavigate } from 'react-router-dom';
import Sellers from './components/Sellers';
import HomePage from './components/HomePage';

function App() {
  return (
    <div className="router">
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sellers" element={<Sellers />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
