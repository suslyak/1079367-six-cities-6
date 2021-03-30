import {ActionType} from '../action';

const initialState = {
  mouseHoverOffer: null
};

const map = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CURRENT_OFFER:
      return {
        ...state,
        mouseHoverOffer: action.payload,
      };
    default:
      return state;
  }
};

export {map};

