const request = require('request')

var geocodeAddress = (address) => {
  var encodedAddress = encodeURIComponent(address) // encoded adress

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true // this specifies that data thas coming back is json
  }, (error, response, body) => {
    if(error) {
      console.log('Unable to connect to Google servers.')
    } else if(body.status === 'ZERO_RESULTS') { // $ node app.js --a "00000"
      console.log('Unable to find an address.')
    } else if (body.status === 'OK') {
      console.log(`Address: ${body.results[0].formatted_address}`)
      console.log(`Latitude: ${body.results[0].geometry.location.lat}`)
      console.log(`Longnitude: ${body.results[0].geometry.location.lng}`)
    }
  })
}

module.exports.geocodeAddress = geocodeAddress
