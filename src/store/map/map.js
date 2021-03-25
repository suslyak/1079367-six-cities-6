import {ActionType} from '../action';

const initialState = {
  currentOffer: null
};

const map = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CURRENT_OFFER:
      return {
        ...state,
        currentOffer: action.payload,
      };
    default:
      return state;
  }
};

export {map};

