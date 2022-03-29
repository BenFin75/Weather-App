import React, { useState, useEffect } from 'react';
import './App.css';
import MainMap from './map/MainMap';
import MainWeather from './weather/MainWeather';

function App() {

  const [address, setAddress] = useState('');
  const [latLng, setLatLng] = useState();
  const [locationInfo, setLocationinfo] = useState()

  const getAddress = (newAddress) => {
    setAddress(newAddress)
  }

  const getLatLng = (newLatLngs) => {
    setLatLng(newLatLngs)
  }
  
  useEffect(() => {
    if (address) {
      setLocationinfo({address, latLng})
    }
  // in order to only run this effect once per update
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]) 

  return (
    <div className="App">
      <MainMap getAddress={getAddress} getLatLng={getLatLng} ></MainMap>
      <MainWeather locationInfo={locationInfo} ></MainWeather>
    </div>
  );
}

export default App;
