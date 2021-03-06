import {NameSpace} from '../root-reducer';

export const getAllOffers = (state) => state[NameSpace.OFFERS].allOffers;
export const getOffers = (state) => state[NameSpace.OFFERS].offers;
export const getNearOffers = (state) => state[NameSpace.OFFERS].nearOffers;
export const getFavorites = (state) => state[NameSpace.OFFERS].favorites;
export const getIsOffersLoaded = (state) => state[NameSpace.OFFERS].isOffersLoaded;
export const getIsFavoritesLoaded = (state) => state[NameSpace.OFFERS].isFavoritesLoaded;
