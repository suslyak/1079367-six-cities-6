import React, {useEffect, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchReviewsList} from "../../store/api-actions";
import {setReviewsIsLoaded} from '../../store/action';
import LoadingScreen from '../loading-screen/loading-screen';
import Review from './review';
import {sortByDate, sortListCopy} from '../../utils/utils.js';

const ReviewsList = (props) => {
  const {offerId} = props;
  const {reviews, isReviewsLoaded} = useSelector((state) => state.REVIEWS);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setReviewsIsLoaded(false));
    dispatch(fetchReviewsList(offerId));
  }, []);

  const sortedReviewsList = useMemo(
      () => sortListCopy(reviews, sortByDate),
      [reviews]
  );

  if (!isReviewsLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    reviews.length
      ? <>
        <h2 className="reviews__title">Reviews · <span className="reviews__amount">{reviews.length}</span></h2>
        <ul className="reviews__list">
          {sortedReviewsList.slice(0, 10).map((review, i) =>
            <Review
              review={review}
              key={name + i}
            />
          )}
        </ul>

      </>
      : <h2 className="reviews__title">No reviews of this place. Post the first one!</h2>
  );
};

ReviewsList.propTypes = {
  offerId: PropTypes.number.isRequired
};

export default ReviewsList;
