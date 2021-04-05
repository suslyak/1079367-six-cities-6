import {ActionType} from '../action';
import {AuthorizationStatus, emptyUser} from '../../const';

const initialState = {
  authorizationStatus: AuthorizationStatus.AUTH,
  authorizationInProcess: false,
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
    case ActionType.SET_AUTHORIZATHION_IN_PROCESS:
      return {
        ...state,
        authorizationInProcess: action.payload,
      };
    default:
      return state;
  }
};

export {user};
