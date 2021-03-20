import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Header from '../header/header.jsx';
import ReviewForm from '../review-form/review-form.jsx';
import NearOffers from '../near-offers-list/near-offers-list.jsx';
import PropTypes from 'prop-types';
import {PropValidation} from '../../const.js';
import {fetchOffer} from "../../store/api-actions";
import LoadingScreen from '../loading-screen/loading-screen';
import {getAllOffers, getOffers} from '../../store/offers/selector';
import {getReviews} from '../../store/reviews/selector';

const Offer = (props) => {
  const {offers, allOffers, reviews, onLoadData} = props;

  // Тащим из хранилища allOffer, чтобы не делать запрос, если все офферы уже были загружены.

  const offerId = parseInt(window.location.pathname.substring(window.location.pathname.lastIndexOf(`/`) + 1), 10);
  const offerReviews = reviews.filter((review) => review.id === offerId);

  let offer = offers.find((item) => item.id === offerId);

  useEffect(() => {
    if (!offer) {
      const storedOffer = allOffers.find((item) => item.id === offerId);
      if (storedOffer) {
        offer = storedOffer;
      } else {
        onLoadData(offerId);
      }
    }
  }, [offers]);

  if (!offer) {
    return (
      <div className="page">
        <Header/>
        <main className="page__main page__main--property">
          <section className="property">
            <LoadingScreen />
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--property">
        <section className="property">
          {offer.images
            ? <>
              <div className="property__gallery-container container">
                <div className="property__gallery">
                  {offer.images.map((offerImage, i) =>
                    <div className="property__image-wrapper" key={name + i}>
                      <img className="property__image" src={offerImage} alt="Place image" />
                    </div>)
                  }
                </div>
              </div>
            </>
            : ``
          }
          <div className="property__container container">
            <div className="property__wrapper">
              {offer.is_premium
                ? <div className="property__mark">
                  <span>Premium</span>
                </div>
                : ``
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{"width": (offer.rating * 20) + `%`}} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer.bedrooms}
                </li>
                <li className="property__feature property__feature--adults">
                  {offer.max_adults}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">€{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              {offer.goods
                ? <>
                  <div className="property__inside">
                    <h2 className="property__inside-title">What&apos;s inside</h2>
                    <ul className="property__inside-list">
                      {offer.goods.map((good, i) =>
                        <li className="property__inside-item" key={name + i}>
                          {good}
                        </li>)
                      }
                    </ul>
                  </div>
                </>
                : ``
              }
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper ` + (offer.host.is_pro ? `property__avatar-wrapper--pro` : ``) + ` user__avatar-wrapper`}>
                    <img className="property__avatar user__avatar" src={offer.host.avatar_url} width={74} height={74} alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {offer.host.name}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                {offerReviews.length
                  ? <>
                    <h2 className="reviews__title">Reviews · <span className="reviews__amount">{offerReviews.length}</span></h2>
                    <ul className="reviews__list">
                      {offerReviews.map((review, i) => {
                        const reviewDate = new Date(review.date);
                        const reviewDateDay = reviewDate.toLocaleString(`en-US`, {day: `2-digit`});
                        const reviewDateMouth = reviewDate.toLocaleString(`en-US`, {month: `long`});
                        const reviewDateNumericMouth = reviewDate.toLocaleString(`en-US`, {month: `2-digit`});
                        const reviewDateYear = reviewDate.toLocaleString(`en-US`, {year: `numeric`});
                        return (
                          <li className="reviews__item" key={name + i}>
                            <div className="reviews__user user">
                              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                                <img className="reviews__avatar user__avatar" src={review.user.avatar_url} width={54} height={54} alt="Reviews avatar" />
                              </div>
                              <span className="reviews__user-name">
                                {review.user.name}
                              </span>
                            </div>
                            <div className="reviews__info">
                              <div className="reviews__rating rating">
                                <div className="reviews__stars rating__stars">
                                  <span style={{"width": (review.rating * 20) + `%`}} />
                                  <span className="visually-hidden">Rating</span>
                                </div>
                              </div>
                              <p className="reviews__text">
                                {review.comment}
                              </p>
                              <time className="reviews__time" dateTime={reviewDateYear + `-` + reviewDateNumericMouth + `-` + reviewDateDay}>{reviewDateMouth} {reviewDateYear}</time>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                  : <h2 className="reviews__title">No reviews of this place. Post the first one!</h2>
                }
                <ReviewForm />
              </section>
            </div>
          </div>
          <section className="property__map map" />
        </section>
        <div className="container">
          <NearOffers />
        </div>
      </main>
    </div>
  );
};

Offer.propTypes = {
  offers: PropTypes.arrayOf(PropValidation.OFFER),
  allOffers: PropTypes.arrayOf(PropValidation.OFFER),
  reviews: PropTypes.arrayOf(PropValidation.REVIEW),
  onLoadData: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  offers: getOffers(state),
  allOffers: getAllOffers(state),
  reviews: getReviews(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoadData(offerId) {
    dispatch(fetchOffer(offerId));
  }
});

export {Offer};
export default connect(mapStateToProps, mapDispatchToProps)(Offer);
