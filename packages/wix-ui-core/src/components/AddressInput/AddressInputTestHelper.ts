import * as waitForCond from 'wait-for-cond';
import {createAddress, createGeocode, createPlaceDetails} from './GoogleMapsClientStub';
import {Address, Geocode, PlaceDetails} from '../../clients/GoogleMaps/types';
const first = require('lodash/first');

export const API_KEY = 'api-key';
export const ADDRESS_DESC_1 = '1 East Broadway, New York, NY, USA';
export const ADDRESS_DESC_2 = '114 N 6th St, Brooklyn, NY 11249, USA';
export const ADDRESS_1: Address = createAddress(ADDRESS_DESC_1);
export const ADDRESS_2: Address = createAddress(ADDRESS_DESC_2, ['airport']);
export const GEOCODE_1: Geocode = createGeocode(ADDRESS_1.place_id, ADDRESS_1.description);
export const GEOCODE_2: Geocode = createGeocode(ADDRESS_2.place_id, ADDRESS_2.description);
export const PLACE_DETAILS_1: PlaceDetails = createPlaceDetails(ADDRESS_1.place_id, ADDRESS_1.description);
export const PLACE_DETAILS_2: PlaceDetails = createPlaceDetails(ADDRESS_2.place_id, ADDRESS_2.description);

export const INTERNAL_ADDRESS_GEOCODE_1 = {
    formatted: '1 East Broadway, New York, NY, USA',
    latLng: {
        lat: 40.7127753,
        lng: -74.0059728
    },
    approximate: true
};

export const INTERNAL_ADDRESS_GEOCODE_2 = {
    formatted: '114 N 6th St, Brooklyn, NY 11249, USA',
    latLng: {
        lat: 40.7127753,
        lng: -74.0059728
    },
    approximate: true
};

export const INTERNAL_ADDRESS_PLACE_DETAILS_1 = {
    formatted: '1 East Broadway, New York, NY, USA',
    latLng: {
        lat: 1,
        lng: -1
    },
    approximate: true
};

export const INTERNAL_ADDRESS_PLACE_DETAILS_2 = {
    formatted: '114 N 6th St, Brooklyn, NY 11249, USA',
    latLng: {
        lat: 1,
        lng: -1
    },
    approximate: true
};

export const waitForSingleOption = (option, driver) => {
    return waitForCond(() => {
        try {
            return first(getOptionsText(driver)) === option && driver.getOptionsCount() === 1;
        } catch (e) {
            return false;
        }
    });
};

export const getOptionsText = driver => {
    const indices = Array(driver.getOptionsCount()).fill(null).map((v, i) => i);
    return indices.map(index => driver.optionAt(index).getText());
};
