import { DEPARTURE_DATE_INPUT, formSubmit } from './js/app';
import { LOGO_IMAGE, ERROR_IMAGE, FORM_BUTTON, setInputDateRange } from './js/utils';
import notFoundImage from './images/not_found.png';
import logoImage from './images/logo.png';
import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/main.scss';
import './styles/header.scss';
import './styles/responsive.scss';

document.addEventListener('DOMContentLoaded', () => {
    // Limiting date selection of date picker to within 16 days, as that is the max forecast available.
    setInputDateRange(DEPARTURE_DATE_INPUT, new Date(), 15);

    // Setting images.
    ERROR_IMAGE.src = notFoundImage;
    LOGO_IMAGE.src = logoImage;
})

export {
    formSubmit
}