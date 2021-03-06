import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import {user} from './user';
import {
  ActionType
} from '../action';
import {checkAuth, login, logout} from '../api-actions';
import {AuthorizationStatus, emptyUser, APIRoute, AppRoute} from '../../const.js';
import Adapter from '../../services/adapter';

const api = createAPI(() => {}, () => {});

describe(`Reducer 'user' work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(user(undefined, {}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        authorizationInProcess: false,
        AuthInfo: emptyUser
      });
  });

  it(`Reducer should require authozrization`, () => {
    const state = {
      authorizationStatus: AuthorizationStatus.AUTH,
      authorizationInProcess: false,
      AuthInfo: {
        "avatarUrl": `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/3.jpg`,
        "email": `keks@htmlacattdemy.ru`,
        "id": 1,
        "isPro": false,
        "name": `keks`
      }
    };

    const requireAuthorization = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH
    };

    expect(user(state, requireAuthorization))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        authorizationInProcess: false,
        AuthInfo: {
          "avatarUrl": `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/3.jpg`,
          "email": `keks@htmlacattdemy.ru`,
          "id": 1,
          "isPro": false,
          "name": `keks`
        }
      });
  });

  it(`Reducer should authenticate user properly`, () => {
    const state = {
      authorizationStatus: AuthorizationStatus.AUTH,
      authorizationInProcess: false,
      AuthInfo: emptyUser
    };

    const authenticate = {
      type: ActionType.AUTHENTICATE,
      payload: {
        "avatarUrl": `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/3.jpg`,
        "email": `keks@htmlacattdemy.ru`,
        "id": 1,
        "isPro": false,
        "name": `keks`
      }
    };

    expect(user(state, authenticate))
      .toEqual({
        authorizationStatus: AuthorizationStatus.AUTH,
        authorizationInProcess: false,
        AuthInfo: {
          "avatarUrl": `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/3.jpg`,
          "email": `keks@htmlacattdemy.ru`,
          "id": 1,
          "isPro": false,
          "name": `keks`
        }
      });
  });

  it(`Reducer should set flag if authorization in process`, () => {
    const state = {
      authorizationStatus: AuthorizationStatus.AUTH,
      authorizationInProcess: true,
      AuthInfo: {
        "avatarUrl": `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/3.jpg`,
        "email": `keks@htmlacattdemy.ru`,
        "id": 1,
        "isPro": false,
        "name": `keks`
      }
    };

    const setAuthorizationInProcess = {
      type: ActionType.SET_AUTHORIZATHION_IN_PROCESS,
      payload: false
    };

    expect(user(state, setAuthorizationInProcess))
      .toEqual({
        authorizationStatus: AuthorizationStatus.AUTH,
        authorizationInProcess: false,
        AuthInfo: {
          "avatarUrl": `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/3.jpg`,
          "email": `keks@htmlacattdemy.ru`,
          "id": 1,
          "isPro": false,
          "name": `keks`
        }
      });
  });
});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to /login to check auth`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthLoader = checkAuth();

    apiMock
      .onGet(APIRoute.LOGIN)
      .reply(200, emptyUser);

    return checkAuthLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.AUTHENTICATE,
          payload: Adapter.USER.fromApi(emptyUser)
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.SET_AUTHORIZATHION_IN_PROCESS,
          payload: false,
        });
      });
  });

  it(`Should make a correct API call to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {email: `keks@htmlacattdemy.ru`, password: `123`};
    const fakeUserData = {
      "avatar_url": `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/3.jpg`,
      "email": `keks@htmlacattdemy.ru`,
      "id": 1,
      "is_pro": false,
      "name": `keks`
    };
    const loginLoader = login(fakeUser);

    apiMock
      .onPost(APIRoute.LOGIN)
      .reply(200, fakeUserData);

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.AUTHENTICATE,
          payload: Adapter.USER.fromApi(fakeUserData),
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: AppRoute.ROOT,
        });
      });
  });

  it(`Should make a correct API call to /logout`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthLoader = logout();

    apiMock
      .onGet(APIRoute.LOGOUT)
      .reply(200);

    return checkAuthLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.NO_AUTH,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.AUTHENTICATE,
          payload: emptyUser,
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: AppRoute.ROOT,
        });
      });
  });
});
