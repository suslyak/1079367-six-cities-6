import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';
import {PropValidation} from '../../const.js';
import {nanoid} from 'nanoid';

const FavoritesList = (props) => {
  const {offers} = props;

  return (
    offers.map((offer) =>
      <PlaceCard
        onCardMouseOver={() => {}}
        key={nanoid(10)}
        offer={offer}
        specifiedArticleClass={`cities__place-card`}
        specifiedImageWrapperClass={`cities__image-wrapper`}
        specifiedInfoClass={`favorites__card-info`}
        imageSize={{width: 150, height: 110}}
      />
    )
  );
};

FavoritesList.propTypes = {
  offers: PropTypes.arrayOf(PropValidation.OFFER),
};

export default FavoritesList;
