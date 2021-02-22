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
  })
};

