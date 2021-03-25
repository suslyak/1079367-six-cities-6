import React, {useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {changeCurrentOffer} from '../../store/action';
import {PropValidation} from '../../const.js';
import {SortingFilter, sortListCopy} from '../../utils.js';

import PlaceCard from '../place-card/place-card.jsx';

const OffersList = (props) => {
  const {offers} = props;
  const {currentOffersSortingType} = useSelector((state) => state.SORTING);

  const dispatch = useDispatch();

  const sortOffersList = useMemo(
      () => sortListCopy(offers, SortingFilter[currentOffersSortingType]),
      [currentOffersSortingType, offers]
  );

  const handleCardMouseover = (id) => {
    dispatch(changeCurrentOffer(id));
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
