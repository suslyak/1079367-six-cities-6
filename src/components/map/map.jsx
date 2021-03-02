import React, {useEffect, useRef} from 'react';
import leaflet from 'leaflet';

import {PropValidation} from '../../const.js';

import "leaflet/dist/leaflet.css";

const Map = ({city, points}) => {
  const mapRef = useRef();
  const customIcon = leaflet.icon({
    iconUrl: `./img/pin.svg`,
    iconSize: [27, 39]
  });

  useEffect(() => {
    mapRef.current = leaflet.map(`map`, {
      center: {
        lat: city.lat,
        lng: city.lng
      },
      zoom: city.zoom,
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
        icon: customIcon,
        title: point.title
      })
      .addTo(mapRef.current);

      return () => {
        mapRef.current.remove();
      };
    });
  }, []);

  return (
    <section id="map" ref={mapRef} className="cities__map map">
    </section>
  );
};

Map.propTypes = {
  city: PropValidation.CITY,
  points: PropValidation.POINTS
};

export default Map;
