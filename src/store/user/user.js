import {ActionType} from '../action';
import {AuthorizationStatus, emptyUser} from '../../const';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  AuthInfo: emptyUser
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.AUTHENTICATE:
      return {
        ...state,
        AuthInfo: action.payload,
      };
    default:
      return state;
  }
};

export {user};
