import {cities} from '../const.js';

export const ActionType = {
  CHANGE_CITY: `/changeCity`,
  FILL_OFFERS_LIST: `/fillOffersList`,
  LOAD_OFFERS: `data/loadOffers`,
};

export const changeCity = (city) => {
  const newCity = {
    "name": cities[city].name,
    "lat": cities[city].coords[0],
    "lng": cities[city].coords[1],
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

export const loadOffers = (data) => ({
  type: ActionType.LOAD_OFFERS,
  payload: Array.isArray(data) ? data : [data]
});


