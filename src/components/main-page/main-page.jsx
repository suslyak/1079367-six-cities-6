import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Header from '../header/header.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import OffersList from '../offers-list/offers-list.jsx';
import Map from '../map/map.jsx';
import {PropValidation} from '../../const.js';
import LoadingScreen from '../loading-screen/loading-screen';
import {fetchOffersList} from "../../store/api-actions";


const MainPage = (props) => {
  const {city, allOffers, reviews, isOffersLoaded, onLoadData} = props;
  const offers = allOffers.filter((offer) => offer.city.name === city.name);

  useEffect(() => {
    if (!isOffersLoaded) {
      onLoadData();
    }
  }, [isOffersLoaded]);

  if (!isOffersLoaded) {
    return (
      <div className="page page--gray page--main">
        <Header />
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <CitiesList
              />
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <LoadingScreen />
              </section>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {city.name}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OffersList
                reviews={reviews}
                offers={offers}
              />
            </section>
            <div className="cities__right-section">
              <Map
                city={city}
                offers={offers}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

MainPage.propTypes = {
  reviews: PropTypes.arrayOf(PropValidation.REVIEW),
  isOffersLoaded: PropTypes.bool.isRequired,
  onLoadData: PropTypes.func.isRequired,
  city: PropValidation.CITY,
  allOffers: PropTypes.arrayOf(PropValidation.OFFER),
};

const mapStateToProps = (state) => ({
  city: state.city,
  allOffers: state.allOffers,
  isOffersLoaded: state.isOffersLoaded
});

const mapDispatchToProps = (dispatch) => ({
  onLoadData() {
    dispatch(fetchOffersList());
  }
});

export {MainPage};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
