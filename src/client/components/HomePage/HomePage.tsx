import React, { useEffect, useState, createContext } from 'react';
import NavBar from '../NavBar/NavBar';
import CardsList from '../CardsList/CardsList';
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
        <div className="text-6xl font-thin tracking-widest mt-20 opacity-30">
          - Collect Them All -
        </div>
      </div>
      <CardsList />
      <Cart />
    </>
  );
};

export default HomePage;
