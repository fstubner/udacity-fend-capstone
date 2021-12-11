/**
 * @jest-environment jsdom
 */

const { formSubmit } = require('../app.js');

test('Confirms the function is defined.', () => {
    expect(formSubmit).toBeDefined();
})
