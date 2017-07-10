const request = require('request')

var geocodeAddress = (address, onError, onSuccess) => {
  var encodedAddress = encodeURIComponent(address) // encoded adress

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true // this specifies that data thas coming back is json
  }, (error, response, body) => {
    if(error) {
      onError('Unable to connect to Google servers.')
    } else if(body.status === 'ZERO_RESULTS') { // $ node app.js --a "00000"
      onError('Unable to find an address.')
    } else if (body.status === 'OK') {
      onSuccess({
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        lognitude: body.results[0].geometry.location.lng
      })
    }
  })
}

module.exports.geocodeAddress = geocodeAddress
