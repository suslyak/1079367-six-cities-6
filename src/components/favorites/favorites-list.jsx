import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';
import {PropValidation, DefaultCardImageSize} from '../../const.js';
import {nanoid} from 'nanoid';

const FavoritesList = (props) => {
  const {offers} = props;

  return (
    offers.map((offer) =>
      <PlaceCard
        onCardMouseOver={() => {}}
        key={nanoid(10)}
        offer={offer}
        specifiedArticleClass={`favorites__card`}
        specifiedImageWrapperClass={`favorites__image-wrapper`}
        specifiedInfoClass={`favorites__card-info`}
        imageSize={DefaultCardImageSize.FAVORITES}
      />
    )
  );
};

FavoritesList.propTypes = {
  offers: PropTypes.arrayOf(PropValidation.OFFER),
};

export default FavoritesList;
