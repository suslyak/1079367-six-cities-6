import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {City} from '../../const.js';
import {changeCity} from '../../store/action';
import {nanoid} from 'nanoid';

const CitiesList = () => {
  const {city} = useSelector((state) => state.CITY);

  const dispatch = useDispatch();

  const handleChangeCity = (name) => {
    dispatch(changeCity(name));
  };

  return (
    <ul className="locations__list tabs__list">
      {Object.values(City).map((item) =>
        <li className="locations__item" key={nanoid(10)}>
          <a
            className={`locations__item-link tabs__item ${item.name === city.name ? `tabs__item--active` : ``}`}
            href= {item.name === city.name ? undefined : `#`}
            onClick={(evt) => {
              evt.preventDefault();
              handleChangeCity(City[item.name]);
            }
            }
          >
            <span>{item.name}</span>
          </a>
        </li>)
      }
    </ul>
  );
};

export default React.memo(CitiesList);
