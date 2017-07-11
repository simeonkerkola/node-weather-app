const yargs = require('yargs')

const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')

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

geocode.geocodeAddress(argv.address,
  (errorMessage) => console.log(errorMessage),
  (results) => {
    console.log(results.address)
    // // lat, lng, callback
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) console.log(errorMessage)
      else console.log(`It's currently: ${weatherResults.temperature}°C\n` +
                      `It feels like: ${weatherResults.apparentTemperature}°C\n` +
                      `Cloud coverage: ${weatherResults.cloudCover}%\n` +
                      `Chanse of rain: ${weatherResults.precipProbability}%`)
    })
  }
)
