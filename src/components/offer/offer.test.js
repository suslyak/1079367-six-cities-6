import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import * as redux from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {createAPI} from "../../services/api";
import Offer from './offer';
import {AuthorizationStatus, emptyUser} from '../../const';

const api = createAPI(() => {}, () => {});

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureStore(middlewares);

const mockOffer = {
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
  "goods": [`Breakfast`],
  "isPremium": false,
  "previewImage": `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/16.jpg`,
  "price": 169,
  "isFavorite": false,
  "rating": 3.1,
  "type": `room`
};

const mockUser = {
  "avatarUrl": `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/3.jpg`,
  "email": `keks@htmlacattdemy.ru`,
  "id": 1,
  "isPro": false,
  "name": `keks`
};

jest.mock(`../header/header.jsx`, () => {
  const mockHeader = () => <div>This is mock Header</div>;
  mockHeader.displayName = `mockHeader`;

  return {
    __esModule: true,
    default: () => {
      return mockHeader();
    }
  };
});

jest.mock(`../map/map.jsx`, () => {
  const mockMap = () => <div>This is mock Map</div>;
  mockMap.displayName = `mockMap`;

  return {
    __esModule: true,
    default: () => {
      return mockMap();
    }
  };
});

jest.mock(`../near-offers-list/near-offers-list.jsx`, () => {
  const mockNearOffersList = () => <div>This is mock NearOffersList</div>;
  mockNearOffersList.displayName = `mockNearOffersList`;

  return {
    __esModule: true,
    default: () => {
      return mockNearOffersList();
    }
  };
});


jest.mock(`../review/reviews-list.jsx`, () => {
  const mockReviewList = () => <div>This is mock ReviewList</div>;
  mockReviewList.displayName = `mockReviewList`;

  return {
    __esModule: true,
    default: () => {
      return mockReviewList();
    }
  };
});

describe(`Test Offer`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

  it(`Render 'Offer' should contain offer info`, () => {
    const history = createMemoryHistory();
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
        offers: [mockOffer],
        allOffers: [],
        nearOffers: [],
        favorites: [],
        isOffersLoaded: true,
        isFavoritesLoaded: false
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        AuthInfo: mockUser

      }
    });

    const container = render(
        <redux.Provider store={store}>
          <Router history={history}>
            <Offer
              id={`1`}
            />
          </Router>
        </redux.Provider>
    );

    expect(container.getByText(`The house among olive`)).toBeInTheDocument();
    expect(container.getByText(`3.1`)).toBeInTheDocument();
    expect(container.getByText(/€169/i)).toBeInTheDocument();
    expect(container.getByText(/Breakfast/i)).toBeInTheDocument();
    expect(container.getByText(`Max`)).toBeInTheDocument();
    expect(container.getByText(`room offer`)).toBeInTheDocument();
    expect(container.getByText(`Max`)).toBeInTheDocument();
  });

  it(`Render 'Offer' should contain comment form if user is authenticated`, () => {
    const history = createMemoryHistory();
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
        offers: [mockOffer],
        allOffers: [],
        nearOffers: [],
        favorites: [],
        isOffersLoaded: true,
        isFavoritesLoaded: false
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        AuthInfo: emptyUser
      }
    });

    const container = render(
        <redux.Provider store={store}>
          <Router history={history}>
            <Offer
              id={`1`}
            />
          </Router>
        </redux.Provider>
    );

    expect(container.getByLabelText(`Your review`)).toBeInTheDocument();
  });

  it(`Render 'Offer' should not contain comment form if user is authenticated`, () => {
    const history = createMemoryHistory();
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
        offers: [mockOffer],
        allOffers: [],
        nearOffers: [],
        favorites: [],
        isOffersLoaded: true,
        isFavoritesLoaded: false
      },
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        AuthInfo: emptyUser
      }
    });

    const container = render(
        <redux.Provider store={store}>
          <Router history={history}>
            <Offer
              id={`1`}
            />
          </Router>
        </redux.Provider>
    );

    const commentFormLbel = container.queryByLabelText(`Your review`);
    expect(commentFormLbel).toBeNull();
  });
});
