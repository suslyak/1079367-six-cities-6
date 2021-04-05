import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchReviewsList} from "../../store/api-actions";
import {setReviewsIsLoaded} from '../../store/action';
import LoadingScreen from '../loading-screen/loading-screen';
import Review from './review';

const ReviewsList = (props) => {
  const {offerId} = props;
  const {reviews, isReviewsLoaded} = useSelector((state) => state.REVIEWS);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setReviewsIsLoaded(false));
    dispatch(fetchReviewsList(offerId));
  }, []);

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
          {reviews.map((review, i) =>
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
