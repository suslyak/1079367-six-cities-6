export const getUniqueValues = (items) => {
  return [...new Set(items)];
};

export const sortByPriceLowToHigh = (a, b) => {
  return a.price - b.price;
};

export const sortByPriceHighToLow = (a, b) => {
  return b.price - a.price;
};

export const sortByRating = (a, b) => {
  return b.rating - a.rating;
};


export const SortingFilter = {
  POPULAR: (items) => items,
  PRICE_LOW_TO_HIGH: sortByPriceLowToHigh,
  PRICE_HIGH_TO_LOW: sortByPriceHighToLow,
  TOP_RATED_FIRST: sortByRating
};

export const sortListCopy = (list, filter) => {
  return [...list].sort(filter);
};
