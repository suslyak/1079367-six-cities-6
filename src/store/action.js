import {City} from '../const.js';

export const ActionType = {
  CHANGE_CITY: `/changeCity`,
  FILL_OFFERS_LIST: `/fillOffersList`,
  FILL_NEAR_OFFERS_LIST: `/fillNearOffersList`,
  FILL_FAVORITES_LIST: `/fillFavoritesList`,
  SET_OFFERS_IS_LOADED: `/setOffersIsLoaded`,
  SET_REVIEWS_IS_LOADED: `/setReviewsIsLoaded`,
  SET_FAVORITES_IS_LOADED: `/setFavoritesIsLoaded`,
  LOAD_OFFERS: `data/loadOffers`,
  UPDATE_ALLOFFERS: `data/updateAllOffers`,
  UPDATE_OFFERS: `data/updateOffers`,
  UPDATE_FAVORITES: `data/updateFavorites`,
  LOAD_REVIEWS: `data/loadReviews`,
  CHANGE_SORTING: `/changeSorting`,
  CHANGE_CURRENT_OFFER: `/changeCurrentOffer`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  AUTHENTICATE: `user/authenticate`,
  REDIRECT_TO_ROUTE: `app/redirectToRoute`
};

export const changeCity = (city) => {
  const newCity = {
    "name": City[city].name,
    "lat": City[city].coords[0],
    "lng": City[city].coords[1],
    "zoom": 12
  };

  return {
    type: ActionType.CHANGE_CITY,
    payload: newCity,
  };
};

export const fillOffersList = (data) => ({
  type: ActionType.FILL_OFFERS_LIST,
  payload: Array.isArray(data) ? data : [data]
});

export const fillNearOffersList = (data) => ({
  type: ActionType.FILL_NEAR_OFFERS_LIST,
  payload: Array.isArray(data) ? data : [data]
});

export const fillFavoritesList = (data) => ({
  type: ActionType.FILL_FAVORITES_LIST,
  payload: Array.isArray(data) ? data : [data]
});

export const loadOffers = (data) => ({
  type: ActionType.LOAD_OFFERS,
  payload: Array.isArray(data) ? data : [data]
});

export const updateAllOffers = (data) => ({
  type: ActionType.UPDATE_ALLOFFERS,
  payload: data
});

export const updateOffers = (data) => ({
  type: ActionType.UPDATE_OFFERS,
  payload: data
});

export const updateFavorites = (data) => ({
  type: ActionType.UPDATE_FAVORITES,
  payload: data
});

export const loadReviews = (data) => ({
  type: ActionType.LOAD_REVIEWS,
  payload: data
});
export const setOffersIsLoaded = (data) => ({
  type: ActionType.SET_OFFERS_IS_LOADED,
  payload: data
});

export const setReviewsIsLoaded = (data) => ({
  type: ActionType.SET_REVIEWS_IS_LOADED,
  payload: data
});

export const setFavoritesIsLoaded = (data) => ({
  type: ActionType.SET_FAVORITES_IS_LOADED,
  payload: data
});

export const changeSorting = (sorting) => ({
  type: ActionType.CHANGE_SORTING,
  payload: sorting,
});

export const changeCurrentOffer = (id) => ({
  type: ActionType.CHANGE_CURRENT_OFFER,
  payload: id,
});

export const requireAuthorization = (status) => ({
  type: ActionType.REQUIRED_AUTHORIZATION,
  payload: status,
});

export const authenticate = (data) => ({
  type: ActionType.AUTHENTICATE,
  payload: data,
});

export const redirectToRoute = (url) => ({
  type: ActionType.REDIRECT_TO_ROUTE,
  payload: url,
});
