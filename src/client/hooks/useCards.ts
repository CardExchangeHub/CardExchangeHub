import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchCards,
  selectCurrentPage,
} from '../features/CardsList/cardsSlice';

const useCards = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(selectCurrentPage);

  useEffect(() => {
    const controller = new AbortController();

    const { signal } = controller;

    dispatch(fetchCards({ page: currentPage, options: { signal } }));

    return () => controller.abort();
  }, [currentPage]);
};

export default useCards;
