const clear = require('./img/Clear.svg').default
const rain = require('./img/Rain.svg').default
const drizzle = require('./img/ChanceOfRain.svg').default
const clouds = require('./img/Clouds.svg').default
const partlyCloudy = require('./img/PartlyCloudy.svg').default
const snow = require('./img/Snow.svg').default
const thunderstorm = require('./img/Storm.svg').default
const haze = require('./img/Haze.svg').default
const dust = require('./img/Dust.svg').default
const tornado = require('./img/Tornado.svg').default 

const symbols = {
  Clear: clear,
  Rain: rain,
  Drizzle: drizzle,
  Clouds: clouds,
  PartlyCloudy: partlyCloudy,
  Snow: snow,
  Thunderstorm: thunderstorm,
  Mist: haze,
  Smoke: haze,
  Haze: haze,
  Fog: haze,
  Sand: dust,
  Dust: dust,
  Ash: dust,
  Squall: thunderstorm,
  Tornado: tornado,
};

export default symbols;