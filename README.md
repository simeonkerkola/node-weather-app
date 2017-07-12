# Weather App
A Nodejs based weather application that interacts with Google Maps and Dark Sky

### Install
* Fork repo `$ git clone https://github.com/sssmi/node-weather-app.git`
* Install the dependencies `$ npm install`
* To access a Dark Sky API, Create a new account at https://darksky.net/dev/
* Copy the key you got to a `access-key.txt` file

### Use
* ```$ node app.js -address "Bundi India"  ```

**Output should look something like:**
```
Bundi, Rajasthan 323001, India
---------------
Light rain throughout the day.
It's currently: 30.98°C
It feels like: 34.05°C
Chance of rain: 15%
Humidity: 56%
Cloud coverage: 48%
Pressure: 1002.14hPa
```
