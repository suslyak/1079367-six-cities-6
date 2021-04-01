import {ActionType} from '../action';

const initialState = {
  offers: [],
  allOffers: [],
  nearOffers: [],
  favorites: [],
  isOffersLoaded: false,
  isFavoritesLoaded: false
};

const updateArrayStateField = (state, update) => {
  const index = state.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return [update];
  }

  return [
    ...state.slice(0, index),
    update,
    ...state.slice(index + 1)
  ];
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
    case ActionType.FILL_NEAR_OFFERS_LIST:
      return {
        ...state,
        nearOffers: action.payload
      };
    case ActionType.FILL_FAVORITES_LIST:
      return {
        ...state,
        favorites: action.payload
      };
    case ActionType.UPDATE_ALLOFFERS:
      return {
        ...state,
        allOffers: updateArrayStateField(state.allOffers, action.payload),
      };
    case ActionType.UPDATE_OFFERS:
      return {
        ...state,
        offers: updateArrayStateField(state.offers, action.payload)
      };
    case ActionType.UPDATE_FAVORITES:
      return {
        ...state,
        favorites: updateArrayStateField(state.favorites, action.payload)
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
