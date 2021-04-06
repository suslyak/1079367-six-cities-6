import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import {offers} from './offers';
import {
  ActionType
} from '../action';
import {
  fetchOffersList,
  fetchOffer,
  fetchNearOffersList,
  fetchFavoritesList,
  changeFavorite
} from '../api-actions';
import {APIRoute} from '../../const.js';

import Adapter from '../../services/adapter';

const api = createAPI(() => {}, () => {});

describe(`Reducer 'offers' work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(offers(undefined, {}))
      .toEqual({
        offers: [],
        allOffers: [],
        nearOffers: [],
        favorites: [],
        isOffersLoaded: false,
        isFavoritesLoaded: false
      });
  });

  it(`Reducer should fill all offers list and set isOffersLoaded flag true in state after loading from server`, () => {
    const state = {
      offers: [],
      allOffers: [],
      nearOffers: [],
      favorites: [],
      isOffersLoaded: false,
      isFavoritesLoaded: false
    };

    const loadOffers = {
      type: ActionType.LOAD_OFFERS,
      payload: [
        {city: {name: `Paris`}, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]},
        {city: {name: `Paris`}, images: new Array(14), title: `Waterfront with extraordinary view`, goods: [`Air conditioning`, `Laptop friendly workspace`]},
        {city: {name: `Paris`}, images: new Array(14), title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Air conditioning`, `Laptop friendly workspace`, `Washer`]},
        {city: {name: `Paris`}, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]},
        {city: {name: `Cologne`}, images: new Array(14), title: `The Joshua Tree House`, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`]},
        {city: {name: `Cologne`}, images: new Array(14), title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Breakfast`, `Air conditioning`, `Washer`]},
        {city: {name: `Cologne`}, images: new Array(14), title: `Nice, cozy, warm big bed apartment`, goods: [`Air conditioning`, `Laptop friendly workspace`, `Washer`]},
        {city: {name: `Amsterdam`}, images: new Array(14), title: `The Joshua Tree House`, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`]},
        {city: {name: `Amsterdam`}, images: new Array(14), title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Breakfast`, `Laptop friendly workspace`, `Washer`]},
        {city: {name: `Amsterdam`}, images: new Array(14), title: `Amazing and Extremely Central Flat`, goods: [`Air conditioning`, `Laptop friendly workspace`, `Washer`]},
        {city: {name: `Hamburg`}, images: new Array(14), title: `Canal View Prinsengracht`, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]}
      ]
    };

    expect(offers(state, loadOffers))
      .toEqual({
        offers: [],
        allOffers: [
          {city: {name: `Paris`}, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]},
          {city: {name: `Paris`}, images: new Array(14), title: `Waterfront with extraordinary view`, goods: [`Air conditioning`, `Laptop friendly workspace`]},
          {city: {name: `Paris`}, images: new Array(14), title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Air conditioning`, `Laptop friendly workspace`, `Washer`]},
          {city: {name: `Paris`}, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]},
          {city: {name: `Cologne`}, images: new Array(14), title: `The Joshua Tree House`, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`]},
          {city: {name: `Cologne`}, images: new Array(14), title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Breakfast`, `Air conditioning`, `Washer`]},
          {city: {name: `Cologne`}, images: new Array(14), title: `Nice, cozy, warm big bed apartment`, goods: [`Air conditioning`, `Laptop friendly workspace`, `Washer`]},
          {city: {name: `Amsterdam`}, images: new Array(14), title: `The Joshua Tree House`, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`]},
          {city: {name: `Amsterdam`}, images: new Array(14), title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Breakfast`, `Laptop friendly workspace`, `Washer`]},
          {city: {name: `Amsterdam`}, images: new Array(14), title: `Amazing and Extremely Central Flat`, goods: [`Air conditioning`, `Laptop friendly workspace`, `Washer`]},
          {city: {name: `Hamburg`}, images: new Array(14), title: `Canal View Prinsengracht`, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]}
        ],
        nearOffers: [],
        favorites: [],
        isOffersLoaded: true,
        isFavoritesLoaded: false
      });
  });

  it(`Reducer should fill offers list in state`, () => {
    const state = {
      offers: [],
      allOffers: [],
      nearOffers: [],
      favorites: [],
      isOffersLoaded: false,
      isFavoritesLoaded: false
    };

    const fillOffersList = {
      type: ActionType.FILL_OFFERS_LIST,
      payload: [
        {city: {name: `Paris`}, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]},
        {city: {name: `Paris`}, images: new Array(14), title: `Waterfront with extraordinary view`, goods: [`Air conditioning`, `Laptop friendly workspace`]},
        {city: {name: `Paris`}, images: new Array(14), title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Air conditioning`, `Laptop friendly workspace`, `Washer`]},
        {city: {name: `Paris`}, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]},
        {city: {name: `Cologne`}, images: new Array(14), title: `The Joshua Tree House`, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`]},
        {city: {name: `Cologne`}, images: new Array(14), title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Breakfast`, `Air conditioning`, `Washer`]},
        {city: {name: `Cologne`}, images: new Array(14), title: `Nice, cozy, warm big bed apartment`, goods: [`Air conditioning`, `Laptop friendly workspace`, `Washer`]},
        {city: {name: `Amsterdam`}, images: new Array(14), title: `The Joshua Tree House`, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`]},
        {city: {name: `Amsterdam`}, images: new Array(14), title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Breakfast`, `Laptop friendly workspace`, `Washer`]},
        {city: {name: `Amsterdam`}, images: new Array(14), title: `Amazing and Extremely Central Flat`, goods: [`Air conditioning`, `Laptop friendly workspace`, `Washer`]},
        {city: {name: `Hamburg`}, images: new Array(14), title: `Canal View Prinsengracht`, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]}
      ]
    };

    expect(offers(state, fillOffersList))
      .toEqual({
        offers: [
          {city: {name: `Paris`}, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]},
          {city: {name: `Paris`}, images: new Array(14), title: `Waterfront with extraordinary view`, goods: [`Air conditioning`, `Laptop friendly workspace`]},
          {city: {name: `Paris`}, images: new Array(14), title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Air conditioning`, `Laptop friendly workspace`, `Washer`]},
          {city: {name: `Paris`}, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]},
          {city: {name: `Cologne`}, images: new Array(14), title: `The Joshua Tree House`, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`]},
          {city: {name: `Cologne`}, images: new Array(14), title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Breakfast`, `Air conditioning`, `Washer`]},
          {city: {name: `Cologne`}, images: new Array(14), title: `Nice, cozy, warm big bed apartment`, goods: [`Air conditioning`, `Laptop friendly workspace`, `Washer`]},
          {city: {name: `Amsterdam`}, images: new Array(14), title: `The Joshua Tree House`, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`]},
          {city: {name: `Amsterdam`}, images: new Array(14), title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Breakfast`, `Laptop friendly workspace`, `Washer`]},
          {city: {name: `Amsterdam`}, images: new Array(14), title: `Amazing and Extremely Central Flat`, goods: [`Air conditioning`, `Laptop friendly workspace`, `Washer`]},
          {city: {name: `Hamburg`}, images: new Array(14), title: `Canal View Prinsengracht`, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]}
        ],
        allOffers: [],
        nearOffers: [],
        favorites: [],
        isOffersLoaded: false,
        isFavoritesLoaded: false
      });
  });

  it(`Reducer should fill near offers list in state`, () => {
    const state = {
      offers: [{city: {name: `Paris`}, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]}],
      allOffers: [],
      nearOffers: [],
      favorites: [],
      isOffersLoaded: false,
      isFavoritesLoaded: true
    };

    const fillNearOffersList = {
      type: ActionType.FILL_NEAR_OFFERS_LIST,
      payload: [
        {city: {name: `Paris`}, images: new Array(14), title: `Waterfront with extraordinary view`, goods: [`Air conditioning`, `Laptop friendly workspace`]},
        {city: {name: `Paris`}, images: new Array(14), title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Air conditioning`, `Laptop friendly workspace`, `Washer`]},
        {city: {name: `Paris`}, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]},
      ]
    };

    expect(offers(state, fillNearOffersList))
      .toEqual({
        offers: [{city: {name: `Paris`}, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]}],
        allOffers: [],
        nearOffers: [
          {city: {name: `Paris`}, images: new Array(14), title: `Waterfront with extraordinary view`, goods: [`Air conditioning`, `Laptop friendly workspace`]},
          {city: {name: `Paris`}, images: new Array(14), title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Air conditioning`, `Laptop friendly workspace`, `Washer`]},
          {city: {name: `Paris`}, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]},
        ],
        favorites: [],
        isOffersLoaded: false,
        isFavoritesLoaded: true
      });
  });

  it(`Reducer should fill favorites list in state and set isFavoritesLoaded flag true`, () => {
    const state = {
      offers: [{city: {name: `Paris`}, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]}],
      allOffers: [],
      nearOffers: [],
      favorites: [],
      isOffersLoaded: false,
      isFavoritesLoaded: false
    };

    const fillFavoritesList = {
      type: ActionType.FILL_FAVORITES_LIST,
      payload: [
        {city: {name: `Paris`}, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]},
        {city: {name: `Cologne`}, images: new Array(14), title: `The Joshua Tree House`, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`]},
        {city: {name: `Amsterdam`}, images: new Array(14), title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Breakfast`, `Laptop friendly workspace`, `Washer`]}
      ]
    };

    expect(offers(state, fillFavoritesList))
      .toEqual({
        offers: [{city: {name: `Paris`}, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]}],
        allOffers: [],
        nearOffers: [],
        favorites: [
          {city: {name: `Paris`}, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]},
          {city: {name: `Cologne`}, images: new Array(14), title: `The Joshua Tree House`, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`]},
          {city: {name: `Amsterdam`}, images: new Array(14), title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Breakfast`, `Laptop friendly workspace`, `Washer`]}
        ],
        isOffersLoaded: false,
        isFavoritesLoaded: false
      });
  });

  it(`Reducer should update item in all offers list in state`, () => {
    const state = {
      offers: [{city: {name: `Paris`}, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]}],
      allOffers: [
        {city: {name: `Paris`}, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]},
        {city: {name: `Cologne`}, images: new Array(14), title: `The Joshua Tree House`, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`]},
        {city: {name: `Amsterdam`}, images: new Array(14), title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Breakfast`, `Laptop friendly workspace`, `Washer`]}
      ],
      nearOffers: [],
      favorites: [],
      isOffersLoaded: true,
      isFavoritesLoaded: false
    };

    const updateAllOffers = {
      type: ActionType.UPDATE_ALLOFFERS,
      payload: {city: {name: `Paris`}, images: new Array(6), title: `The house among oaks `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]},
    };

    expect(offers(state, updateAllOffers))
      .toEqual({
        offers: [{city: {name: `Paris`}, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]}],
        allOffers: [
          {city: {name: `Paris`}, images: new Array(6), title: `The house among oaks `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]},
          {city: {name: `Cologne`}, images: new Array(14), title: `The Joshua Tree House`, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`]},
          {city: {name: `Amsterdam`}, images: new Array(14), title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Breakfast`, `Laptop friendly workspace`, `Washer`]}
        ],
        nearOffers: [],
        favorites: [],
        isOffersLoaded: true,
        isFavoritesLoaded: false
      });
  });

  it(`Reducer should update item in offers list in state`, () => {
    const state = {
      offers: [{city: {name: `Amsterdam`}, images: new Array(14), title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Breakfast`, `Laptop friendly workspace`, `Washer`]}],
      allOffers: [
        {city: {name: `Paris`}, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]},
        {city: {name: `Cologne`}, images: new Array(14), title: `The Joshua Tree House`, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`]},
        {city: {name: `Amsterdam`}, images: new Array(14), title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Breakfast`, `Laptop friendly workspace`, `Washer`]}
      ],
      nearOffers: [],
      favorites: [],
      isOffersLoaded: true,
      isFavoritesLoaded: false
    };

    const updateOffers = {
      type: ActionType.UPDATE_OFFERS,
      payload: {city: {name: `Amsterdam`}, images: new Array(33), title: `Penthouse, 10 rooms + 5 balconies`, goods: [`Breakfast`, `Laptop friendly workspace`, `Washer`]},
    };

    expect(offers(state, updateOffers))
      .toEqual({
        offers: [{city: {name: `Amsterdam`}, images: new Array(33), title: `Penthouse, 10 rooms + 5 balconies`, goods: [`Breakfast`, `Laptop friendly workspace`, `Washer`]}],
        allOffers: [
          {city: {name: `Paris`}, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]},
          {city: {name: `Cologne`}, images: new Array(14), title: `The Joshua Tree House`, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`]},
          {city: {name: `Amsterdam`}, images: new Array(14), title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Breakfast`, `Laptop friendly workspace`, `Washer`]}
        ],
        nearOffers: [],
        favorites: [],
        isOffersLoaded: true,
        isFavoritesLoaded: false
      });
  });

  it(`Reducer should update item in favorites list in state`, () => {
    const state = {
      offers: [{city: {name: `Paris`}, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]}],
      allOffers: [],
      nearOffers: [],
      favorites: [
        {city: {name: `Paris`}, isFavorite: true, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]},
        {city: {name: `Cologne`}, isFavorite: true, images: new Array(14), title: `The Joshua Tree House`, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`]},
        {city: {name: `Amsterdam`}, isFavorite: true, images: new Array(14), title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Breakfast`, `Laptop friendly workspace`, `Washer`]}
      ],
      isOffersLoaded: false,
      isFavoritesLoaded: true
    };

    const updateFavorites = {
      type: ActionType.UPDATE_FAVORITES,
      payload: {city: {name: `Paris`}, isFavorite: false, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]},
    };

    expect(offers(state, updateFavorites))
      .toEqual({
        offers: [{city: {name: `Paris`}, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]}],
        allOffers: [],
        nearOffers: [],
        favorites: [
          {city: {name: `Paris`}, isFavorite: false, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]},
          {city: {name: `Cologne`}, isFavorite: true, images: new Array(14), title: `The Joshua Tree House`, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`]},
          {city: {name: `Amsterdam`}, isFavorite: true, images: new Array(14), title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Breakfast`, `Laptop friendly workspace`, `Washer`]}
        ],
        isOffersLoaded: false,
        isFavoritesLoaded: true
      });
  });

  it(`Reducer should set isFavoritesLoaded flag in state`, () => {
    const state = {
      offers: [{city: {name: `Paris`}, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]}],
      allOffers: [],
      nearOffers: [],
      favorites: [
        {city: {name: `Paris`}, isFavorite: true, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]},
        {city: {name: `Cologne`}, isFavorite: true, images: new Array(14), title: `The Joshua Tree House`, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`]},
        {city: {name: `Amsterdam`}, isFavorite: true, images: new Array(14), title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Breakfast`, `Laptop friendly workspace`, `Washer`]}
      ],
      isOffersLoaded: false,
      isFavoritesLoaded: true
    };

    const setFavoritesIsLoaded = {
      type: ActionType.SET_FAVORITES_IS_LOADED,
      payload: false
    };

    expect(offers(state, setFavoritesIsLoaded))
      .toEqual({
        offers: [{city: {name: `Paris`}, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]}],
        allOffers: [],
        nearOffers: [],
        favorites: [
          {city: {name: `Paris`}, isFavorite: true, images: new Array(14), title: `The house among olive `, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`]},
          {city: {name: `Cologne`}, isFavorite: true, images: new Array(14), title: `The Joshua Tree House`, goods: [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`]},
          {city: {name: `Amsterdam`}, isFavorite: true, images: new Array(14), title: `Penthouse, 4-5 rooms + 5 balconies`, goods: [`Breakfast`, `Laptop friendly workspace`, `Washer`]}
        ],
        isOffersLoaded: false,
        isFavoritesLoaded: false
      });
  });
});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to /hotels`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeOffers = [
      {
        "bedrooms": 1,
        "city": {
          "location": {
            "latitude": 52.370216,
            "longitude": 4.895168,
            "zoom": 10
          },
          "name": `Amsterdam`
        },
        "host": {
          "avatar_url": `img/avatar-max.jpg`,
          "id": 1,
          "is_pro": false,
          "name": `Max`
        },
        "images": [`img/apartment-01.jpg`, `img/apartment-01.jpg`, `img/apartment-01.jpg`],
        "description": `room offer`,
        "location": {"latitude": 48.86471, "longitude": 2.35, "zoom": 10},
        "id": 1,
        "max_adults": 40,
        "title": `The house among olive`,
        "goods": [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`],
        "is_premium": false,
        "preview_image": `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/16.jpg`,
        "price": 169,
        "is_favorite": false,
        "rating": 3,
        "type": `room`
      },
      {
        "bedrooms": 1,
        "city": {
          "location": {
            "latitude": 52.370216,
            "longitude": 4.895168,
            "zoom": 10
          },
          "name": `Amsterdam`
        },
        "host": {
          "avatar_url": `img/avatar-max.jpg`,
          "id": 1,
          "is_pro": false,
          "name": `Max`
        },
        "images": [`img/apartment-01.jpg`, `img/apartment-01.jpg`, `img/apartment-01.jpg`],
        "description": `room offer`,
        "location": {"latitude": 48.86471, "longitude": 2.35, "zoom": 10},
        "id": 1,
        "max_adults": 40,
        "title": `The Joshua Tree House`,
        "goods": [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`],
        "is_premium": false,
        "preview_image": `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/16.jpg`,
        "price": 250,
        "is_favorite": false,
        "rating": 5,
        "type": `room`
      },
      {
        "bedrooms": 1,
        "city": {
          "location": {
            "latitude": 52.370216,
            "longitude": 4.895168,
            "zoom": 10
          },
          "name": `Amsterdam`
        },
        "host": {
          "avatar_url": `img/avatar-max.jpg`,
          "id": 1,
          "is_pro": false,
          "name": `Max`
        },
        "images": [`img/apartment-01.jpg`, `img/apartment-01.jpg`, `img/apartment-01.jpg`],
        "description": `room offer`,
        "location": {"latitude": 48.86471, "longitude": 2.35, "zoom": 10},
        "id": 1,
        "max_adults": 40,
        "title": `Canal View Prinsengracht`,
        "goods": [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`],
        "is_premium": false,
        "preview_image": `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/16.jpg`,
        "price": 450,
        "is_favorite": false,
        "rating": 4,
        "type": `room`
      }
    ];

    const adaptedFakeOffers = fakeOffers.map((item) => Adapter.OFFER.fromApi(item));

    const offersLoader = fetchOffersList();

    apiMock
      .onGet(APIRoute.OFFERS)
      .reply(200, fakeOffers);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: adaptedFakeOffers,
        });
      });
  });

  it(`Should make a correct API call to /hotels/:id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeOffer =
      {
        "bedrooms": 1,
        "city": {
          "location": {
            "latitude": 52.370216,
            "longitude": 4.895168,
            "zoom": 10
          },
          "name": `Amsterdam`
        },
        "host": {
          "avatar_url": `img/avatar-max.jpg`,
          "id": 1,
          "is_pro": false,
          "name": `Max`
        },
        "images": [`img/apartment-01.jpg`, `img/apartment-01.jpg`, `img/apartment-01.jpg`],
        "description": `room offer`,
        "location": {"latitude": 48.86471, "longitude": 2.35, "zoom": 10},
        "id": 1,
        "max_adults": 40,
        "title": `The house among olive`,
        "goods": [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`],
        "is_premium": false,
        "preview_image": `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/16.jpg`,
        "price": 169,
        "is_favorite": false,
        "rating": 3,
        "type": `room`
      };
    const offerLoader = fetchOffer(10);

    apiMock
      .onGet(`${APIRoute.OFFERS}/10`)
      .reply(200, fakeOffer);

    return offerLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.FILL_OFFERS_LIST,
          payload: [Adapter.OFFER.fromApi(fakeOffer)],
        });
      });
  });

  it(`Should make a correct API call to /hotels:id/nearby`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeOffers = [
      {
        "bedrooms": 1,
        "city": {
          "location": {
            "latitude": 52.370216,
            "longitude": 4.895168,
            "zoom": 10
          },
          "name": `Amsterdam`
        },
        "host": {
          "avatar_url": `img/avatar-max.jpg`,
          "id": 1,
          "is_pro": false,
          "name": `Max`
        },
        "images": [`img/apartment-01.jpg`, `img/apartment-01.jpg`, `img/apartment-01.jpg`],
        "description": `room offer`,
        "location": {"latitude": 48.86471, "longitude": 2.35, "zoom": 10},
        "id": 1,
        "max_adults": 40,
        "title": `The house among olive`,
        "goods": [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`],
        "is_premium": false,
        "preview_image": `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/16.jpg`,
        "price": 169,
        "is_favorite": false,
        "rating": 3,
        "type": `room`
      },
      {
        "bedrooms": 1,
        "city": {
          "location": {
            "latitude": 52.370216,
            "longitude": 4.895168,
            "zoom": 10
          },
          "name": `Amsterdam`
        },
        "host": {
          "avatar_url": `img/avatar-max.jpg`,
          "id": 1,
          "is_pro": false,
          "name": `Max`
        },
        "images": [`img/apartment-01.jpg`, `img/apartment-01.jpg`, `img/apartment-01.jpg`],
        "description": `room offer`,
        "location": {"latitude": 48.86471, "longitude": 2.35, "zoom": 10},
        "id": 1,
        "max_adults": 40,
        "title": `The Joshua Tree House`,
        "goods": [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`],
        "is_premium": false,
        "preview_image": `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/16.jpg`,
        "price": 250,
        "is_favorite": false,
        "rating": 5,
        "type": `room`
      },
      {
        "bedrooms": 1,
        "city": {
          "location": {
            "latitude": 52.370216,
            "longitude": 4.895168,
            "zoom": 10
          },
          "name": `Amsterdam`
        },
        "host": {
          "avatar_url": `img/avatar-max.jpg`,
          "id": 1,
          "is_pro": false,
          "name": `Max`
        },
        "images": [`img/apartment-01.jpg`, `img/apartment-01.jpg`, `img/apartment-01.jpg`],
        "description": `room offer`,
        "location": {"latitude": 48.86471, "longitude": 2.35, "zoom": 10},
        "id": 1,
        "max_adults": 40,
        "title": `Canal View Prinsengracht`,
        "goods": [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`],
        "is_premium": false,
        "preview_image": `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/16.jpg`,
        "price": 450,
        "is_favorite": false,
        "rating": 4,
        "type": `room`
      }
    ];

    const adaptedFakeOffers = fakeOffers.map((item) => Adapter.OFFER.fromApi(item));
    const nearOffersLoader = fetchNearOffersList(10);

    apiMock
      .onGet(`${APIRoute.OFFERS}/10/nearby`)
      .reply(200, fakeOffers);

    return nearOffersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.FILL_NEAR_OFFERS_LIST,
          payload: adaptedFakeOffers,
        });
      });
  });

  it(`Should make a correct API call to /favorite`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeFavorites = [
      {
        "bedrooms": 1,
        "city": {
          "location": {
            "latitude": 52.370216,
            "longitude": 4.895168,
            "zoom": 10
          },
          "name": `Amsterdam`
        },
        "host": {
          "avatar_url": `img/avatar-max.jpg`,
          "id": 1,
          "is_pro": false,
          "name": `Max`
        },
        "images": [`img/apartment-01.jpg`, `img/apartment-01.jpg`, `img/apartment-01.jpg`],
        "description": `room offer`,
        "location": {"latitude": 48.86471, "longitude": 2.35, "zoom": 10},
        "id": 1,
        "max_adults": 40,
        "title": `The house among olive`,
        "goods": [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`],
        "is_premium": false,
        "preview_image": `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/16.jpg`,
        "price": 169,
        "is_favorite": false,
        "rating": 3,
        "type": `room`
      },
      {
        "bedrooms": 1,
        "city": {
          "location": {
            "latitude": 52.370216,
            "longitude": 4.895168,
            "zoom": 10
          },
          "name": `Amsterdam`
        },
        "host": {
          "avatar_url": `img/avatar-max.jpg`,
          "id": 1,
          "is_pro": false,
          "name": `Max`
        },
        "images": [`img/apartment-01.jpg`, `img/apartment-01.jpg`, `img/apartment-01.jpg`],
        "description": `room offer`,
        "location": {"latitude": 48.86471, "longitude": 2.35, "zoom": 10},
        "id": 1,
        "max_adults": 40,
        "title": `The Joshua Tree House`,
        "goods": [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`],
        "is_premium": false,
        "preview_image": `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/16.jpg`,
        "price": 250,
        "is_favorite": false,
        "rating": 5,
        "type": `room`
      },
      {
        "bedrooms": 1,
        "city": {
          "location": {
            "latitude": 52.370216,
            "longitude": 4.895168,
            "zoom": 10
          },
          "name": `Amsterdam`
        },
        "host": {
          "avatar_url": `img/avatar-max.jpg`,
          "id": 1,
          "is_pro": false,
          "name": `Max`
        },
        "images": [`img/apartment-01.jpg`, `img/apartment-01.jpg`, `img/apartment-01.jpg`],
        "description": `room offer`,
        "location": {"latitude": 48.86471, "longitude": 2.35, "zoom": 10},
        "id": 1,
        "max_adults": 40,
        "title": `Canal View Prinsengracht`,
        "goods": [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`],
        "is_premium": false,
        "preview_image": `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/16.jpg`,
        "price": 450,
        "is_favorite": false,
        "rating": 4,
        "type": `room`
      }
    ];
    const adaptedFakeFavorites = fakeFavorites.map((item) => Adapter.OFFER.fromApi(item));
    const favoritesLoader = fetchFavoritesList();

    apiMock
      .onGet(APIRoute.FAVORITE)
      .reply(200, fakeFavorites);

    return favoritesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_FAVORITES_IS_LOADED,
          payload: true,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.FILL_FAVORITES_LIST,
          payload: adaptedFakeFavorites,
        });
      });
  });

  it(`Should make a correct API call to /favorite/:id/:status`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeOffer = {
      "bedrooms": 1,
      "city": {
        "location": {
          "latitude": 52.370216,
          "longitude": 4.895168,
          "zoom": 10
        },
        "name": `Amsterdam`
      },
      "host": {
        "avatar_url": `img/avatar-max.jpg`,
        "id": 1,
        "is_pro": false,
        "name": `Max`
      },
      "images": [`img/apartment-01.jpg`, `img/apartment-01.jpg`, `img/apartment-01.jpg`],
      "description": `room offer`,
      "location": {"latitude": 48.86471, "longitude": 2.35, "zoom": 10},
      "id": 1,
      "max_adults": 40,
      "title": `The house among olive`,
      "goods": [`Breakfast`, `Air conditioning`, `Laptop friendly workspace`, `Washer`],
      "is_premium": false,
      "preview_image": `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/16.jpg`,
      "price": 169,
      "is_favorite": false,
      "rating": 3,
      "type": `room`
    };

    const changeFavoriteLoader = changeFavorite({id: 10, status: 1});

    apiMock
      .onPost(`${APIRoute.FAVORITE}/10/1`)
      .reply(200, fakeOffer);

    return changeFavoriteLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_ALLOFFERS,
          payload: Adapter.OFFER.fromApi(fakeOffer),
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.UPDATE_FAVORITES,
          payload: Adapter.OFFER.fromApi(fakeOffer),
        });
      });
  });
});
