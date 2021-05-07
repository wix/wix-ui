/*eslint camelcase: off*/
import {
  convertToFullAddress,
  convertToPartialAddress,
} from './google2address';
import { googleResponse, partialGoogleResponse } from './fixtures';

describe('google 2 full address', () => {
  it('should transform raw google response to full address format', () => {
    const fullAddress = convertToFullAddress(googleResponse);
    expect(fullAddress).toEqual({
      formatted: '137 Lexington Ave, New York, NY 10016, USA',
      streetNumber: { short: '137', long: '137' },
      route: { short: 'Lexington Ave', long: 'Lexington Avenue' },
      locality: { short: 'New York', long: 'New York' },
      adminArea4: { short: 'admin_area_4_short', long: 'admin_area_4_long' },
      adminArea3: { short: 'admin_area_3_short', long: 'admin_area_3_long' },
      adminArea2: { short: 'New York County', long: 'New York County' },
      adminArea1: { short: 'NY', long: 'New York' },
      country: { short: 'US', long: 'United States' },
      postalCode: { short: '10016', long: '10016' },
      location: { latitude: 40.7432934, longitude: -73.98182050000003 },
    });
  });

  it('should skip undefined fields', () => {
    const singleAddressComponent = JSON.parse(JSON.stringify(googleResponse));
    singleAddressComponent.address_components = [
      {
        long_name: '137',
        short_name: '137',
        types: ['street_number'],
      },
    ];

    const fullAddress = convertToFullAddress(singleAddressComponent);
    expect(fullAddress).toEqual({
      formatted: '137 Lexington Ave, New York, NY 10016, USA',
      streetNumber: { short: '137', long: '137' },
      location: { latitude: 40.7432934, longitude: -73.98182050000003 },
    });
  });

  it('should handle no lat/lng gracefully', () => {
    const noLatLngAddress = JSON.parse(JSON.stringify(googleResponse));
    noLatLngAddress.geometry = null;

    const fullAddress = convertToFullAddress(noLatLngAddress);
    expect(fullAddress).toEqual({
      formatted: '137 Lexington Ave, New York, NY 10016, USA',
      streetNumber: { short: '137', long: '137' },
      route: { short: 'Lexington Ave', long: 'Lexington Avenue' },
      locality: { short: 'New York', long: 'New York' },
      adminArea4: { short: 'admin_area_4_short', long: 'admin_area_4_long' },
      adminArea3: { short: 'admin_area_3_short', long: 'admin_area_3_long' },
      adminArea2: { short: 'New York County', long: 'New York County' },
      adminArea1: { short: 'NY', long: 'New York' },
      country: { short: 'US', long: 'United States' },
      postalCode: { short: '10016', long: '10016' },
    });
  });

  it('should handle partial response gracefully', () => {
    const fullAddress = convertToFullAddress(partialGoogleResponse);
    expect(fullAddress).toEqual({
      formatted: '5th Ave, New York, NY, USA',
      route: { short: '5th Ave', long: '5th Avenue' },
      locality: { short: 'New York', long: 'New York' },
      adminArea2: { short: 'New York County', long: 'New York County' },
      adminArea1: { short: 'NY', long: 'New York' },
      country: { short: 'US', long: 'United States' },
      location: { latitude: 40.7750545, longitude: -73.96515099999999 },
    });
  });
});

describe('google 2 partial address', () => {
  it('should transform raw google response to full address format', () => {
    const fullAddress = convertToPartialAddress(googleResponse);
    expect(fullAddress).toEqual({
      formatted: '137 Lexington Ave, New York, NY 10016, USA',
      streetAddress: { name: 'Lexington Ave', number: '137' },
      city: 'New York',
      subdivision: 'NY',
      country: 'US',
      postalCode: '10016',
      location: { latitude: 40.7432934, longitude: -73.98182050000003 },
    });
  });

  it('should consider postal_town.short as city if locality is not defined', () => {
    const noLocality = JSON.parse(JSON.stringify(googleResponse));
    noLocality.address_components = noLocality.address_components.filter(
      (ac) => ac.types.indexOf('locality') === -1,
    );
    const fullAddress = convertToPartialAddress(noLocality);
    expect(fullAddress).toMatchObject({
      city: 'postal_town_short',
    });
  });

  it('should fall back to admin_area2.short as city if locality and postal_town are not defined', () => {
    const noLocalityAndPostalTown = JSON.parse(JSON.stringify(googleResponse));
    noLocalityAndPostalTown.address_components = noLocalityAndPostalTown.address_components.filter(
      (ac) => ac.types.indexOf('locality') === -1,
    );
    noLocalityAndPostalTown.address_components = noLocalityAndPostalTown.address_components.filter(
      (ac) => ac.types.indexOf('postal_town') === -1,
    );
    const fullAddress = convertToPartialAddress(noLocalityAndPostalTown);
    expect(fullAddress).toMatchObject({
      city: 'New York County',
    });
  });

  it('should skip undefined fields', () => {
    const singleAddressComponent = JSON.parse(JSON.stringify(googleResponse));
    singleAddressComponent.address_components = [
      {
        long_name: '137',
        short_name: '137',
        types: ['street_number'],
      },
    ];

    const fullAddress = convertToPartialAddress(singleAddressComponent);
    expect(fullAddress).toEqual({
      formatted: '137 Lexington Ave, New York, NY 10016, USA',
      streetAddress: { number: '137' },
      location: { latitude: 40.7432934, longitude: -73.98182050000003 },
    });
  });

  it('should handle no address components gracefully', () => {
    const noAddressComponents = JSON.parse(JSON.stringify(googleResponse));
    noAddressComponents.address_components = [];

    const fullAddress = convertToPartialAddress(noAddressComponents);
    expect(fullAddress).toEqual({
      formatted: '137 Lexington Ave, New York, NY 10016, USA',
      location: { latitude: 40.7432934, longitude: -73.98182050000003 },
    });
  });

  it('should handle no lat/lng gracefully', () => {
    const noLatLngAddress = JSON.parse(JSON.stringify(googleResponse));
    noLatLngAddress.geometry = null;

    const fullAddress = convertToPartialAddress(noLatLngAddress);
    expect(fullAddress).toEqual({
      formatted: '137 Lexington Ave, New York, NY 10016, USA',
      streetAddress: { name: 'Lexington Ave', number: '137' },
      city: 'New York',
      subdivision: 'NY',
      country: 'US',
      postalCode: '10016',
    });
  });

  it('should handle partial response gracefully', () => {
    const fullAddress = convertToPartialAddress(partialGoogleResponse);
    expect(fullAddress).toEqual({
      formatted: '5th Ave, New York, NY, USA',
      streetAddress: { name: '5th Ave' },
      city: 'New York',
      subdivision: 'NY',
      country: 'US',
      location: { latitude: 40.7750545, longitude: -73.96515099999999 },
    });
  });
});
