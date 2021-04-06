import {ActionType} from '../action';
import {City} from '../../const.js';

const initialCity = City[`Paris`];

const initialState = {
  city: initialCity
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
