import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SortingFiltersList from './sorting-filters-list';
import {changeSorting} from '../../store/action';
import {Sorting} from '../../const.js';


const SortingList = () => {
  const [isOpened, setisOpened] = useState(false);
  const {currentOffersSortingType} = useSelector((state) => state.SORTING);
  const dispatch = useDispatch();

  const handleClickOpenSorting = () => {
    setisOpened(!isOpened);
  };

  const handleSortingClick = (type) => {
    dispatch(changeSorting(type));
    setisOpened(false);
  };

  return (
    <form className='places__sorting' action='#' method='get'>
      <span className='places__sorting-caption'>Sort by&nbsp;</span>
      <span
        className='places__sorting-type'
        tabIndex={0}
        onClick={handleClickOpenSorting}
      >
        {Sorting[currentOffersSortingType]}
        <svg className='places__sorting-arrow' width={7} height={4}>
          <use xlinkHref='#icon-arrow-select' />
        </svg>
      </span>
      <SortingFiltersList
        isOpened={isOpened}
        currentSorting={currentOffersSortingType}
        onHandlerClick={handleSortingClick}
      />
    </form>
  );
};

SortingList.propTypes = {
};


export default SortingList;
