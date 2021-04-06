import React from 'react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import * as redux from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import Login from './login';
import {City, AuthorizationStatus, emptyUser} from '../../const';


const middlewares = [thunk];
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

describe(`Test Login`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

  it(`Render 'Login' should allways contain email and password field and city name`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      CITY: {
        city: City[`Paris`]
      },
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        authorizationInProcess: false,
        AuthInfo: emptyUser
      }
    });

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <Login />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Paris/i)).toBeInTheDocument();
  });
});

