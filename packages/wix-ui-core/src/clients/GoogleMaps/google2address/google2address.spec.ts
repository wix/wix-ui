/*eslint camelcase: off*/
import {convertToFullAddress} from './google2address';
import {googleResponse, partialGoogleResponse} from './fixtures';

describe('google 2 full address', () => {
    it('should transform raw google response to full address format', () => {
        const fullAddress = convertToFullAddress(googleResponse);
        expect(fullAddress).toEqual({
            formatted: '137 Lexington Ave, New York, NY 10016, USA',
            street_number: {short: '137', long: '137'},
            route: {short: 'Lexington Ave', long: 'Lexington Avenue'},
            locality: {short: 'New York', long: 'New York'},
            admin_area_4: {short: 'admin_area_4_short', long: 'admin_area_4_long'},
            admin_area_3: {short: 'admin_area_3_short', long: 'admin_area_3_long'},
            admin_area_2: {short: 'New York County', long: 'New York County'},
            admin_area_1: {short: 'NY', long: 'New York'},
            country: {short: 'US', long: 'United States'},
            postal_code: {short: '10016', long: '10016'},
            location: {lat: 40.7432934, lng: -73.98182050000003}
        });
    });

    it('should skip undefined fields', () => {
        const singleAddressComponent = JSON.parse(JSON.stringify(googleResponse));
        singleAddressComponent.address_components = [{
            long_name: '137',
            short_name: '137',
            types: ['street_number']
        }];

        const fullAddress = convertToFullAddress(singleAddressComponent);
        expect(fullAddress).toEqual({
            formatted: '137 Lexington Ave, New York, NY 10016, USA',
            street_number: {short: '137', long: '137'},
            location: {lat: 40.7432934, lng: -73.98182050000003}
        });
    });

    it('should handle no lat/lng gracefully', () => {
        const noLatLngAddress = JSON.parse(JSON.stringify(googleResponse));
        noLatLngAddress.geometry = null;

        const fullAddress = convertToFullAddress(noLatLngAddress);
        expect(fullAddress).toEqual({
            formatted: '137 Lexington Ave, New York, NY 10016, USA',
            street_number: {short: '137', long: '137'},
            route: {short: 'Lexington Ave', long: 'Lexington Avenue'},
            locality: {short: 'New York', long: 'New York'},
            admin_area_4: {short: 'admin_area_4_short', long: 'admin_area_4_long'},
            admin_area_3: {short: 'admin_area_3_short', long: 'admin_area_3_long'},
            admin_area_2: {short: 'New York County', long: 'New York County'},
            admin_area_1: {short: 'NY', long: 'New York'},
            country: {short: 'US', long: 'United States'},
            postal_code: {short: '10016', long: '10016'}
        });
    });

    it('should handle no lat/lng gracefully', () => {
        const fullAddress = convertToFullAddress(partialGoogleResponse);
        expect(fullAddress).toEqual({
            formatted: '5th Ave, New York, NY, USA',
            route: {short: '5th Ave', long: '5th Avenue'},
            locality: {short: 'New York', long: 'New York'},
            admin_area_2: {short: 'New York County', long: 'New York County'},
            admin_area_1: {short: 'NY', long: 'New York'},
            country: {short: 'US', long: 'United States'},
            location: {lat: 40.7750545, lng: -73.96515099999999}
        });
    });
});
