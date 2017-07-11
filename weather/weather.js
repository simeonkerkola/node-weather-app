const request = require('request')
const fs = require('fs');

const key = fs.readFileSync('./access-key.txt').toString();

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${key}/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) { // if no error and status code 200, everythings ok
      var celsius = (temp) => ((temp - 32) / 1.8).toFixed(2)
      callback(undefined, {   // undefined because there is no error message
        temperature: celsius(body.currently.temperature),
        apparentTemperature: celsius(body.currently.apparentTemperature),
        cloudCover: body.currently.cloudCover * 100,
        precipProbability: body.currently.precipProbability * 100
      })
    } else if (body === 'Forbidden\n') {
      callback('Darksky API access forbidden.\n' +
        'Did you register at https://darksky.net/dev/ ' +
        'and copied the key you got to a /access-key.txt file?')
    } else {
      callback('Unable to fetch weather')
    }
  })
}

module.exports.getWeather = getWeather
