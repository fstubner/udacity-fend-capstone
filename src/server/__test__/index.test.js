import { countries } from '../countries.js';

test('Confirms a country can be retrieved via Country Code.', () => {
    expect(countries['IE']).toEqual('Ireland');
})