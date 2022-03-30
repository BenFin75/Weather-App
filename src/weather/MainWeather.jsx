import React, { useEffect, useState } from 'react';

import getForcast from '../firebase';
import CurrentWeather from './CurrentWeather';
import FiveDayWeather from './FiveDayWeather';
import TodaysForcast from './TodaysForcast';

// const buildForcasat = async () => {
//   console.log(result.data)
// }

// buildForcasat();

const MainWeather = ({ locationInfo }) => {

  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState('');

  useEffect( () => {
    if (locationInfo) {
      const fetchWeather =async () => {
        const latLng = locationInfo.latLng;
        const address = locationInfo.address;
        if (address.includes("USA")) {
          setUnits('imperial');
        } else {
          setUnits('metric');
        }
        const newWeather = await getForcast({ latLng, units })
        setWeather(newWeather);
      }
      fetchWeather();
    }
  }, [locationInfo, units])

  const toggleMenu = () => {
    const infoPanel = document.querySelector('.weather');
    infoPanel.classList.toggle('open');
    const searchBar = document.querySelector('#pac-input');
    searchBar.classList.toggle('open');
  }

  // console.log(weather.data.current);
//weather={weather.data.current}
  return ( 
    <div className="weather">
      <button className="close" type='button' onClick={toggleMenu}>ᐊ</button>
      <p className="address">
        {weather && locationInfo.address}
        {!weather && "Click on the map, or search to get weather"}
      </p>
      <CurrentWeather weather={weather} units={units} />
      <FiveDayWeather weather={weather} units={units} />
      <TodaysForcast weather={weather} units={units}  />
      <div className="footer">Created by<a href="https://github.com/BenFin75"> Benjamin Finley </a></div>
    </div>
  );
}
 
export default MainWeather;