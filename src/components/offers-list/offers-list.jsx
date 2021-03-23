import React, {useState, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {PropValidation} from '../../const.js';
import {SortingFilter, sortListCopy} from '../../utils.js';

import PlaceCard from '../place-card/place-card.jsx';

const OffersList = (props) => {
  const {offers} = props;
  const initialCardId = offers.length ? offers[0].id : null;
  const [currentCard, setCurrentCard] = useState(initialCardId);
  const {currentOffersSortingType} = useSelector((state) => state.SORTING);

  const sortOffersList = useMemo(
      () => sortListCopy(offers, SortingFilter[currentOffersSortingType]),
      [currentOffersSortingType, offers]
  );

  // Временно чтобы не ругался линтер
  const doSomethingWithState = () => {
    return currentCard;
  };

  doSomethingWithState();

  const handleCardMouseover = (id) => {
    setCurrentCard(id);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {sortOffersList.map((offer, i) =>
        <PlaceCard
          onCardMouseOver={() => handleCardMouseover(offer.id)}
          key={name + i}
          offer={offer}
        />)
      }
    </div>
  );
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropValidation.OFFER),
};

export default OffersList;
