import React from 'react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import * as redux from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {createAPI} from "../../services/api";
import MainPage from './main-page';

const api = createAPI(() => {}, () => {});

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureStore(middlewares);

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

jest.mock(`../cities-list/cities-list.jsx`, () => {
  const mockCitiesList = () => <div>This is mock Cities List</div>;
  mockCitiesList.displayName = `mockCitiesList`;

  return {
    __esModule: true,
    default: () => {
      return mockCitiesList();
    }
  };
});

jest.mock(`../sorting/sorting.jsx`, () => {
  const mockSorting = () => <div>This is mock Sorting</div>;
  mockSorting.displayName = `mockSorting`;

  return {
    __esModule: true,
    default: () => {
      return mockSorting();
    }
  };
});

jest.mock(`../offers-list/offers-list.jsx`, () => {
  const mockOffersList = () => <div>This is mock Offers List</div>;
  mockOffersList.displayName = `mockOffersList`;

  return {
    __esModule: true,
    default: () => {
      return mockOffersList();
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

jest.mock(`../no-offers/no-offers.jsx`, () => {
  const mockNoOffers = () => <div>This is mock NoOffers</div>;
  mockNoOffers.displayName = `mockNoOffers`;

  return {
    __esModule: true,
    default: () => {
      return mockNoOffers();
    }
  };
});

jest.mock(`../loading-screen/loading-screen.jsx`, () => {
  const mockLoadingScreen = () => <div>This is mock LoadingScreen</div>;
  mockLoadingScreen.displayName = `mockLoadingScreen`;

  return {
    __esModule: true,
    default: () => {
      return mockLoadingScreen();
    }
  };
});

describe(`Test MainPage`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

  it(`Render 'MainPage' should contain all key components`, () => {
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
        offers: [],
        allOffers: [
          {city: {name: `Paris`}, isFavorite: true, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]},
          {city: {name: `Cologne`}, isFavorite: true, images: new Array(14), title: `The Joshua Tree House`, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`]},
          {city: {name: `Amsterdam`}, isFavorite: true, images: new Array(14), title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Breakfast`, `Laptop friendly workspace`, `Washer`]}
        ],
        nearOffers: [],
        favorites: [],
        isOffersLoaded: true,
        isFavoritesLoaded: false
      }
    });

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <MainPage />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/This is mock Header/i)).toBeInTheDocument();
    expect(screen.getByText(/This is mock Cities List/i)).toBeInTheDocument();
    expect(screen.getByText(/This is mock Sorting/i)).toBeInTheDocument();
    expect(screen.getByText(/This is mock Offers List/i)).toBeInTheDocument();
    expect(screen.getByText(/This is mock Map/i)).toBeInTheDocument();
  });

  it(`Render 'MainPage' should render no-offers screen if no offers in state`, () => {
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
        offers: [],
        allOffers: [],
        nearOffers: [],
        favorites: [],
        isOffersLoaded: true,
        isFavoritesLoaded: false
      }
    });

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <MainPage />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/This is mock NoOffers/i)).toBeInTheDocument();
  });
});

