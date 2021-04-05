import React from 'react';
import {render} from '@testing-library/react';
import * as redux from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {createAPI} from "../../services/api";
import NearOffers from './near-offers-list';

const api = createAPI(() => {}, () => {});

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureStore(middlewares);

jest.mock(`../place-card/place-card.jsx`, () => {
  const mockPlaceCard = () => <div>I am mock PlaceCard.</div>;
  mockPlaceCard.displayName = `mockPlaceCard`;

  return {
    __esModule: true,
    default: () => {
      return mockPlaceCard();
    }
  };
});

describe(`Test near offers List`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

  it(`Render 'NearOffersList' should contain the number of offers, got from state`, () => {
    const store = mockStore({
      CITY: {
        city: {
          "name": `Paris`,
          "lat": 48.86471,
          "lng": 2.35,
          "zoom": 12
        }
      },
      OFFERS: {
        offers: [],
        allOffers: [],
        nearOffers: [
          {city: {name: `Paris`}, isFavorite: true, images: [], title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]},
          {city: {name: `Cologne`}, isFavorite: true, images: [], title: `The Joshua Tree House`, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`]},
          {city: {name: `Amsterdam`}, isFavorite: true, images: [], title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Breakfast`, `Laptop friendly workspace`, `Washer`]}
        ],
        favorites: [],
        isOffersLoaded: true,
        isFavoritesLoaded: false
      }
    });

    const container = render(
        <redux.Provider store={store}>
          <NearOffers
            offerId={1}
          />
        </redux.Provider>
    );

    const cards = container.getAllByText(/I am mock PlaceCard./i);

    expect(cards[0]).toBeInTheDocument();
    expect(cards).toHaveLength(3);
  });
});

