import React from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {PropValidation} from '../../const.js';
import {changeFavorite} from '../../store/api-actions';

const PlaceCard = (props) => {
  const {
    offer,
    specifiedArticleClass = ``,
    specifiedInfoClass = ``,
    specifiedImageWrapperClas = ``,
    onCardMouseOver,
    imageSize = {width: 260, height: 200}
  } = props;


  const history = useHistory();
  const dispatch = useDispatch();

  const onBookmarkClick = () => {
    dispatch(changeFavorite({
      id: offer.id,
      status: offer.isFavorite ? 0 : 1
    }));
  };

  return (
    <article className={`${specifiedArticleClass} place-card`} onMouseOver={onCardMouseOver ? onCardMouseOver : false}>
      {offer.isPremium
        ? <div className="place-card__mark">
          <span>Premium</span>
        </div>
        : ``
      }
      <div className={`${specifiedImageWrapperClas} place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={offer.previewImage} width={imageSize.width} height={imageSize.height} alt="Place image" />
        </a>
      </div>
      <div className={`${specifiedInfoClass} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${offer.isFavorite ? `place-card__bookmark-button--active` : ``}`}
            type="button"
            onClick={onBookmarkClick}
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">{offer.isFavorite ? `In bookmarks` : `To bookmarks`}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{"width": (Math.round(offer.rating) * 20) + `%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a
            href="#"
            onClick={
              (e) => {
                e.preventDefault();
                history.push(`/offer/${offer.id}`);
              }
            }
          >
            {offer.title}
          </a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  offer: PropValidation.OFFER,
  specifiedArticleClass: PropTypes.string,
  specifiedInfoClass: PropTypes.string,
  specifiedImageWrapperClas: PropTypes.string,
  onCardMouseOver: PropTypes.func,
  imageSize: PropTypes.shape({width: PropTypes.number, height: PropTypes.number})
};

export default PlaceCard;
