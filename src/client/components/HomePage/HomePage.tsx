import React, { useEffect, useState, createContext } from 'react';
import { useLocation } from 'react-router-dom';
import CardsList from '../CardsList/CardsList';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectAuth,
  selectAuthModal,
  toggleAuthModal,
} from '../../features/Auth/authSlice';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const modalState = useAppSelector(selectAuthModal);
  const { state } = useLocation();

  useEffect(() => {
    if (!auth._id && state?.showLogin === true) {
      dispatch(toggleAuthModal());
      // Not sure if this is the correct way to handle this, will go back to docs and review later - Jeff
      state.showLogin = false;
    }
  }, []);

  return (
    <>
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
    </>
  );
};

export default HomePage;
