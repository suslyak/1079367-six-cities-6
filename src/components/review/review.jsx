import React from 'react';

import {PropValidation} from '../../const.js';

const Review = (props) => {
  const {review} = props;
  const reviewDate = new Date(review.date);
  const reviewDateDay = reviewDate.toLocaleString(`en-US`, {day: `2-digit`});
  const reviewDateMouth = reviewDate.toLocaleString(`en-US`, {month: `long`});
  const reviewDateNumericMouth = reviewDate.toLocaleString(`en-US`, {month: `2-digit`});
  const reviewDateYear = reviewDate.toLocaleString(`en-US`, {year: `numeric`});

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width={54} height={54} alt="Reviews avatar" />
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
};

Review.propTypes = {
  review: PropValidation.REVIEW,
};

export default Review;
