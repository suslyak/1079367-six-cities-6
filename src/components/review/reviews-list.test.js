import React from 'react';
import {render} from '@testing-library/react';
import * as redux from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {createAPI} from "../../services/api";
import ReviewsList from './reviews-list';

const api = createAPI(() => {}, () => {});

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureStore(middlewares);

jest.mock(`./review.jsx`, () => {
  const mockReview = () => <div>I am mock Review.</div>;
  mockReview.displayName = `mockReview`;

  return {
    __esModule: true,
    default: () => {
      return mockReview();
    }
  };
});

describe(`Test reviews List`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

  it(`Render 'ReviewsList' should render fetch reviews every render and show loading spinner `, () => {
    const store = mockStore({
      REVIEWS: {
        reviews: []
      },
      isReviewsLoaded: true,
    });

    const container = render(
        <redux.Provider store={store}>
          <ReviewsList
            offerId={1}
          />
        </redux.Provider>
    );

    expect(container.getByAltText(/loading in process/i)).toBeInTheDocument();
  });
});

