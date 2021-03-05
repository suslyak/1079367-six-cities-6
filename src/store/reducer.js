import {ActionType} from './action';
import {cities} from '../const.js';
import offers from '../mocks/offers.js';

const initialCity = cities[`Paris`];

const initialState = {
  city: {
    "name": initialCity.name,
    "lat": initialCity.coords[0],
    "lng": initialCity.coords[1],
    "zoom": 12
  },
  offers: offers.filter((offer) => offer.city.name === initialCity.name)
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.payload
      };

    case ActionType.FILL_OFFERS_LIST:
      return {
        ...state,
        offers: offers.filter((offer) => offer.city.name === action.payload)
      };

    default:
      return state;
  }
};

export {reducer};
