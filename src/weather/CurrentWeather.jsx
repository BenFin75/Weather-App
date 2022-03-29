import symbols from "./symbols";
const CurrentWeather = ({ weather, units }) => {
  const todaysDate = new Date();

  let weatherSymbol;
  let WeatherDescription;
  let symbol;
  let temp;
  let feel;
  let wind;

  if (weather !== '') {
    const todaysWeather = weather.data.current
    weatherSymbol = todaysWeather.weather[0].main
    if (weatherSymbol === 'Clouds') {
      if (todaysWeather.clouds < 50) {
        weatherSymbol = 'PartlyCloudy'
      }
    }
    WeatherDescription = todaysWeather.weather[0].description;
    symbol = <img src={symbols[weatherSymbol]} alt={`${weatherSymbol} symbol`} />
    temp = Math.round(parseFloat(todaysWeather.temp));
    feel = Math.round(parseFloat(todaysWeather.feels_like));
    wind = Math.round(parseFloat(todaysWeather.wind_speed));
  }
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  return (
    <div className="current">
      <div className="day">
        <div className="date">
          {todaysDate.toLocaleDateString(undefined, options)}
        </div>
        <div className="time">
          {todaysDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>
      </div>
      <div className="todays-weather">
        <div className="percipitation">
          <div className="symbol">
            {symbol && symbol}
          </div>
          <div className="description">
            {WeatherDescription && WeatherDescription}
          </div>
          <div className="wind">
            {!isNaN(wind) && `Wind Speed: ${wind} ${(units === "metric") ? 'M/s' : 'M/h'}`}
          </div>
        </div>
        <div className="temp">
          <div className="real">
            {temp && `${temp}° ${(units === "metric") ? 'C' : 'F'}`}
          </div>
          <div className="feel">
            {feel && `Feels Like: ${feel}° ${(units === "metric") ? 'C' : 'F'}`}
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default CurrentWeather;