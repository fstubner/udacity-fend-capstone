import { hideError, showError, toggleLoader, toggleFormButtonState } from "./utils";

export const DEPARTURE_DATE_INPUT = document.getElementById('departure-date-input');
const PLACE_NAME_INPUT = document.getElementById('placename-input');
const PLACE_IMAGE_CONTAINER = document.getElementById('place-image-container');
const FORECAST_CONTAINER = document.getElementById('forecast-container');

/**
* @description Handles form submission event.
* @param {Event} event - The form onsubmit event.
*/
export async function formSubmit(event) {
    event.preventDefault();

    PLACE_IMAGE_CONTAINER.innerHTML = '';
    FORECAST_CONTAINER.innerHTML = '';

    await hideError();
    await toggleLoader();
    await toggleFormButtonState();

    const PLACE = await getPlace(PLACE_NAME_INPUT.value);
    if (Object.keys(PLACE).length === 0) {
        await showError('Place not found.');
        await toggleLoader();
        await toggleFormButtonState();
        return;
    }

    const FORECAST = await getForecast(PLACE, DEPARTURE_DATE_INPUT.value);
    if (Object.keys(FORECAST).length === 0) {
        await showError('No weather results found.');
        await toggleLoader();
        await toggleFormButtonState();
        return;
    }

    const PLACE_IMAGE_DATA = await getPlaceImage(PLACE);
    if (PLACE_IMAGE_DATA.placeImageUrl == '' || PLACE_IMAGE_DATA.placeImageTags == '') {
        await showError('No image results found.');
        await toggleLoader();
        await toggleFormButtonState();
        return;
    }

    await setPlaceImage(PLACE_IMAGE_DATA)
    await setForecast(FORECAST);

    await toggleLoader();
    await toggleFormButtonState();
}

/**
* @description Retrieves country code and coordinates for a place name fom the Geonames API.
* @param {String} placeName - A place name.
*/
async function getPlace(placeName) {

    let place = {};

    try {
        let res = await fetch('/getPlace', {
            method: 'POST',
            mode: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ placeName: placeName })
        })

        if (!res.ok) {
            throw `${res.status} (${res.statusText})`;
        }

        place = await res.json()
    }
    catch (error) {
        console.error('An error occurred while communicating with the server:\n', error)
    }

    return place;
}

/**
* @description Retrieves an image for a place from the Pixabay API.
* @param {Object} place - A Place object including country code, coordinates, and name.
*/
async function getPlaceImage(place) {

    let placeImageData = {};

    try {
        let res = await fetch('/getPlaceImage', {
            method: 'POST',
            mode: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ place: place })
        })

        if (!res.ok) {
            throw `${res.status} (${res.statusText})`;
        }

        placeImageData = await res.json()
    }
    catch (error) {
        console.error('An error occurred while communicating with the server:\n', error)
    }

    return placeImageData;
}

/**
* @description Handles form submission event.
* @param {String} imageURL - The URL of a place image.
*/
async function setPlaceImage(placeImageData) {

    PLACE_IMAGE_CONTAINER.innerHTML = '';

    let { placeImageUrl, placeImageTags } = placeImageData;

    let placeImage = document.createElement('img');
    placeImage.className = 'place-image';
    placeImage.setAttribute('src', placeImageUrl);
    placeImage.setAttribute('alt', placeImageTags);

    PLACE_IMAGE_CONTAINER.appendChild(placeImage);
}

/**
* @description Retrieves a forecast for a place from the Weatherbit API.
* @param {Object} place - A Place object including country code, and coordinates.
* @param {String} departureDate - A date string.
*/
async function getForecast(place, departureDate) {
    let forecast = [];

    try {
        let res = await fetch('/getForecast', {
            method: 'POST',
            mode: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ place: place, departureDate: departureDate })
        })

        if (!res.ok) {
            throw `${res.status} (${res.statusText})`;
        }

        forecast = await res.json()
    }
    catch (error) {
        console.error('An error occurred while communicating with the server:\n', error)
    }

    return forecast;
}

/**
* @description Handles form submission event.
* @param {Array} forecastResult - An array of weather objects.
*/
async function setForecast(forecastResult) {
    FORECAST_CONTAINER.innerHTML = '';

    let fragment = new DocumentFragment();

    forecastResult.forEach(forecast => {
        let li = document.createElement('li');
        let forecastDate = document.createElement('div');
        forecastDate.innerHTML = forecast.datetime;
        forecastDate.className = 'forecast-date';

        let forecastIcon = document.createElement('img');
        forecastIcon.className = 'forecast-icon';
        forecastIcon.setAttribute('src', forecast.iconUrl);
        forecastIcon.setAttribute('alt', forecast.description);

        let forecastDescription = document.createElement('div');
        forecastDescription.innerHTML = forecast.description;
        forecastDescription.className = 'forecast-description';

        li.appendChild(forecastDate);
        li.appendChild(forecastIcon);
        li.appendChild(forecastDescription);

        fragment.appendChild(li);
    })

    FORECAST_CONTAINER.appendChild(fragment);
}

