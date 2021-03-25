import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

import {PropValidation} from '../../const.js';

import "leaflet/dist/leaflet.css";

const Map = (props) => {
  const {city, offers} = props;
  const {currentOffer} = useSelector((state) => state.MAP);
  const mapRef = useRef();

  const customPinIcon = leaflet.icon({
    iconUrl: `./img/pin.svg`,
    iconSize: [27, 39]
  });

  const customActivePinIcon = leaflet.icon({
    iconUrl: `./img/pin-active.svg`,
    iconSize: [27, 39]
  });

  const points = offers.map((offer) => ({
    "id": offer.id,
    "lat": offer.location.latitude,
    "lng": offer.location.longitude,
    "title": offer.title
  }));

  useEffect(() => {
    mapRef.current = leaflet.map(`map`, {
      center: {
        lat: city.lat,
        lng: city.lng
      },
      zoom: 12,
      zoomControl: false,
      marker: true
    });
    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(mapRef.current);

    points.forEach((point) => {
      leaflet.marker({
        lat: point.lat,
        lng: point.lng
      },
      {
        icon: (point.id === currentOffer) ? customActivePinIcon : customPinIcon,
        title: point.title
      })
      .addTo(mapRef.current);

    });

    return () => {
      mapRef.current.remove();
    };
  }, [city, offers, currentOffer]);

  return (
    <section id="map" className="cities__map map">
    </section>
  );
};

Map.propTypes = {
  city: PropValidation.CITY,
  offers: PropTypes.arrayOf(PropValidation.OFFER),
};


export default Map;
