import {NameSpace} from '../root-reducer';

export const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus;
export const getAuthInfo = (state) => state[NameSpace.USER].AuthInfo;
