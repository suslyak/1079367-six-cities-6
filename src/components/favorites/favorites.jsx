import React, {useState, useEffect} from 'react';
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


const Favorites = () => {
  let {offers, isFavoritesLoaded} = useSelector((state) => state.OFFERS);
  const cities = Object.values(City).map((item) => item.name);

  const dispatch = useDispatch();

  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    setFirstRender(false);
    dispatch(setFavoritesIsLoaded(false));
    dispatch(fetchFavoritesList());
  }, []);

  if ((!isFavoritesLoaded) || firstRender) {

    return (
      <div className="page page--favorites-empty">
        <Header />
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
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

  if (!offers.length) {
    return (
      <NoFavorites />
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
              {cities.map((city, i) => {
                const cityOffers = offers.filter((offer) => offer.city.name === city);
                return (
                  cityOffers.length
                    ?
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
  offers: PropTypes.arrayOf(PropValidation.OFFER),
};

export default Favorites;
