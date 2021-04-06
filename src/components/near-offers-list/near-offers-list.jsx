import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';
import {fetchNearOffersList} from "../../store/api-actions";
import {PropValidation} from '../../const';
import {nanoid} from 'nanoid';

const NearOffersList = (props) => {
  const {offerId} = props;
  const {nearOffers} = useSelector((state) => state.OFFERS);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNearOffersList(offerId));
  }, [offerId]);

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {nearOffers.slice(0, 3).map((offer) =>
          <PlaceCard
            onCardMouseOver={() => {}}
            key={nanoid(10)}
            offer={offer}
            specifiedArticleClass={`near-places__card`}
            specifiedImageWrapperClass={`near-places__image-wrapper`}
          />
        )}
      </div>
    </section>
  );
};

NearOffersList.propTypes = {
  offerId: PropTypes.number,
  nearOffers: PropTypes.arrayOf(PropValidation.OFFER),
};

export default NearOffersList;
