import React from 'react';
import {render, screen} from '@testing-library/react';
import * as redux from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import CitiesList from './cities-list';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock(`../../const.js`, () => ({
  City: {
    "Moscow": {name: `Moscow`, coords: [48.86471, 2.35]},
    "Berlin": {name: `Berlin`, coords: [50.93753, 6.96]},
    "New York": {name: `New York`, coords: [50.85034, 4.35]},
  }
}));


describe(`Test cities list`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

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
});
