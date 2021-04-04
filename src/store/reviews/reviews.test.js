import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import {reviews} from './reviews';
import {
  ActionType
} from '../action';
import {fetchReviewsList, postReview} from '../api-actions';
import {APIRoute} from '../../const.js';

const api = createAPI(() => {}, () => {});

describe(`Reducers 'reviews' work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reviews(undefined, {}))
      .toEqual({
        reviews: [],
        isReviewsLoaded: false
      });
  });

  it(`Reducer should fill reviews list and set isReviewsLoaded true in state after load from server`, () => {
    const state = {
      reviews: [],
      isReviewsLoaded: false
    };

    const loadReviews = {
      type: ActionType.LOAD_REVIEWS,
      payload: [
        {
          comment: `Beautiful space, fantastic location and atmosphere, really a wonderful place to spend a few days. Will be back.`,
          date: `2021-03-07T08:04:28.647Z`,
          id: 1,
          rating: 2,
          user: {id: 18, isPro: true, name: `Sophie`, avatarUrl: `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/9.jpg`}
        },
        {
          comment: `What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river!`,
          date: `2021-03-07T08:04:28.647Z`,
          id: 2,
          rating: 4,
          user: {id: 15, isPro: false, name: `Kendall`, avatarUrl: `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/6.jpg`}
        }
      ]
    };

    expect(reviews(state, loadReviews))
      .toEqual({
        reviews: [
          {
            comment: `Beautiful space, fantastic location and atmosphere, really a wonderful place to spend a few days. Will be back.`,
            date: `2021-03-07T08:04:28.647Z`,
            id: 1,
            rating: 2,
            user: {id: 18, isPro: true, name: `Sophie`, avatarUrl: `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/9.jpg`}
          },
          {
            comment: `What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river!`,
            date: `2021-03-07T08:04:28.647Z`,
            id: 2,
            rating: 4,
            user: {id: 15, isPro: false, name: `Kendall`, avatarUrl: `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/6.jpg`}
          }
        ],
        isReviewsLoaded: true
      });
  });

  it(`Reducer should set isReviewsLoaded flag in state`, () => {
    const state = {
      reviews: [],
      isReviewsLoaded: false
    };

    const setisReviewsLoaded = {
      type: ActionType.SET_REVIEWS_IS_LOADED,
      payload: true
    };

    expect(reviews(state, setisReviewsLoaded))
      .toEqual({
        reviews: [],
        isReviewsLoaded: true
      });
  });
});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to /comments`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeReviews = [
      {
        comment: `Beautiful space, fantastic location and atmosphere, really a wonderful place to spend a few days. Will be back.`,
        date: `2021-03-07T08:04:28.647Z`,
        id: 1,
        rating: 2,
        user: {id: 18, isPro: true, name: `Sophie`, avatarUrl: `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/9.jpg`}
      },
      {
        comment: `What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river!`,
        date: `2021-03-07T08:04:28.647Z`,
        id: 2,
        rating: 4,
        user: {id: 15, isPro: false, name: `Kendall`, avatarUrl: `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/6.jpg`}
      }
    ];
    const reviewsLoader = fetchReviewsList(10);

    apiMock
      .onGet(`${APIRoute.REVIEWS}/10`)
      .reply(200, fakeReviews);

    return reviewsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: fakeReviews,
        });
      });
  });

  it(`Should make a correct API call to post comment to /comments`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    const fakeReviewFormData = {
      rating: 4,
      comment: `Meow!  Meow!  Meow!  Meow!  Meow!  Meow!  Meow!  Meow!  Meow!  Meow!  Meow!  Meow!  Meow!`
    };

    const fakeReviews = [
      {
        comment: `Beautiful space, fantastic location and atmosphere, really a wonderful place to spend a few days. Will be back.`,
        date: `2021-03-07T08:04:28.647Z`,
        id: 1,
        rating: 2,
        user: {id: 18, isPro: true, name: `Sophie`, avatarUrl: `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/9.jpg`}
      },
      {
        comment: `What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river!`,
        date: `2021-03-07T08:04:28.647Z`,
        id: 2,
        rating: 4,
        user: {id: 15, isPro: false, name: `Kendall`, avatarUrl: `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/6.jpg`}
      },
      {
        comment: `Meow!  Meow!  Meow!  Meow!  Meow!  Meow!  Meow!  Meow!  Meow!  Meow!  Meow!  Meow!  Meow!`,
        date: `2021-03-07T08:04:28.647Z`,
        id: 3,
        rating: 4,
        user: {id: 777, isPro: false, name: `keks`, avatarUrl: `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/6.jpg`}
      }
    ];

    const reviewPoster = postReview({id: 10, reviewFormData: fakeReviewFormData});

    apiMock
      .onPost(`${APIRoute.REVIEWS}/10`)
      .reply(200, fakeReviews);

    return reviewPoster(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: fakeReviews,
        });
      });
  });
});
