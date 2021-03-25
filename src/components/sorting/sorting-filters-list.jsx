import React from 'react';
import PropTypes from 'prop-types';
import {Sorting} from '../../const.js';


const SortingFiltersList = (props) => {
  const {isOpened = false, currentSorting = ``, onHandlerClick} = props;

  return (
    <ul className={`places__options places__options--custom ${ isOpened ? `places__options--opened` : ``}`}>
      {
        Object.keys(Sorting).map((item, i) =>
          <li
            key={name + i}
            className={`places__option ${(item === currentSorting) ? `places__option--active` : ``}`}
            tabIndex={0}
            onClick={() => onHandlerClick(item)}
          >
            {Sorting[item]}
          </li>
        )
      }
    </ul>
  );
};

SortingFiltersList.propTypes = {
  isOpened: PropTypes.bool,
  currentSorting: PropTypes.string,
  onHandlerClick: PropTypes.func.isRequired
};

export default React.memo(SortingFiltersList);
