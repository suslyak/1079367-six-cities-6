import {loadOffers, fillOffersList} from "./action";

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
);
