import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {PropValidation, cities} from '../../const.js';
import {changeCity} from '../../store/action';

const CitiesList = (props) => {
  const {city, handleChangeCity} = props;

  return (
    <ul className="locations__list tabs__list">
      {Object.values(cities).map((item, i) =>
        <li className="locations__item" key={name + i}>
          <a
            className={`locations__item-link tabs__item ${item.name === city.name ? `tabs__item--active` : ``}`}
            href= {item.name === city.name ? undefined : `#`}
            onClick={(evt) => {
              evt.preventDefault();
              handleChangeCity(item.name);
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

CitiesList.propTypes = {
  city: PropValidation.CITY,
  handleChangeCity: PropTypes.func.isRequired
};

const mapStateToProps = ({CITY}) => ({
  city: CITY.city,
});

const mapDispatchToProps = (dispatch) => ({
  handleChangeCity(name) {
    dispatch(changeCity(name));
  },
});

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
