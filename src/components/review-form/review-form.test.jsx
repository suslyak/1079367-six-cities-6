import React from 'react';
import {render, screen} from '@testing-library/react';
import * as redux from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import ReviewForm from './review-form';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe(`Test review form`, () => {

  it(`'ReviewForm' submit button must be disabled if message less then minimum characters`, () => {
    const store = mockStore({});
    render(
        <redux.Provider store={store}>
          <ReviewForm
            offerId={1}
          />
        </redux.Provider>
    );

    expect(screen.getByText(`Submit`)).toHaveAttribute(`disabled`);
  });
});
