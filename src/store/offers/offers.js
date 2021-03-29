import {ActionType} from '../action';

const initialState = {
  offers: [],
  allOffers: [],
  isOffersLoaded: false,
  isFavoritesLoaded: false
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
    case ActionType.UPDATE_OFFERS:
      return {
        ...state,
        allOffers: state.allOffers.map((offer) => {
          if (offer.id === action.payload.id) {
            return action.payload;
          }
          return offer;
        })
      };
    case ActionType.SET_FAVORITES_IS_LOADED:
      return {
        ...state,
        isFavoritesLoaded: action.payload
      };
    default:
      return state;
  }
};

export {offers};
