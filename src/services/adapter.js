const offerFromApi = (offer) => {
  const adaptedOffer = Object.assign(
      {},
      offer,
      {
        host: Object.assign(
            {},
            offer.host,
            {
              avatarUrl: offer.host.avatar_url,
              isPro: offer.host.is_pro
            }),
        isFavorite: offer.is_favorite,
        isPremium: offer.is_premium,
        maxAdults: offer.max_adults,
        previewImage: offer.preview_image
      });

  delete adaptedOffer.host.avatar_url;
  delete adaptedOffer.host.is_pro;
  delete adaptedOffer.is_favorite;
  delete adaptedOffer.is_premium;
  delete adaptedOffer.max_adults;
  delete adaptedOffer.preview_image;

  return adaptedOffer;
};

const offerToApi = (offer) => {
  const adaptedOffer = Object.assign(
      {},
      offer,
      {
        "host": Object.assign(
            {},
            offer.host,
            {
              "avatar_url": offer.host.avatarUrl,
              "is_pro": offer.host.isPro
            }),
        "is_favorite": offer.isFavorite,
        "is_premium": offer.isPremium,
        "max_adults": offer.maxAdults,
        "preview_image": offer.previewImage
      });

  delete adaptedOffer.host.avatarUrl;
  delete adaptedOffer.host.isPro;
  delete adaptedOffer.isFavorite;
  delete adaptedOffer.isPremium;
  delete adaptedOffer.maxAdults;
  delete adaptedOffer.previewImage;

  return adaptedOffer;
};

const userFromApi = (user) => {
  const adaptedUser = Object.assign(
      {},
      user,
      {
        avatarUrl: user.avatar_url,
        isPro: user.is_pro
      }
  );

  delete adaptedUser.avatar_url;
  delete adaptedUser.is_pro;

  return adaptedUser;
};

const commentFromApi = (comment) => {
  const adaptedComment = Object.assign(
      {},
      comment,
      {
        user: Object.assign(
            {},
            comment.user,
            {
              avatarUrl: comment.user.avatar_url,
              isPro: comment.user.is_pro
            }),
      }
  );

  delete adaptedComment.user.avatar_url;
  delete adaptedComment.user.is_pro;

  return adaptedComment;
};

const commentToApi = (comment) => {
  const adaptedComment = Object.assign(
      {},
      comment,
      {
        user: Object.assign(
            {},
            comment.user,
            {
              "avatar_url": comment.user.avatarUrl,
              "is_pro": comment.user.isPro
            }),
      }
  );

  delete adaptedComment.user.avatarUrl;
  delete adaptedComment.user.isPro;

  return adaptedComment;
};

const Adapter = {
  OFFER: {
    fromApi: offerFromApi,
    toApi: offerToApi
  },
  USER: {
    fromApi: userFromApi,
  },
  REVIEW: {
    fromApi: commentFromApi,
    toApi: commentToApi,
  }
};

export default Adapter;
