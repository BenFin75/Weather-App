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

  // console.log(weather.data.current);
//weather={weather.data.current}
  return ( 
    <div className="weather">
      <p className="address">
        {weather && locationInfo.address}
      </p>
      <CurrentWeather weather={weather} units={units} />
      <FiveDayWeather weather={weather} units={units} />
      <TodaysForcast weather={weather} units={units}  />
    </div>
  );
}
 
export default MainWeather;