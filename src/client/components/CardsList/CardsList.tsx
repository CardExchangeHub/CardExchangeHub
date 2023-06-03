import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import CardComponent from '../Card/Card';
import useCards from '../../hooks/useCards';
import {
  selectAllCards,
  selectStatus,
  selectCurrentPage,
  selectHasNextPage,
  fetchCards,
  selectError,
  pageNumberUpdated,
} from '../../features/CardsList/cardsSlice';
import { Spinner } from '../Spinner';

const CardsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(selectAllCards);
  const currentPage = useAppSelector(selectCurrentPage);
  const cardStatus = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);
  const hasNextPage = useAppSelector(selectHasNextPage);
  // fetch data for cards list
  useCards();

  const intObserver = useRef<IntersectionObserver | null>(null);

  const lastPostRef = useCallback(
    (card: HTMLElement | null) => {
      if (cardStatus === 'loading') return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((cards) => {
        if (cards[0].isIntersecting && hasNextPage) {
          console.log('Near the last card!');
          dispatch(pageNumberUpdated());
        }
      });

      if (card) intObserver.current.observe(card);
    },
    [cardStatus, hasNextPage]
  );

  // Sort posts in reverse chronological order by datetime string
  //   const orderedPosts = cards.slice();
  //   // .sort((a: Card, b: Card) => b.dateAdded.localeCompare(a.dateAdded));
  // } else if (cardStatus === 'failed') {
  //   content = <div>{error}</div>;
  // }

  return (
    <div className="flex justify-evenly flex-wrap border-dashed border-2 border-white rounded-[50px] mx-20">
      {cards.map((card, i) => {
        if (cards.length === i + 1) {
          console.log('last card');
          return <CardComponent key={card.id} card={card} ref={lastPostRef} />;
        }
        return <CardComponent key={card.id} card={card} />;
      })}
      {cardStatus === 'loading' && <Spinner text="Loading..." />}
      {cardStatus === 'failed' && <div>{error}</div>}
    </div>
  );
};

export default CardsList;
