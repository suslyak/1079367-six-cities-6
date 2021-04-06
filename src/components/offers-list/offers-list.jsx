import React, {useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {changeCurrentOffer} from '../../store/action';
import {PropValidation} from '../../const.js';
import {SortingFilter, sortListCopy} from '../../utils/utils.js';
import {nanoid} from 'nanoid';
import PlaceCard from '../place-card/place-card.jsx';

const OffersList = (props) => {
  const {offers} = props;
  const {currentOffersSortingType} = useSelector((state) => state.SORTING);

  const dispatch = useDispatch();

  const sortedOffersList = useMemo(
      () => sortListCopy(offers, SortingFilter[currentOffersSortingType]),
      [currentOffersSortingType, offers]
  );

  const handleCardMouseover = (id) => {
    dispatch(changeCurrentOffer(id));
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {sortedOffersList.map((offer) =>
        <PlaceCard
          onCardMouseOver={() => handleCardMouseover(offer.id)}
          key={nanoid(10)}
          offer={offer}
          specifiedArticleClass={`cities__place-card`}
          specifiedImageWrapperClass={`cities__image-wrapper`}
        />)
      }
    </div>
  );
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropValidation.OFFER),
};

export default OffersList;
