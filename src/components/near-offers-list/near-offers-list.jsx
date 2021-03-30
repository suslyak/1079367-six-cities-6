import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';
import {PropValidation} from '../../const';

const NearOffers = (props) => {
  const {offers} = props;
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offers.map((offer, i) =>
          <PlaceCard
            onCardMouseOver={() => {}}
            key={name + i}
            offer={offer}
            specifiedArticleClass={`near-places__card`}
            specifiedImageWrapperClass={`near-places__image-wrapper`}
          />
        )}
      </div>
    </section>
  );
};

NearOffers.propTypes = {
  offers: PropTypes.arrayOf(PropValidation.OFFER),
};

export default NearOffers;
