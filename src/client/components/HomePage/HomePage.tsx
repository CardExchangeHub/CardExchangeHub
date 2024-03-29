import React, { useEffect, useState, createContext } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../../global/NavBar/NavBar';
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
