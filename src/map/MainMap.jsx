import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useEffect, useState } from "react";
import Map from "./Map.jsx";


const MainMap = ({ getAddress, getLatLng }) => {
  
  const render = (status = Status) => {
    return <h1>{status}</h1>;
  };

  const [geolocation, setGeolocation] = useState()

  const getGeolocation = (location) => {
    if (window.innerWidth < 800) {
      const infoPanel = document.querySelector('.weather');
      infoPanel.classList.toggle('open');
    }
    setGeolocation(location);
  };

  useEffect (() => {
    if (geolocation) {
      // create an array to build the formatted address for the site with
      let final_address_array = [];
      let address = geolocation.formatted_address;
      let addressArray = address.split(',');
      // if the first location option does not contain a full address, try the second
      if (addressArray.length < 3) {
        address = geolocation.formatted_address;
        addressArray = address.split(',');
      }
      // if the second location still does not contain a full address, just get the country
      if (addressArray.length < 3) 
      {
        let country = addressArray[addressArray.length - 1];
        let country_first_letter = addressArray[addressArray.length - 1].charAt(0);
        if (country_first_letter === ' ') {
          country = addressArray[addressArray.length - 1].substring(1);
        }
        final_address_array.push(country)
      // if there is more information get the state and possibly the town
      } else {
        let country = addressArray[addressArray.length - 1];
        let country_first_letter = addressArray[addressArray.length - 1].charAt(0);
        if (country_first_letter === ' ') {
          country = addressArray[addressArray.length - 1].substring(1);
        }
        // the replace removes zip codes which are sometimes added on to the state
        let state = addressArray[addressArray.length - 2].substring(1).replace(/[0-9]/g, '');

        let town_array = addressArray[addressArray.length - 3].split(' ');
        // town formatting, as some towns contain zip codes, or arent real town names
        town_array.forEach((segment) => {
          // if the town starts with a space, rmeove it
          if (segment === '') {
            const index = town_array.indexOf(segment);
            town_array.splice(index, 1);
          } 
          // if the segment contains more than one digit, it is probably a zipcode and should be removed
          if (/\d{2,}/.test(segment)) {
            const index = town_array.indexOf(segment);
            town_array.splice(index, 1);
          } 
          // if the segment conrains a + it is probably a google "plus code" and should be removed
          else if (/\+/.test(segment)) {
            const index = town_array.indexOf(segment);
            town_array.splice(index, 1);
          } 
        })
        // if there was a valid town name add it to the address
        if (town_array.length > 0) {
          const formatted_town = town_array.join(' ');
          final_address_array.push(formatted_town);
        }
        if (state.charAt(0) === ' ') {
          state = state.substring(1)
        }
        if (state.charAt(state.length - 1) === ' ') {
          state = state.substring(0, state.length - 1)
        }
        final_address_array.push(state);
        final_address_array.push(country);

      }
      const final_address = final_address_array.join( ', ');
      getAddress(final_address)
    }
  }, [geolocation, getAddress])

  return ( 
    <Wrapper apiKey={"AIzaSyC_taUg9_OMXZ70-_UkmwXfB5Ufx856n0k"} render={render} libraries={["places"]} >
      <Map getGeolocation={getGeolocation} getLatLng={getLatLng} />
    </Wrapper>
   );
}
 
export default MainMap;
