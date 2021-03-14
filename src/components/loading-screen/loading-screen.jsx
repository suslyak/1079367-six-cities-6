import React from 'react';
import Header from '../header/header.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import Map from '../map/map.jsx';

const LoadingScreen = () => {
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
              <img style={{display: `block`, width: `40px`, margin: `0 auto`}} src="/img/loader.gif" alt="loading in process"/>
            </section>
            <div className="cities__right-section">
              <Map/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoadingScreen;
