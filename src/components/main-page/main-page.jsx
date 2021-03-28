import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../header/header.jsx';
import Sorting from '../sorting/sorting.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import OffersList from '../offers-list/offers-list.jsx';
import NoOffers from '../no-offers/no-offers.jsx';
import Map from '../map/map.jsx';
import LoadingScreen from '../loading-screen/loading-screen';
import {fetchOffersList} from '../../store/api-actions';


const MainPage = () => {
  const {city} = useSelector((state) => state.CITY);
  const {allOffers, isOffersLoaded} = useSelector((state) => state.OFFERS);
  const offers = allOffers.filter((offer) => offer.city.name === city.name);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isOffersLoaded) {
      dispatch(fetchOffersList());
    }
  }, [isOffersLoaded]);

  if (!isOffersLoaded) {
    return (
      <div className='page page--gray page--main'>
        <Header />
        <main className='page__main page__main--index'>
          <h1 className='visually-hidden'>Cities</h1>
          <div className='tabs'>
            <section className='locations container'>
              <CitiesList
              />
            </section>
          </div>
          <div className='cities'>
            <div className='cities__places-container container'>
              <section className='cities__places places'>
                <LoadingScreen />
              </section>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!offers.length) {
    return (
      <div className='page page--gray page--main page__main--index-empty'>
        <Header />
        <main className='page__main page__main--index'>
          <h1 className='visually-hidden'>Cities</h1>
          <div className='tabs'>
            <section className='locations container'>
              <CitiesList
              />
            </section>
          </div>
          <NoOffers />
        </main>
      </div>
    );
  }

  return (
    <div className='page page--gray page--main'>
      <Header />
      <main className='page__main page__main--index'>
        <h1 className='visually-hidden'>Cities</h1>
        <div className='tabs'>
          <section className='locations container'>
            <CitiesList
            />
          </section>
        </div>
        <div className='cities'>
          <div className='cities__places-container container'>
            <section className='cities__places places'>
              <h2 className='visually-hidden'>Places</h2>
              <b className='places__found'>{offers.length} places to stay in {city.name}</b>
              <Sorting />
              <OffersList
                offers={offers}
              />
            </section>
            <div className='cities__right-section'>
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

export default MainPage;
