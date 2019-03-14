/*eslint camelcase: off*/
import {convertToFullAddress} from './google2address';
import {googleResponse, partialGoogleResponse} from './fixtures';

describe('google 2 full address', () => {
    it('should transform raw google response to full address format', () => {
        const fullAddress = convertToFullAddress(googleResponse);
        expect(fullAddress).toEqual({
            formatted: '137 Lexington Ave, New York, NY 10016, USA',
            streetAddress: {name: 'Lexington Ave', number: '137'},
            city: 'New York',
            subdivision: 'NY',
            country: 'US',
            postalCode: '10016',
            location: {latitude: 40.7432934, longitude: -73.98182050000003}
        });
    });

    it('should consider postal_town.short as city if locality is not defined', () => {
        const noLocality = JSON.parse(JSON.stringify(googleResponse));
        noLocality.address_components = noLocality.address_components.filter(ac => ac.types.indexOf('locality') === -1);
        const fullAddress = convertToFullAddress(noLocality);
        expect(fullAddress).toMatchObject({
            city: 'postal_town_short'
        });
    });

    it('should fall back to admin_area2.short as city if locality and postal_town are not defined', () => {
        const noLocalityAndPostalTown = JSON.parse(JSON.stringify(googleResponse));
        noLocalityAndPostalTown.address_components = noLocalityAndPostalTown.address_components.filter(ac => ac.types.indexOf('locality') === -1);
        noLocalityAndPostalTown.address_components = noLocalityAndPostalTown.address_components.filter(ac => ac.types.indexOf('postal_town') === -1);
        const fullAddress = convertToFullAddress(noLocalityAndPostalTown);
        expect(fullAddress).toMatchObject({
            city: 'New York County'
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
            streetAddress: {number: '137'},
            location: {latitude: 40.7432934, longitude: -73.98182050000003}
        });
    });

    it('should handle no address components gracefully', () => {
        const noAddressComponents = JSON.parse(JSON.stringify(googleResponse));
        noAddressComponents.address_components = [];

        const fullAddress = convertToFullAddress(noAddressComponents);
        expect(fullAddress).toEqual({
            formatted: '137 Lexington Ave, New York, NY 10016, USA',
            location: {latitude: 40.7432934, longitude: -73.98182050000003}
        });
    });

    it('should handle no lat/lng gracefully', () => {
        const noLatLngAddress = JSON.parse(JSON.stringify(googleResponse));
        noLatLngAddress.geometry = null;

        const fullAddress = convertToFullAddress(noLatLngAddress);
        expect(fullAddress).toEqual({
            formatted: '137 Lexington Ave, New York, NY 10016, USA',
            streetAddress: {name: 'Lexington Ave', number: '137'},
            city: 'New York',
            subdivision: 'NY',
            country: 'US',
            postalCode: '10016',
        });
    });

    it('should handle partial response gracefully', () => {
        const fullAddress = convertToFullAddress(partialGoogleResponse);
        expect(fullAddress).toEqual({
            formatted: '5th Ave, New York, NY, USA',
            streetAddress: {name: '5th Ave'},
            city: 'New York',
            subdivision: 'NY',
            country: 'US',
            location: {latitude: 40.7750545, longitude: -73.96515099999999}
        });
    });
});
