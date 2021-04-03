import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import * as redux from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {createAPI} from "../../services/api";
import {AuthorizationStatus, City, Sorting, emptyUser} from '../../const';
import App from './app.jsx';


const api = createAPI(() => {}, () => {});

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureStore(middlewares);

describe(`Test routing`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

  it(`Render 'MainPage' when user navigate to '/' url`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      CITY: {
        city: {
          "name": City[`Paris`].name,
          "lat": City[`Paris`].coords[0],
          "lng": City[`Paris`].coords[1],
          "zoom": 12
        }
      },
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        AuthInfo: emptyUser
      },
      OFFERS: {
        offers: [],
        allOffers: [],
        nearOffers: [],
        favorites: [],
        isOffersLoaded: false,
        isFavoritesLoaded: false
      },
      SORTING: {
        currentOffersSortingType: Object.keys(Sorting)[0]
      },
      MAP: {mouseHoverOffer: null}
    });

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/Paris/i)).toBeInTheDocument();
    expect(screen.getByText(/Cologne/i)).toBeInTheDocument();
    expect(screen.getByText(/Brussels/i)).toBeInTheDocument();
  });

  it(`Render 'SignIn' when user navigate to '/login' url`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      CITY: {
        city: {
          "name": City[`Paris`].name,
          "lat": City[`Paris`].coords[0],
          "lng": City[`Paris`].coords[1],
          "zoom": 12
        }
      },
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        AuthInfo: emptyUser
      }
    });
    history.push(`/login`);

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it(`Render 'Room' when user navigate to '/offer/:id' url`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      CITY: {
        city: {
          "name": City[`Paris`].name,
          "lat": City[`Paris`].coords[0],
          "lng": City[`Paris`].coords[1],
          "zoom": 12
        }
      },
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        AuthInfo: emptyUser
      },
      OFFERS: {
        offers: [],
        allOffers: [],
        nearOffers: [],
        favorites: [],
        isOffersLoaded: false,
        isFavoritesLoaded: false
      },
      SORTING: {
        currentOffersSortingType: Object.keys(Sorting)[0]
      },
      MAP: {mouseHoverOffer: null}
    });
    history.push(`/offer/10`);

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/Loading offer/i)).toBeInTheDocument();
  });

  it(`Render 'Favorites' when user navigate to '/favorites' url`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      CITY: {
        city: {
          "name": City[`Paris`].name,
          "lat": City[`Paris`].coords[0],
          "lng": City[`Paris`].coords[1],
          "zoom": 12
        }
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        AuthInfo: {
          "avatar_url": `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/3.jpg`,
          "email": `keks@htmlacattdemy.ru`,
          "id": 1,
          "is_pro": false,
          "name": `keks`
        }
      },
      OFFERS: {
        offers: [],
        allOffers: [],
        nearOffers: [],
        favorites: [],
        isOffersLoaded: false,
        isFavoritesLoaded: false
      }
    });
    history.push(`/favorites`);

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/Loading favorites/i)).toBeInTheDocument();
  });

  it(`Render 'NotFound' when user navigate to '/404' url`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      CITY: {
        city: {
          "name": City[`Paris`].name,
          "lat": City[`Paris`].coords[0],
          "lng": City[`Paris`].coords[1],
          "zoom": 12
        }
      },
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        AuthInfo: emptyUser
      }
    });
    history.push(`/404`);

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/404. Page not found./i)).toBeInTheDocument();
  });
});
