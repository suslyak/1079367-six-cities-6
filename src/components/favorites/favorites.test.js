import React from 'react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import * as redux from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {createAPI} from "../../services/api";
import Favorites from './favorites';
import {AuthorizationStatus} from '../../const';

const api = createAPI(() => {}, () => {});

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureStore(middlewares);

const mockFavorites = [
  {city: {name: `Paris`}, images: [], title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]},
  {city: {name: `Paris`}, images: [], title: `Waterfront with extraordinary view`, goods: [`Air conditioning`, `Laptop friendly workspace`]},
  {city: {name: `Paris`}, images: [], title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Air conditioning`, `Laptop friendly workspace`, `Washer`]},
  {city: {name: `Paris`}, images: [], title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]},
  {city: {name: `Cologne`}, images: [], title: `The Joshua Tree House`, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`]},
  {city: {name: `Cologne`}, images: [], title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Breakfast`, `Air conditioning`, `Washer`]},
  {city: {name: `Cologne`}, images: [], title: `Nice, cozy, warm big bed apartment`, goods: [`Air conditioning`, `Laptop friendly workspace`, `Washer`]},
  {city: {name: `Amsterdam`}, images: [], title: `The Joshua Tree House`, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`]},
  {city: {name: `Amsterdam`}, images: [], title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Breakfast`, `Laptop friendly workspace`, `Washer`]},
  {city: {name: `Amsterdam`}, images: [], title: `Amazing and Extremely Central Flat`, goods: [`Air conditioning`, `Laptop friendly workspace`, `Washer`]},
  {city: {name: `Hamburg`}, images: [], title: `Canal View Prinsengracht`, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]}
];

const mockUser = {
  "avatarUrl": `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/3.jpg`,
  "email": `keks@htmlacattdemy.ru`,
  "id": 1,
  "isPro": false,
  "name": `keks`
};

describe(`Test favorites`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

  it(`Render 'Favorites' should render fetch reviews every render and show loading spinner `, () => {
    const store = mockStore({
      OFFERS: {
        favotites: mockFavorites
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        AuthInfo: mockUser
      }
    });
    const history = createMemoryHistory();

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <Favorites />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByAltText(/loading in process/i)).toBeInTheDocument();
  });
});
