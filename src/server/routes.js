const { getCountryName, getPlace, getPlaceImage, getForecast } = require('./apis');
const ROUTER = require('express').Router();


/**
* @description Returns a country name based off a country code.
*/
ROUTER.post('/getCountryName', async (req, res) => {
    res.json(await getCountryName(req.body.countryCode));
})

/**
* @description Returns an image and image tags for a specified place.
*/
ROUTER.post('/getPlaceImage', async (req, res) => {
    res.json(await getPlaceImage(req.body.place));
})

/**
* @description Returns the forecast of one or more days.
*/
ROUTER.post('/getForecast', async (req, res) => {
    res.json(await getForecast(req.body.place, req.body.departureDate));
})

/**
* @description Returns place coordinates, country code and name
*/
ROUTER.post('/getPlace', async (req, res) => {
    res.json(await getPlace(req.body.placeName));
})

module.exports = ROUTER;