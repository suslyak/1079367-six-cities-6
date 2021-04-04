import React from 'react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render} from '@testing-library/react';
import * as redux from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import OffersList from './offers-list';
import {Sorting} from '../../const';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

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
      "avatar_url": `img/avatar-max.jpg`,
      "id": 1,
      "is_pro": false,
      "name": `Max`
    },
    "images": [`img/apartment-01.jpg`, `img/apartment-01.jpg`, `img/apartment-01.jpg`],
    "description": `room offer`,
    "location": {"latitude": 48.86471, "longitude": 2.35, "zoom": 10},
    "id": 1,
    "max_adults": 40,
    "title": `The house among olive`,
    "goods": [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`],
    "is_premium": false,
    "preview_image": `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/16.jpg`,
    "price": 169,
    "is_favorite": false,
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
      "avatar_url": `img/avatar-max.jpg`,
      "id": 1,
      "is_pro": false,
      "name": `Max`
    },
    "images": [`img/apartment-01.jpg`, `img/apartment-01.jpg`, `img/apartment-01.jpg`],
    "description": `room offer`,
    "location": {"latitude": 48.86471, "longitude": 2.35, "zoom": 10},
    "id": 1,
    "max_adults": 40,
    "title": `The Joshua Tree House`,
    "goods": [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`],
    "is_premium": false,
    "preview_image": `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/16.jpg`,
    "price": 250,
    "is_favorite": false,
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
      "avatar_url": `img/avatar-max.jpg`,
      "id": 1,
      "is_pro": false,
      "name": `Max`
    },
    "images": [`img/apartment-01.jpg`, `img/apartment-01.jpg`, `img/apartment-01.jpg`],
    "description": `room offer`,
    "location": {"latitude": 48.86471, "longitude": 2.35, "zoom": 10},
    "id": 1,
    "max_adults": 40,
    "title": `Canal View Prinsengracht`,
    "goods": [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`],
    "is_premium": false,
    "preview_image": `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/16.jpg`,
    "price": 450,
    "is_favorite": false,
    "rating": 4,
    "type": `room`
  }
];

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

describe(`Test offers List`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

  it(`Render 'OffersList' should contain the number of given in props offers`, () => {

    const history = createMemoryHistory();
    const store = mockStore({
      SORTING: {
        currentOffersSortingType: Object.keys(Sorting)[0]
      }
    });

    const container = render(
        <redux.Provider store={store}>
          <Router history={history}>
            <OffersList
              offers={mockOffers}
            />
          </Router>
        </redux.Provider>
    );

    const cards = container.getAllByText(/I am mock PlaceCard./i);

    expect(cards[0]).toBeInTheDocument();
    expect(cards).toHaveLength(3);
  });
});

