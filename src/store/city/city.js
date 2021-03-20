import {ActionType} from '../action';
import {cities} from '../../const.js';

const initialCity = cities[`Paris`];

const initialState = {
  city: {
    "name": initialCity.name,
    "lat": initialCity.coords[0],
    "lng": initialCity.coords[1],
    "zoom": 12
  }
};

const city = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.payload
      };
    default:
      return state;
  }
};

export {city};