import {cities} from '../const.js';

export const ActionType = {
  CHANGE_CITY: `/changeCity`,
  FILL_OFFERS_LIST: `/fillOffersList`,
};

export const ActionCreator = {
  changeCity: (city) => {
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
  },
  fillOffersList: (city) => ({
    type: ActionType.FILL_OFFERS_LIST,
    payload: city,
  })
};
