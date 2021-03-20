import {NameSpace} from '../root-reducer';

export const getAllOffers = (state) => state[NameSpace.OFFERS].allOffers;
export const getOffers = (state) => state[NameSpace.OFFERS].offers;
export const getIsOffersLoaded = (state) => state[NameSpace.OFFERS].isOffersLoaded;
