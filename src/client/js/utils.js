export const FORM_BUTTON = document.getElementById('form-button');
export const ERROR_IMAGE = document.getElementById('error-image');
export const LOGO_IMAGE = document.getElementById('header-logo');
const ERROR_ELEMENT = document.getElementById('error-container');
const ERROR_TEXT = document.getElementById('error-text');
const LOADER = document.getElementById('loader');

/**
* @description Sets the start and end date of an Input HTML element of type date.
* @param {HTMLElement} dateInputElement - The date Input HTML element.
* @param {Date} startDate - The start date from which the range should begin.
* @param {Number} days - Number of days in the range from the start date.
*/
export async function setInputDateRange(dateInputElement, startDate, days) {
    const START_DATE = startDate;
    const START_DATE_STRING = START_DATE.toISOString().split('T')[0];
    const END_DATE_STRING = new Date(START_DATE.setDate(START_DATE.getDate() + days)).toISOString().split('T')[0];
    dateInputElement.setAttribute('min', START_DATE_STRING);
    dateInputElement.setAttribute('max', END_DATE_STRING);
}

/**
* @description Displays an error with the provided error text.
* @param {String} errorText - (Optional) Error text to display.
*/
export async function showError(errorText) {
    ERROR_ELEMENT.classList = 'flex-container show-error';
    ERROR_TEXT.innerHTML = errorText;
}

/**
* @description Hides the error container.
*/
export async function hideError() {
    ERROR_ELEMENT.classList = 'flex-container';
    ERROR_TEXT.innerHTML = '';
}

/**
* @description Toggles the loader.
*/
export async function toggleLoader() {
    LOADER.classList.toggle('show-loader');
}

/**
* @description Toggles the active state of the form input button.
*/
export async function toggleFormButtonState() {
    FORM_BUTTON.disabled = !FORM_BUTTON.disabled;
}