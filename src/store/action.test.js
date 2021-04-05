import {
  fillOffersList,
  fillNearOffersList,
  fillFavoritesList,
  loadOffers,
  updateAllOffers,
  updateOffers,
  updateFavorites,
  loadReviews,
  setOffersIsLoaded,
  setReviewsIsLoaded,
  setFavoritesIsLoaded,
  setAuthorizationInProcess,
  changeSorting,
  changeCurrentOffer,
  requireAuthorization,
  authenticate,
  redirectToRoute,
  ActionType
} from './action';
import {AuthorizationStatus, Sorting} from '../const';

describe(`Action creators work correctly`, () => {
  it(`Action creator for filling offers list returns correct action`, () => {
    const expectedAction = {
      type: ActionType.FILL_OFFERS_LIST,
      payload: [],
    };

    expect(fillOffersList([])).toEqual(expectedAction);
  });

  it(`Action creator for filling near offers list returns correct action`, () => {
    const expectedAction = {
      type: ActionType.FILL_NEAR_OFFERS_LIST,
      payload: [],
    };

    expect(fillNearOffersList([])).toEqual(expectedAction);
  });

  it(`Action creator for filling favorites list returns correct action`, () => {
    const expectedAction = {
      type: ActionType.FILL_FAVORITES_LIST,
      payload: [],
    };

    expect(fillFavoritesList([])).toEqual(expectedAction);
  });

  it(`Action creator for filling all offers list returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_OFFERS,
      payload: [],
    };

    expect(loadOffers([])).toEqual(expectedAction);
  });

  it(`Action creator for updating all offers list returns correct action`, () => {
    const expectedAction = {
      type: ActionType.UPDATE_ALLOFFERS,
      payload: {},
    };

    expect(updateAllOffers({})).toEqual(expectedAction);
  });

  it(`Action creator for updating offers list returns correct action`, () => {
    const expectedAction = {
      type: ActionType.UPDATE_OFFERS,
      payload: {},
    };

    expect(updateOffers({})).toEqual(expectedAction);
  });

  it(`Action creator for updating favorites list returns correct action`, () => {
    const expectedAction = {
      type: ActionType.UPDATE_FAVORITES,
      payload: {},
    };

    expect(updateFavorites({})).toEqual(expectedAction);
  });
  it(`Action creator for filling reviews list returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_REVIEWS,
      payload: [],
    };

    expect(loadReviews([])).toEqual(expectedAction);
  });

  it(`Action creator for setting offers loading flag returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_OFFERS_IS_LOADED,
      payload: false,
    };

    expect(setOffersIsLoaded(false)).toEqual(expectedAction);
  });

  it(`Action creator for setting reviews loading flag returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_REVIEWS_IS_LOADED,
      payload: true,
    };

    expect(setReviewsIsLoaded(true)).toEqual(expectedAction);
  });

  it(`Action creator for setting favorites loading flag returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_FAVORITES_IS_LOADED,
      payload: false,
    };

    expect(setFavoritesIsLoaded(false)).toEqual(expectedAction);
  });

  it(`Action creator for setting authorization in process flag returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_AUTHORIZATHION_IN_PROCESS,
      payload: false,
    };

    expect(setAuthorizationInProcess(false)).toEqual(expectedAction);
  });

  it(`Action creator for require authorization returns correct action`, () => {
    const expectedAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    };

    expect(requireAuthorization(AuthorizationStatus.NO_AUTH)).toEqual(expectedAction);
  });
  it(`Action creator for changing sorting type returns correct action`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_SORTING,
      payload: Sorting.TOP_RATED_FIRST,
    };

    expect(changeSorting(Sorting.TOP_RATED_FIRST)).toEqual(expectedAction);
  });
  it(`Action creator for changing current offer returns correct action`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_CURRENT_OFFER,
      payload: 101,
    };

    expect(changeCurrentOffer(101)).toEqual(expectedAction);
  });

  it(`Action creator for authentication returns correct action`, () => {
    const expectedAction = {
      type: ActionType.AUTHENTICATE,
      payload: AuthorizationStatus.AUTH,
    };

    expect(authenticate(AuthorizationStatus.AUTH)).toEqual(expectedAction);
  });

  it(`Action creator for redirecting returns correct action`, () => {
    const expectedAction = {
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: `/login`,
    };

    expect(redirectToRoute(`/login`)).toEqual(expectedAction);
  });
});

