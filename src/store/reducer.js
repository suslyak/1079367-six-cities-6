import {ActionType} from './action';
import {cities} from '../const.js';

const initialCity = cities[`Paris`];

const initialState = {
  city: {
    "name": initialCity.name,
    "lat": initialCity.coords[0],
    "lng": initialCity.coords[1],
    "zoom": 12
  },
  offers: [],
  reviews: [],
  allOffers: [],
  isOffersLoaded: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.payload
      };

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

export {reducer};
