import React, { useEffect, useState, createContext } from 'react';
import NavBar from '../NavBar/NavBar';
import CardsList from '../../features/CardsList/CardsList';
import { Cart } from '../../features/Cart/Cart';

const HomePage: React.FC = () => {
  return (
    <>
      <NavBar />
      <div className="splash-container">
        <div className="gallery">
          <div className="img-box"></div>
          <div className="img-box"></div>
          <div className="img-box"></div>
          <div className="img-box"></div>
          <div className="img-box"></div>
        </div>
        <div className="text-6xl font-thin tracking-widest mt-20 opacity-50">
          - Collect Them All -
        </div>
      </div>
      <CardsList />
      <Cart />
    </>
  );
};

export default HomePage;
