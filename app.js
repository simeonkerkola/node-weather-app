const yargs = require('yargs')

const geocode = require('./geocode/geocode')

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
  (results) => console.log(JSON.stringify(results, undefined, 2))
)
