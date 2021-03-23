import {combineReducers} from 'redux';
import {city} from './city/city';
import {offers} from './offers/offers';
import {reviews} from './reviews/reviews';

export const NameSpace = {
  CITY: `CITY`,
  OFFERS: `OFFERS`,
  REVIEWS: `REVIEWS`
};

export default combineReducers({
  [NameSpace.CITY]: city,
  [NameSpace.OFFERS]: offers,
  [NameSpace.REVIEWS]: reviews
});
