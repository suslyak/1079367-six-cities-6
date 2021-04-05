import React from 'react';
import {render, screen} from '@testing-library/react';
import * as redux from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import Sorting from './sorting';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock(`../../const.js`, () => ({
  Sorting: {
    ONE: `filterOne`,
    TWO: `filterTwo`,
    THREE: `filterThree`,
  }
}));

describe(`Test sorting`, () => {

  it(`Render 'Sorting' contain current sorting type tab, got from store and mapped on Sort const`, () => {
    const store = mockStore({
      SORTING: {
        currentOffersSortingType: `ONE`
      }
    });

    render(
        <redux.Provider store={store}>
          <Sorting />
        </redux.Provider>
    );

    expect(screen.getAllByText(`filterOne`)[0]).toBeInTheDocument();
  });
});
