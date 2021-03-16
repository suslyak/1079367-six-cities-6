import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {PropValidation, cities} from '../../const.js';
import {ActionCreator} from '../../store/action';

const CitiesList = (props) => {
  const {city, changeCity} = props;

  return (
    <ul className="locations__list tabs__list">
      {Object.values(cities).map((item, i) =>
        <li className="locations__item" key={name + i}>
          <a
            className={`locations__item-link tabs__item ${item.name === city.name ? `tabs__item--active` : ``}`}
            href="#"
            onClick={(evt) => {
              evt.preventDefault();
              changeCity(item.name);
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
  changeCity: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  city: state.city,
});

const mapDispatchToProps = (dispatch) => ({
  changeCity(name) {
    dispatch(ActionCreator.changeCity(name));
  },
});

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
