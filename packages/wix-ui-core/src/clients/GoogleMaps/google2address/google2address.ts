/*eslint camelcase: off*/
import {intersection} from '../../../utils/intersection';
import first = require('lodash/first');

export const trySetStreetNumberIfNotReceived = (google, inputValue) => {
    const addressParts = inputValue.match(/^\d+[ -/]*\d*[^\D]/);
    const hasStreetNumber = google.address_components.some(address => address.types.some(t => t === 'street_number'));
    if (hasStreetNumber || !addressParts) {
        return google;
    }
    google.address_components.unshift({
        long_name: addressParts.join(),
        short_name: addressParts.join(),
        types: ['street_number']
    });
    return google;
};

const FULL_ADDRESS_ALLOWED_TYPES = [
    'street_number',
    'route',
    'locality',
    'administrative_area_level_4',
    'administrative_area_level_3',
    'administrative_area_level_2',
    'administrative_area_level_1',
    'country',
    'postal_code'
];

const ALLOWED_TYPES_TO_INNER_FIELD = {
    street_number: 'streetNumber',
    administrative_area_level_4: 'adminArea4',
    administrative_area_level_3: 'adminArea3',
    administrative_area_level_2: 'adminArea2',
    administrative_area_level_1: 'adminArea1',
    postal_code: 'postalCode'
};

function getInnerFieldName(type) {
    return ALLOWED_TYPES_TO_INNER_FIELD[type] || type;
}

export function convertToFullAddress(googleResponse) {
    const addressComponents = {};
    googleResponse.address_components.forEach(addressComponent => {
        const type = first(intersection(addressComponent.types, FULL_ADDRESS_ALLOWED_TYPES));
        if (type) {
            addressComponents[getInnerFieldName(type)] = {
                long: addressComponent.long_name,
                short: addressComponent.short_name
            };
        }
    });

    return {
        formatted: googleResponse.formatted_address,
        location: googleResponse.geometry ? googleResponse.geometry.location : undefined,
        ...addressComponents
    };
}
