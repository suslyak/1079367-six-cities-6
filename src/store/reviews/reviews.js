import {ActionType} from '../action';

const initialState = {
  reviews: [],
  isReviewsLoaded: false
};

const reviews = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
        isReviewsLoaded: true
      };
    case ActionType.SET_REVIEWS_IS_LOADED:
      return {
        ...state,
        isReviewsLoaded: action.payload
      };
    default:
      return state;
  }
};

export {reviews};
