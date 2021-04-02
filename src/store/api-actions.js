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

import {AuthorizationStatus, emptyUser} from "../const";

export const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(`/hotels`)
    .then(({data}) => {
      dispatch(loadOffers(data));
    })
);

export const fetchOffer = (offerId) => (dispatch, _getState, api) => (
  api.get(`/hotels/${offerId}`)
    .then(({data}) => {
      dispatch(fillOffersList(data));
    })
    .catch((error) => {
      if (error.response.status === 404) {
        dispatch(redirectToRoute(`/404`));
      }
    })
);

export const fetchReviewsList = (offerId) => (dispatch, _getState, api) => (
  api.get(`/comments/${offerId}`)
    .then(({data}) => {
      dispatch(loadReviews(data));
    })
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then(({data}) => {
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(authenticate(data));
    })
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(`/login`, {email, password})
    .then(({data}) => {
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(authenticate(data));
    })
    .then(() => dispatch(redirectToRoute(`/`)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.get(`/logout`)
    .then(() => {
      dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH));
      dispatch(authenticate(emptyUser));
    })
    .then(() => dispatch(redirectToRoute(`/`)))
);

export const postReview = ({id, reviewFormData}) => (dispatch, _getState, api) => (
  api.post(`/comments/${id}`, reviewFormData)
    .then(({data}) => {
      dispatch(loadReviews(data));
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(redirectToRoute(`/login`));
      }
    })
);

export const changeFavorite = ({id, status}) => (dispatch, _getState, api) => (
  api.post(`/favorite/${id}/${status}`)
  .then(({data}) => {
    dispatch(updateAllOffers(data));
    dispatch(updateFavorites(data));
  })
  .catch((error) => {
    if (error.response.status === 401) {
      dispatch(redirectToRoute(`/login`));
    }
  })
);

export const fetchFavoritesList = () => (dispatch, _getState, api) => {
  api.get(`/favorite`)
    .then(({data}) => {
      dispatch(setFavoritesIsLoaded(true));
      dispatch(fillFavoritesList(data));
    });
};

export const fetchNearOffersList = (offerId) => (dispatch, _getState, api) => (
  api.get(`/hotels/${offerId}/nearby`)
    .then(({data}) => {
      dispatch(fillNearOffersList(data));
    })
);


