const REQUEST = require('axios').default;
const COUNTRIES = require('./countries');

/**
* @description Retrieves an image for a place from the Pixabay API.
* @param {Object} place - A Place object including country code, coordinates, and name.
* @returns {JSON}
* {
*     "placeImageUrl": "",
*     "placeImageTags": ""
* }
*/
async function getPlaceImage(place) {
    const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
    let placeImageUrl = '';
    let placeImageTags = '';
    try {
        let response = await REQUEST.get(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(place.name)}&image_type=photo&lang=en&orientation=horizontal&category=places&safesearch=true`);
        if (response.data.hits.length > 0) {
            const RESULT = response.data.hits[Math.floor((Math.random() * response.data.hits.length) + 0)];
            placeImageUrl = RESULT.webformatURL;
            placeImageTags = RESULT.tags;
        }
        else {
            // If no result is returned for the placename, try country code and fewer restrictions on image type
            let response = await REQUEST.get('http://localhost:8080/getCountryName', {
                method: 'POST',
                body: JSON.stringify({ country_code: place.countryCode }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            response = await REQUEST.get(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(response.response.data.country_name)}&lang=en&orientation=horizontal&category=places&safesearch=true`);
            if (response.data.hits.length > 0) {
                const RESULT = response.data.hits[Math.floor((Math.random() * response.data.hits.length) + 0)];
                placeImageUrl = RESULT.webformatURL;
                placeImageTags = RESULT.tags;
            }
        }
    }
    catch (error) {
        console.error(error);
    }
    return { placeImageUrl, placeImageTags };
}

/**
* @description Retrieves a forecast for a place from the Weatherbit API.
* @param {Object} place - A Place object including country code, and coordinates.
* @param {String} departureDate - A date string.
* @returns {JSON}
* [
*     {
*         "iconUrl": "",
*         "description": "",
*         "datetime": ""
*     }
* ]
*/
async function getForecast(place, departureDate) {
    const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
    const TODAYS_DATE = new Date();
    const DEPARTURE_DATE = new Date(departureDate);
    let forecastResult = [];

    if (DEPARTURE_DATE > TODAYS_DATE) {
        // Get forecast results
        await REQUEST.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${place.lat}&lon=${place.lng}&key=${WEATHERBIT_API_KEY}`)
            .then(res => res.data)
            .then(body => {
                const WEATHER_INDEX = body.data.findIndex(forecast => new Date(forecast.datetime).toDateString() === DEPARTURE_DATE.toDateString());

                // Slice with a start index of a negative value does not behave in the same way as end index with a value greater than arr.length.
                // Therefore need to find lowest availabe index in array.
                let startIndex = 0;
                for (let i = WEATHER_INDEX; i >= (WEATHER_INDEX - 2) && i != -1; i--) {
                    startIndex = i;
                }

                // Get a subset of the forecast.
                const FUTURE_FORECAST = body.data.slice(startIndex, WEATHER_INDEX + 3);
                FUTURE_FORECAST.forEach(forecast => {
                    forecastResult.push({
                        iconUrl: `https://www.weatherbit.io/static/img/icons/${forecast.weather.icon}.png`,
                        description: forecast.weather.description,
                        lowTemp: forecast.low_temp,
                        highTemp: forecast.high_temp,
                        datetime: forecast.datetime
                    });
                });
            })
            .catch(error => {
                console.error(error);
            });
    }
    else {
        // Get current results for today.
        await REQUEST.get(`https://api.weatherbit.io/v2.0/current?lat=${place.lat}&lon=${place.lng}&key=${WEATHERBIT_API_KEY}`)
            .then(res => res.data)
            .then(body => {
                const TODAYS_FORECAST = body.data[0];
                forecastResult.push({
                    iconUrl: `https://www.weatherbit.io/static/img/icons/${TODAYS_FORECAST.weather.icon}.png`,
                    description: TODAYS_FORECAST.weather.description,
                    lowTemp: TODAYS_FORECAST.low_temp,
                    highTemp: TODAYS_FORECAST.high_temp,
                    datetime: TODAYS_FORECAST.datetime.split(':')[0]
                    // There was some weird datetime issue where the /current endpoint would return the
                    // datetime as "datetime": "2021-12-10:21" which was not the case with /forecast/daily.
                });
            })
            .catch(error => {
                console.error(error);
            });
    }
    return forecastResult;
}

/**
* @description Retrieves country code and coordinates for a place name fom the Geonames API.
* @param {String} placeName - A place name.
* @returns {JSON}
* {
*     "lng": 0,
*     "lat": 0,
*     "countryCode": "",
*     "name": ""
* }
*/
async function getPlace(placeName) {
    const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME;
    const PLACE = {};
    await REQUEST.get(`http://api.geonames.org/postalCodeLookupJSON?placename=${encodeURIComponent(placeName)}&username=${GEONAMES_USERNAME}`)
        .then(res => res.data)
        .then(body => {
            if (body.postalcodes.length > 0) {
                PLACE['lng'] = body.postalcodes[0].lng;
                PLACE['lat'] = body.postalcodes[0].lat;
                PLACE['countryCode'] = body.postalcodes[0].countryCode;
                PLACE['name'] = placeName;
            }
        })
        .catch(error => {
            console.error(error);
        });
    return PLACE;
}

/**
* @description Retrieves the country name using a country code.
* @param {String} countryCode - Country code.
* @returns {JSON}
* {
*     "countryName": ""
* }
*/
async function getCountryName(countryCode) {
    return { countryName: COUNTRIES[countryCode] };
}

module.exports = { getCountryName, getPlace, getPlaceImage, getForecast };