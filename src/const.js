import PropTypes from 'prop-types';

export const PropValidation = {
  "OFFER": PropTypes.shape({
    "bedrooms": PropTypes.number.isRequired,
    "city": PropTypes.shape({
      "location": PropTypes.shape({
        "latitude": PropTypes.number.isRequired,
        "longitude": PropTypes.number.isRequired,
        "zoom": PropTypes.number.isRequired
      }),
      "name": PropTypes.string.isRequired
    }),
    "description": PropTypes.string.isRequired,
    "goods": PropTypes.arrayOf(PropTypes.string),
    "host": PropTypes.shape({
      "avatarUrl": PropTypes.string,
      "id": PropTypes.number.isRequired,
      "isPro": PropTypes.bool.isRequired,
      "name": PropTypes.string.isRequired
    }),
    "id": PropTypes.number.isRequired,
    "images": PropTypes.arrayOf(PropTypes.string),
    "isFavorite": PropTypes.bool.isRequired,
    "isPremium": PropTypes.bool.isRequired,
    "location": PropTypes.shape({
      "latitude": PropTypes.number.isRequired,
      "longitude": PropTypes.number.isRequired,
      "zoom": PropTypes.number.isRequired
    }),
    "maxAdults": PropTypes.number.isRequired,
    "previewImage": PropTypes.string.isRequired,
    "price": PropTypes.number.isRequired,
    "rating": PropTypes.number,
    "title": PropTypes.string.isRequired,
    "type": PropTypes.string.isRequired
  }),
  "REVIEW": PropTypes.shape({
    "comment": PropTypes.string.isRequired,
    "date": PropTypes.string.isRequired,
    "id": PropTypes.number.isRequired,
    "rating": PropTypes.number.isRequired,
    "user": PropTypes.shape({
      "avatarUrl": PropTypes.string,
      "id": PropTypes.number.isRequired,
      "isPro": PropTypes.bool.isRequired,
      "name": PropTypes.string.isRequired
    })
  }),
  "CITY": PropTypes.shape({
    name: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }),
  "POINTS": PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  }))
};

export const City = {
  "Paris": {name: `Paris`, location: {latitude: 48.86471, longitude: 2.35, zoom: 12}},
  "Cologne": {name: `Cologne`, location: {latitude: 50.93753, longitude: 6.96, zoom: 12}},
  "Brussels": {name: `Brussels`, location: {latitude: 50.85034, longitude: 4.35, zoom: 12}},
  "Amsterdam": {name: `Amsterdam`, location: {latitude: 52.38333, longitude: 4.9, zoom: 12}},
  "Hamburg": {name: `Hamburg`, location: {latitude: 53.55108, longitude: 10, zoom: 12}},
  "Dusseldorf": {name: `Dusseldorf`, location: {latitude: 51.22172, longitude: 6.77, zoom: 12}}
};

export const Sorting = {
  POPULAR: `Popular`,
  PRICE_LOW_TO_HIGH: `Price: low to high`,
  PRICE_HIGH_TO_LOW: `Price: high to low`,
  TOP_RATED_FIRST: `Top rated first`
};

export const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

export const emptyUser = {
  "avatarUrl": null,
  "email": null,
  "id": null,
  "isPro": null,
  "name": null
};

export const APIRoute = {
  "LOGIN": `/login`,
  "LOGOUT": `/logout`,
  "OFFERS": `/hotels`,
  "NEAROFFERS": `nearby`,
  "REVIEWS": `/comments`,
  "FAVORITE": `/favorite`,
};

export const AppRoute = {
  ROOT: `/`,
  NOT_FOUND: `/404`,
  LOGIN: `/login`,
  ROOM: `/offer/:id`,
  FAVORITES: `/favorites`,
};

export const API_ERROR_COLOR = `#ff7171`;

export const DefaultCardImageSize = {
  FAVORITES: {width: 150, height: 110},
  REGULAR: {width: 260, height: 200}
};

export const MAP_ZOOM = 12;
export const MAP_ICON_SIZE = [27, 39];

export const MapIcon = {
  REGULAR: `./img/pin.svg`,
  ACTIVE: `./img/pin-active.svg`
};

export const NEAR_OFFERS_MAX_ON_PAGE = 3;
export const OFFER_PICTURES_MAX_ON_PAGE = 6;

export const MAX_REVIEWS_ON_PAGE = 10;

export const MAX_COMMENT_LENGTH = 300;
export const MIN_COMMENT_LENGTH = 50;

export const HttpCode = {
  UNAUTHORIZED: 401,
  NOT_FOUND: 404
};

