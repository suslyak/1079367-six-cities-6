import React from 'react';
import {render, screen} from '@testing-library/react';
import * as redux from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import Map from './map';
import {City} from '../../const';

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

    const mockCity = City[`Paris`];

    const mockOffers = [
      {
        "bedrooms": 1,
        "city": {
          "location": {
            "latitude": 52.370216,
            "longitude": 4.895168,
            "zoom": 10
          },
          "name": `Amsterdam`
        },
        "host": {
          "avatarUrl": `img/avatar-max.jpg`,
          "id": 1,
          "isPro": false,
          "name": `Max`
        },
        "images": [`img/apartment-01.jpg`, `img/apartment-01.jpg`, `img/apartment-01.jpg`],
        "description": `room offer`,
        "location": {"latitude": 48.86471, "longitude": 2.35, "zoom": 10},
        "id": 1,
        "maxAdults": 40,
        "title": `The house among olive`,
        "goods": [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`],
        "isPremium": false,
        "previewImage": `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/16.jpg`,
        "price": 169,
        "isFavorite": false,
        "rating": 3,
        "type": `room`
      },
      {
        "bedrooms": 1,
        "city": {
          "location": {
            "latitude": 52.370216,
            "longitude": 4.895168,
            "zoom": 10
          },
          "name": `Amsterdam`
        },
        "host": {
          "avatarUrl": `img/avatar-max.jpg`,
          "id": 1,
          "isPro": false,
          "name": `Max`
        },
        "images": [`img/apartment-01.jpg`, `img/apartment-01.jpg`, `img/apartment-01.jpg`],
        "description": `room offer`,
        "location": {"latitude": 48.86471, "longitude": 2.35, "zoom": 10},
        "id": 1,
        "maxAdults": 40,
        "title": `The Joshua Tree House`,
        "goods": [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`],
        "isPremium": false,
        "previewImage": `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/16.jpg`,
        "price": 250,
        "isFavorite": false,
        "rating": 5,
        "type": `room`
      },
      {
        "bedrooms": 1,
        "city": {
          "location": {
            "latitude": 52.370216,
            "longitude": 4.895168,
            "zoom": 10
          },
          "name": `Amsterdam`
        },
        "host": {
          "avatarUrl": `img/avatar-max.jpg`,
          "id": 1,
          "isPro": false,
          "name": `Max`
        },
        "images": [`img/apartment-01.jpg`, `img/apartment-01.jpg`, `img/apartment-01.jpg`],
        "description": `room offer`,
        "location": {"latitude": 48.86471, "longitude": 2.35, "zoom": 10},
        "id": 1,
        "maxAdults": 40,
        "title": `Canal View Prinsengracht`,
        "goods": [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`],
        "isPremium": false,
        "previewImage": `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/16.jpg`,
        "price": 450,
        "isFavorite": false,
        "rating": 4,
        "type": `room`
      }
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
    expect(screen.getByTitle(/Canal View Prinsengracht/i)).toBeInTheDocument();
  });
});
