const yargs = require('yargs')
const axios = require('axios')
const fs = require('fs');
var moment = require('moment');

const key = fs.readFileSync('./access-key.txt').toString();


const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true // tells yargs to allways pass the argument as string
    }
  })
  .help()
  .alias('help', 'h')
  .argv // takes all config here and stores to argv

var encodedAddress = encodeURIComponent(argv.address) // encoded adress
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`

// http get request
axios.get(geocodeUrl).then((response) => { // axios recommends naming the argument responce, but can be anyhing
  if(response.data.status === 'ZERO_RESULTS') { // $ node app.js --a "00000"
    throw new Error('Unable to find that address')
  }
  var lat = response.data.results[0].geometry.location.lat
  var lng = response.data.results[0].geometry.location.lng
  var weatherUrl = `https://api.darksky.net/forecast/${key}/${lat},${lng}`
  console.log(response.data.results[0].formatted_address)
  return axios.get(weatherUrl)    // return another promise, get the weather

}).then((response) => {
  var weather = response.data
  var celsius = (temp) => ((temp - 32) / 1.8).toFixed(2)

  var date = new Date(weather.currently.time * 1000)
  var summary = weather.hourly.summary
  var temperature = celsius(weather.currently.temperature)
  var apparentTemperature = celsius(weather.currently.apparentTemperature)
  var precipProbability = (weather.currently.precipProbability * 100).toFixed(0)
  var humidity = (weather.currently.humidity * 100).toFixed(0)
  var cloudCover = (weather.currently.cloudCover * 100).toFixed(0)
  var pressure = weather.currently.pressure.toFixed(2)

  console.log(
        '---------------\n' +
        summary + '\n' +
        `It's currently: ${temperature}°C\n` +
        `It feels like: ${apparentTemperature}°C\n` +
        `Chance of rain: ${precipProbability}%\n` +
        `Humidity: ${humidity}%\n` +
        `Cloud coverage: ${cloudCover}%\n` +
        `Pressure: ${pressure}hPa`)

}).catch((error) => {
  if (error.response.status == 403) {
    console.log('Darksky API access forbidden.\n' +
                'Did you register at https://darksky.net/dev/ ' +
                'and copied the key you got to a access-key.txt file?')
  } else if (error.code === 'ENOTFOUND') console.log('Unable to connect to API servers.')
  else console.log(error.message)
  //console.log(error)
})