import React from 'react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import * as redux from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {createAPI} from "../../services/api";
import {AuthorizationStatus, emptyUser} from '../../const';
import User from './user';

const api = createAPI(() => {}, () => {});

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureStore(middlewares);

describe(`Test user`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

  it(`Render 'user' should contain user information if user is authenticated`, () => {
    const history = createMemoryHistory();
    const mockUser = {
      "avatarUrl": `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/3.jpg`,
      "email": `keks@htmlacattdemy.ru`,
      "id": 1,
      "isPpro": false,
      "name": `keks`
    };

    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        AuthInfo: mockUser
      }
    });

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <User />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/keks@htmlacattdemy.ru/i)).toBeInTheDocument();
  });

  it(`Render 'user' should contain 'Sign in link' if user is not authenticated`, () => {
    const history = createMemoryHistory();

    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        AuthInfo: emptyUser
      }
    });

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <User />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });
});

