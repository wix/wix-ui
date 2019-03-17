/*eslint camelcase: off*/
import {intersection} from '../../../utils/intersection';
const first = require('lodash/first');
const isUndefined = require('lodash/isUndefined');
const pickBy = require('lodash/pickBy');

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
    'postal_code',
    'postal_town'
];

const ALLOWED_TYPES_TO_INNER_FIELD = {
    street_number: 'streetNumber',
    administrative_area_level_4: 'adminArea4',
    administrative_area_level_3: 'adminArea3',
    administrative_area_level_2: 'adminArea2',
    administrative_area_level_1: 'adminArea1',
    postal_code: 'postalCode',
    postal_town: 'postalTown'
};

function getInnerFieldName(type) {
    return ALLOWED_TYPES_TO_INNER_FIELD[type] || type;
}

function formatLatLng(location) {
    return { latitude: location.lat, longitude: location.lng };
}

export function convertToFullAddress(googleResponse) {
    const addressComponents = {};
    googleResponse.address_components.forEach(addressComponent => {
        const type = first(intersection(addressComponent.types, FULL_ADDRESS_ALLOWED_TYPES));
        if (type && type !== 'postal_town') {
            addressComponents[getInnerFieldName(type)] = {
                long: addressComponent.long_name,
                short: addressComponent.short_name
            };
        }
    });

    return {
        formatted: googleResponse.formatted_address,
        location: googleResponse.geometry ? formatLatLng(googleResponse.geometry.location) : undefined,
        ...addressComponents
    };
}

function getShortValues(googleResponse) {
    const result = {};
    googleResponse.address_components.forEach(addressComponent => {
        const type = first(intersection(addressComponent.types, FULL_ADDRESS_ALLOWED_TYPES));
        if (type) {
            result[getInnerFieldName(type)] = addressComponent.short_name;
        }
    });
    return result;
}

function getStreetAddress(shortValues) {
    if (isUndefined(shortValues.route) && isUndefined(shortValues.streetNumber)) {
        return undefined;
    } else {
        return {
            name: shortValues.route,
            number: shortValues.streetNumber,
        }
    }
}

export function convertToPartialAddress(googleResponse) {
    const shortValues = getShortValues(googleResponse) as any;
    const streetAddress = getStreetAddress(shortValues);

    return {
        formatted: googleResponse.formatted_address,
        location: googleResponse.geometry ? formatLatLng(googleResponse.geometry.location) : undefined,
        streetAddress,
        subdivision: shortValues.adminArea1,
        city: shortValues.locality || shortValues.postalTown || shortValues.adminArea2,
        country: shortValues.country,
        postalCode: shortValues.postalCode,
    };
}

function removeUndefined(obj) {
    return pickBy(obj, key => !isUndefined(obj[key]));
}
