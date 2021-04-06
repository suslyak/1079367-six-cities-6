import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../header/header.jsx';
import FavoritesList from './favorites-list.jsx';
import NoFavorites from './no-favorites';
import LoadingScreen from '../loading-screen/loading-screen';
import {fetchFavoritesList} from '../../store/api-actions';
import {setFavoritesIsLoaded} from '../../store/action';
import {PropValidation, City} from '../../const.js';
import {nanoid} from 'nanoid';

const Favorites = () => {
  const {favorites, isFavoritesLoaded} = useSelector((state) => state.OFFERS);
  const cities = Object.values(City).map((item) => item.name);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFavoritesIsLoaded(false));
    dispatch(fetchFavoritesList());
  }, []);

  if (!isFavoritesLoaded) {

    return (
      <div className="page page--favorites-empty">
        <Header />
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="visually-hidden">Loading favorites</h1>
              <LoadingScreen />
            </section>
          </div>
        </main>
        <footer className="footer container">
          <Link className="footer__logo-link" to="/">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
          </Link>
        </footer>
      </div>
    );
  }

  if (!favorites.length) {
    return (
      <div className="page page--favorites-empty">
        <Header />
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <NoFavorites />
        </main>
        <footer className="footer">
          <Link className="footer__logo-link" to="/">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
          </Link>
        </footer>
      </div>
    );
  }

  return (
    <div className="page page--favorites-empty">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {cities.map((city) => {
                const cityOffers = favorites.filter((offer) => offer.city.name === city);
                return (
                  cityOffers.length
                    ?
                    <li className="favorites__locations-items" key={nanoid(10)}>
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{city}</span>
                          </a>
                        </div>
                      </div>
                      <div className="favorites__places">
                        <FavoritesList
                          offers={cityOffers}
                        />
                      </div>
                    </li>
                    : ``
                );
              }
              )}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
        </Link>
      </footer>
    </div>
  );
};

Favorites.propTypes = {
  favorites: PropTypes.arrayOf(PropValidation.OFFER),
};

export default Favorites;
