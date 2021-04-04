import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as redux from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {createAPI} from "../../services/api";
import CitiesList from './cities-list';

const api = createAPI(() => {}, () => {});

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureStore(middlewares);

jest.mock(`../../const.js`, () => ({
  City: {
    "Moscow": {name: `Moscow`, coords: [48.86471, 2.35]},
    "Berlin": {name: `Berlin`, coords: [50.93753, 6.96]},
    "New York": {name: `New York`, coords: [50.85034, 4.35]},
  }
}));


describe(`Test cities list`, () => {
  beforeEach(() => {
    jest.resetModules();
  });

  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

  jest.mock(`react-redux`, () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(() => {}),
  }));

  it(`Render 'CitiesList' should contain cities names from City const`, () => {
    const store = mockStore({
      CITY: {
        city: {
          "name": `Paris`,
          "lat": 48.86471,
          "lng": 2.35,
          "zoom": 12
        }
      }
    });
    render(
        <redux.Provider store={store}>
          <CitiesList />
        </redux.Provider>
    );

    expect(screen.getByText(/Moscow/i)).toBeInTheDocument();
    expect(screen.getByText(/Berlin/i)).toBeInTheDocument();
    expect(screen.getByText(/New York/i)).toBeInTheDocument();
  });

  it(`Render 'CitiesList' should change city in redux state on city tab click`, () => {
    const store = mockStore({
      CITY: {
        city: {
          "name": `Paris`,
          "lat": 48.86471,
          "lng": 2.35,
          "zoom": 12
        }
      }
    });

    const dispatch = jest.fn();
    redux.useDispatch.mockReturnValue(jest.fn());

    render(
        <redux.Provider store={store}>
          <CitiesList />
        </redux.Provider>
    );
    const tab = screen.getByTestId(`cityTab1`);
    fireEvent.click(tab);
    expect(dispatch).toBeCalled();
  });
});
