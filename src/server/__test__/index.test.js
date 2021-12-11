import { countries } from '../countries';

test('Confirms a country can be retrieved via Country Code.', () => {
    expect(countries).toBeDefined();
    expect(countries['IE']).toEqual('Ireland');
})