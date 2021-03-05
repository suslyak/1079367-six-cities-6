import React from 'react';
import PropTypes from 'prop-types';
import {PropValidation} from '../../const.js';
import PlaceCard from '../place-card/place-card.jsx';

const OffersList = (props) => {
  const {offers} = props;
  const initialCardId = offers.length ? offers[0].id : null;
  const [currentCard, setCurrentCard] = React.useState(initialCardId);

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
      {offers.map((offer, i) =>
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
  reviews: PropTypes.arrayOf(PropValidation.REVIEW)
};

export default OffersList;
