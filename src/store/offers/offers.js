import {ActionType} from '../action';

const initialState = {
  offers: [],
  allOffers: [],
  isOffersLoaded: false
};

const offers = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return {
        ...state,
        allOffers: action.payload,
        isOffersLoaded: true
      };

    case ActionType.FILL_OFFERS_LIST:
      return {
        ...state,
        offers: action.payload
      };

    default:
      return state;
  }
};

export {offers};
