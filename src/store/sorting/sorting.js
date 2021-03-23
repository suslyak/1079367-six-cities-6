import {ActionType} from '../action';
import {Sorting} from '../../const.js';

const initialState = {
  currentOffersSortingType: Object.keys(Sorting)[0]
};

const sorting = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_SORTING:
      return {
        ...state,
        currentOffersSortingType: action.payload,
      };
    default:
      return state;
  }
};

export {sorting};
