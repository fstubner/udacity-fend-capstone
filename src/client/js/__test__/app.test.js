/**
 * @jest-environment jsdom
 */

import { formSubmit } from '../app';

test('Confirms the function is defined.', () => {
    expect(formSubmit).toBeDefined();
})
