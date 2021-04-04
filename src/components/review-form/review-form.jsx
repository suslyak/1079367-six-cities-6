import React, {useRef} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {postReview} from '../../store/api-actions';
import {COMMENT_MIN_CHARACTERS, API_ERROR_COLOR} from '../../const';

const ReviewForm = (props) => {
  const {offerId} = props;

  const [reviewForm, setReviewForm] = React.useState({
    rating: 0,
    comment: ``,
  });
  const [formIsSending, setFormIsSending] = React.useState(false);
  const [formError, setFormError] = React.useState(null);

  const commentTextArea = useRef(null);
  const dispatch = useDispatch();

  const handleStarClick = (evt) => {
    const star = evt.target;
    setReviewForm({...reviewForm, rating: star.value});
  };

  const handleFieldChange = (evt) => {
    const {name, value} = evt.target;
    const newStateValue = value.slice(0, 300);

    setReviewForm({...reviewForm, [name]: newStateValue});
    commentTextArea.current.value = newStateValue;
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    setFormIsSending(true);
    dispatch(postReview(
        {
          id: offerId,
          reviewFormData: reviewForm
        },
        () => {
          setFormIsSending(false);
          commentTextArea.current.value = ``;
        },
        (error) => {
          setFormIsSending(false);
          setFormError(error + ``);
        }
    ));
  };

  return (
    <form onSubmit={handleFormSubmit} className="reviews__form form" action="#" method="post">
      {
        formError
          ? (<p style={{color: API_ERROR_COLOR}}>{formError}</p>)
          : ``}
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input onClick={handleStarClick} className="form__rating-input visually-hidden" name="rating" defaultValue={5} id="5-stars" type="radio" />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input onClick={handleStarClick} className="form__rating-input visually-hidden" name="rating" defaultValue={4} id="4-stars" type="radio" />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input onClick={handleStarClick} className="form__rating-input visually-hidden" name="rating" defaultValue={3} id="3-stars" type="radio" />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input onClick={handleStarClick} className="form__rating-input visually-hidden" name="rating" defaultValue={2} id="2-stars" type="radio" />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input onClick={handleStarClick} className="form__rating-input visually-hidden" name="rating" defaultValue={1} id="1-star" type="radio"/>
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </div>
      <textarea
        onChange={handleFieldChange}
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={``}
        ref={commentTextArea}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled = {!reviewForm.rating || formIsSending || ((reviewForm.comment.length < COMMENT_MIN_CHARACTERS))}
        >
          {formIsSending ? `Sending..` : `Submit`}
        </button>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  offerId: PropTypes.number.isRequired
};

export default ReviewForm;
