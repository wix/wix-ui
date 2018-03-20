/*eslint camelcase: off*/
const isUndefined = require('lodash/isUndefined');

interface ComponentsType {
    administrative_area_level_1?: {
        short_name?: string;
    };
    country?: {
        short_name?: string;
        long_name?: string;
    };
    route?: {
        long_name?: string;
    };
    street_number?: {
        long_name?: string;
    };
    postal_code?: {
        long_name?: string;
    };
    subpremise?: {
        long_name?: string;
    };
    locality?: {
        long_name?: string;
    };
    sublocality?: {
        long_name?: string;
    };
    postal_town?: {
        long_name?: string;
    };
}

export const includes = (arr, value) => {
    return Boolean(arr && arr.find(item => item === value)); // we compare only primitives
};

const locationFuncOrValue = locationProp => {
    return typeof locationProp === 'function' ? locationProp() : locationProp;
};

const getFormattedStreetAddress = address => {
    try {
        if (!address || !document) {
            return undefined;
        }

        const wrapperElement = document.createElement('div');
        wrapperElement.innerHTML = address;

        const addressElement = wrapperElement.querySelector('.street-address');
        return addressElement ? addressElement.textContent : undefined;
    } catch (e) {
        return undefined;
    }
};

export function google2address(google) {
    const components: ComponentsType = {};
    google.address_components.forEach(({types, long_name, short_name}) => {
        types.forEach(type => {
            components[type] = {long_name, short_name};
        });
    });

    const locality = components.locality || components.sublocality || components.postal_town;
    const {lat, lng} = google.geometry.location;

    const result = {
        formatted: google.formatted_address,
        formattedStreetAddress: getFormattedStreetAddress(google.adr_address),
        latLng: {
            lat: locationFuncOrValue(lat),
            lng: locationFuncOrValue(lng)
        },
        approximate: (!includes(google.types, 'street_address') && (!includes(google.types, 'premise'))),
        city: locality && locality.long_name,
        state: components.administrative_area_level_1 && components.administrative_area_level_1.short_name,
        country: components.country && components.country.long_name,
        countryCode: components.country && components.country.short_name,
        street: components.route && components.route.long_name,
        number: components.street_number && components.street_number.long_name,
        postalCode: components.postal_code && components.postal_code.long_name,
        subpremise: components.subpremise && components.subpremise.long_name
    };

    for (const key in result) {
        if (isUndefined(result[key])) {
            delete result[key];
        }
    }

    return result;
}

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
