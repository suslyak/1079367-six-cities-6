import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../header/header.jsx';
import ReviewsList from '../review/reviews-list';
import ReviewForm from '../review-form/review-form.jsx';
import Map from '../map/map.jsx';
import NearOffers from '../near-offers-list/near-offers-list.jsx';
import {fetchOffer, changeFavorite} from "../../store/api-actions";
import {fillOffersList} from '../../store/action';
import LoadingScreen from '../loading-screen/loading-screen';
import {AuthorizationStatus} from '../../const';

const Offer = (props) => {
  const {id} = props;
  const {city} = useSelector((state) => state.CITY);
  const {offers, allOffers, nearOffers} = useSelector((state) => state.OFFERS);
  const {authorizationStatus} = useSelector((state) => state.USER);
  const offerId = parseInt(id, 10);
  let offer = offers.find((item) => item.id === offerId);
  const inBookmarksInitialState = offer ? offer.is_favorite : false;
  const dispatch = useDispatch();

  const [inBookmarks, setInbookmarks] = useState(inBookmarksInitialState);

  const onBookmarkClick = () => {
    dispatch(changeFavorite({
      id: offer.id,
      status: inBookmarks ? 0 : 1
    }));
    setInbookmarks(!inBookmarks);
  };

  useEffect(() => {
    if (!offer) {
      const storedOffer = allOffers.find((item) => item.id === offerId);
      if (storedOffer) {
        offer = storedOffer;
        dispatch(fillOffersList(offer));
      } else {
        dispatch(fetchOffer(offerId));
      }
    } else {
      setInbookmarks(offer.is_favorite);
    }
  }, [offers, id]);

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
                  {offer.images.slice(0, 6).map((offerImage, i) =>
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
                <button
                  className={`property__bookmark-button button ${inBookmarks ? `property__bookmark-button--active` : ``}`}
                  type="button"
                  onClick={onBookmarkClick}
                >
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
                <ReviewsList
                  offerId= {offerId}
                />
                {(authorizationStatus === AuthorizationStatus.AUTH) && <ReviewForm offerId= {offerId} />}
              </section>
            </div>
          </div>
          <Map
            city={city}
            offers={offers.concat(nearOffers)}
            containerSpecifiedClass={`property__map`}
            currentOffer={offer}
            scrollZoom={false}
          />
        </section>
        <div className="container">
          <NearOffers
            offerId={offerId}
          />
        </div>
      </main>
    </div>
  );
};

Offer.propTypes = {
  id: PropTypes.string
};

export default Offer;
