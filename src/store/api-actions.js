import {
  loadOffers,
  fillOffersList,
  loadReviews,
  requireAuthorization,
  authenticate,
  redirectToRoute,
  setFavoritesIsLoaded,
  updateFavorites,
  updateAllOffers,
  fillNearOffersList,
  fillFavoritesList} from "./action";

import {AuthorizationStatus, emptyUser, APIRoute, AppRoute} from "../const";

export const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.OFFERS)
    .then(({data}) => {
      dispatch(loadOffers(data));
    })
);

export const fetchOffer = (offerId) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.OFFERS}/${offerId}`)
    .then(({data}) => {
      dispatch(fillOffersList(data));
    })
    .catch((error) => {
      if (error.response.status === 404) {
        dispatch(redirectToRoute(AppRoute.NOT_FOUND));
      }
    })
);

export const fetchReviewsList = (offerId) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.REVIEWS}/${offerId}`)
    .then(({data}) => {
      dispatch(loadReviews(data));
    })
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(({data}) => {
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(authenticate(data));
    })
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => {
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(authenticate(data));
    })
    .then(() => dispatch(redirectToRoute(AppRoute.ROOT)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGOUT)
    .then(() => {
      dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH));
      dispatch(authenticate(emptyUser));
    })
    .then(() => dispatch(redirectToRoute(AppRoute.ROOT)))
);

export const postReview = ({id, reviewFormData}, onSuccess, onFail) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.REVIEWS}/${id}`, reviewFormData)
    .then(({data}) => {
      dispatch(loadReviews(data));
      onSuccess();
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(redirectToRoute(AppRoute.LOGIN));
      }
      onFail(`${error.response.data.error} (${error.response.statusText})`);
    })
);

export const changeFavorite = ({id, status}) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.FAVORITE}/${id}/${status}`)
  .then(({data}) => {
    dispatch(updateAllOffers(data));
    dispatch(updateFavorites(data));
  })
  .catch((error) => {
    if (error.response.status === 401) {
      dispatch(redirectToRoute(AppRoute.LOGIN));
    }
  })
);

export const fetchFavoritesList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FAVORITE)
    .then(({data}) => {
      dispatch(setFavoritesIsLoaded(true));
      dispatch(fillFavoritesList(data));
    })
);

export const fetchNearOffersList = (offerId) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.OFFERS}/${offerId}/${APIRoute.NEAROFFERS}`)
    .then(({data}) => {
      dispatch(fillNearOffersList(data));
    })
);
