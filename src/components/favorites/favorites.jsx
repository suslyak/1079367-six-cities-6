import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Header from '../header/header.jsx';
import FavoritesList from './favorites-list.jsx';
import {PropValidation} from '../../const.js';
import {getUniqueValues} from '../../utils.js';


const Favorites = (props) => {
  const {offers} = props;
  const cities = getUniqueValues(offers.map((offer) => offer.city.name));

  return (
    <div className="page page--favorites-empty">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {cities.map((city, i) =>
                <li className="favorites__locations-items" key={name + i}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <FavoritesList
                      offers={offers.filter((offer) => offer.city.name === city)}
                    />
                  </div>
                </li>
              )}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
        </a>
      </footer>
    </div>
  );
};

Favorites.propTypes = {
  offers: PropTypes.arrayOf(PropValidation.OFFER),
};

const mapStateToProps = (state) => ({
  offers: state.OFFERS.offers
});

export {Favorites};
export default connect(mapStateToProps, null)(Favorites);
