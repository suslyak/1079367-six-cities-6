import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {PropValidation} from '../../const.js';
import PlaceCard from '../place-card/place-card.jsx';
import {ActionCreator} from '../../store/action';

const OffersList = (props) => {
  const {city, offers, allOffers, onLoadData} = props;
  const initialCardId = offers.length ? offers[0].id : null;
  const [currentCard, setCurrentCard] = React.useState(initialCardId);

  // Временно чтобы не ругался линтер
  const doSomethingWithState = () => {
    return currentCard;
  };

  doSomethingWithState();

  useEffect(() => {
    const cityOffers = allOffers.filter((offer) => offer.city.name === city.name);
    onLoadData(cityOffers);
  }, [city]);

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
  city: PropValidation.CITY,
  offers: PropTypes.arrayOf(PropValidation.OFFER),
  allOffers: PropTypes.arrayOf(PropValidation.OFFER),
  reviews: PropTypes.arrayOf(PropValidation.REVIEW),
  onLoadData: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  city: state.city,
  offers: state.offers,
  allOffers: state.allOffers,
});

const mapDispatchToProps = (dispatch) => ({
  onLoadData(offers) {
    dispatch(ActionCreator.fillOffersList(offers));
  }
});

export {OffersList};
export default connect(mapStateToProps, mapDispatchToProps)(OffersList);
