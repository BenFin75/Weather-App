import symbols from "./symbols";

const FiveDayWeather = ({ weather, units }) => {
  const todaysDate = new Date();
  let days = [];
  
  if (weather !== '') {
    const dailyWeather = weather.data.daily
    for (let i = 1; i < 5; i++) {
      const daysWeather = dailyWeather[i];
      const day = {};
      const forcastDay = new Date(todaysDate);
      forcastDay.setDate(forcastDay.getDate() + i);
      day.weekday = forcastDay.toLocaleDateString([], { weekday: 'long' });
      let weatherSymbol = daysWeather.weather[0].main
      if (weatherSymbol === 'Clouds') {
        if (weather.clouds < 50) {
          weatherSymbol = 'PartlyCloudy'
        }
      }
      day.symbol = <img src={symbols[weatherSymbol]} alt={`${weatherSymbol} symbol`} />
      day.percipChance = parseInt(daysWeather.pop) * 100;
      day.maxTemp = Math.round(parseFloat(daysWeather.temp.max));
      day.minTemp = Math.round(parseFloat(daysWeather.temp.min));
      days.push(day);
    }
    
  }

  return (
    <div className="five-day">
      <div className="days-container">
        {days.map(day => {
          return (
            <div className="day" key={day.weekday}>
              <div className="day-name">
                {day.weekday}
              </div>
              <div className="symbology">
                {day.symbol}
              </div>
              <div className="percip-chance">
                  {`${day.percipChance}%`}
              </div>
              <div className="temps">
                <div className="max-temp">
                  {day.maxTemp && `${day.maxTemp}° ${(units === "metric") ? 'C' : 'F'}`}
                </div>
                <div>/</div>
                <div className="min-temp">
                  {day.minTemp && `${day.minTemp}° ${(units === "metric") ? 'C' : 'F'}`}
                </div>
              </div>
              <div className="selected"></div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
 
export default FiveDayWeather;