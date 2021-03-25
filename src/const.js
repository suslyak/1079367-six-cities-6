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
      "avatar_url": PropTypes.string,
      "id": PropTypes.number.isRequired,
      "is_pro": PropTypes.bool.isRequired,
      "name": PropTypes.string.isRequired
    }),
    "id": PropTypes.number.isRequired,
    "images": PropTypes.arrayOf(PropTypes.string),
    "is_favorite": PropTypes.bool.isRequired,
    "is_premium": PropTypes.bool.isRequired,
    "location": PropTypes.shape({
      "latitude": PropTypes.number.isRequired,
      "longitude": PropTypes.number.isRequired,
      "zoom": PropTypes.number.isRequired
    }),
    "max_adults": PropTypes.number.isRequired,
    "preview_image": PropTypes.string.isRequired,
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
      "avatar_url": PropTypes.string,
      "id": PropTypes.number.isRequired,
      "is_pro": PropTypes.bool.isRequired,
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

export const cities = {
  "Paris": {name: `Paris`, coords: [48.86471, 2.35]},
  "Cologne": {name: `Cologne`, coords: [50.93753, 6.96]},
  "Brussels": {name: `Brussels`, coords: [50.85034, 4.35]},
  "Amsterdam": {name: `Amsterdam`, coords: [52.38333, 4.9]},
  "Hamburg": {name: `Hamburg`, coords: [53.55108, 10]},
  "Dusseldorf": {name: `Dusseldorf`, coords: [51.22172, 6.77]}
};

export const Sorting = {
  POPULAR: `Popular`,
  PRICE_LOW_TO_HIGH: `Price: low to high`,
  PRICE_HIGH_TO_LOW: `Price: high to low`,
  TOP_RATED_FIRST: `Top rated first`
};
