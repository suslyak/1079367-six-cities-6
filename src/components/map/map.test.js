import React from 'react';
import {render, screen} from '@testing-library/react';
import * as redux from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import Map from './map';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe(`Test Map`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

  it(`Render 'Map' should contain leaflet map and pins with titles of give offers`, () => {
    const store = mockStore({
      MAP: {
        mouseHoverOffer: null
      }
    });

    const mockCity = {
      "name": `Paris`,
      "lat": 48.86471,
      "lng": 2.35,
      "zoom": 12
    };

    const mockOffers = [
      {city: {name: `Paris`}, location: {latitude: 48.86471, longitude: 2.35, zoom: 10}, id: 1, images: [], title: `The house among olive`, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]},
      {city: {name: `Paris`}, location: {latitude: 48.868, longitude: 2.355, zoom: 10}, id: 2, images: [], title: `The Joshua Tree House`, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`]},
      {city: {name: `Paris`}, location: {latitude: 48.871, longitude: 2.359, zoom: 10}, id: 3, images: [], title: `Penthouse`, goods: [`Breakfast`, `Laptop friendly workspace`, `Washer`]}
    ];

    render(
        <redux.Provider store={store}>
          <Map
            city={mockCity}
            offers={mockOffers}
          />
        </redux.Provider>
    );

    expect(screen.getByTitle(/The house among olive/i)).toBeInTheDocument();
    expect(screen.getByTitle(/The Joshua Tree House/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Penthouse/i)).toBeInTheDocument();
  });
});
