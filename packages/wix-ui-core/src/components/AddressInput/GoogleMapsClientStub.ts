import {Address, Geocode, MapsClient, PlaceDetails} from '../../clients/GoogleMaps/types';

export function createAddress(description: string, types: Array<string> = []): Address {
  return {
      description,
      place_id: `place_id${description.toLowerCase().replace(/ /g, '')}`,
      types
  };
}

export function createGeocode(placeId: string, formattedAddress: string): Geocode {
    return {
        address_components: [],
        formatted_address: formattedAddress,
        geometry: {
            location: {
                lat: 40.7127753,
                lng: -74.0059728
            }
        },
        place_id: placeId,
        types: []
    };
}

export function createPlaceDetails(placeId: string, formattedAddress: string): PlaceDetails {
    return {
        address_components: [],
        adr_address: 'adr_address',
        formatted_address: formattedAddress,
        geometry: {
            location: {
                lat: 1.0,
                lng: -1.0
            }
        },
        html_attributions: 'html_attributions',
        icon: 'icon',
        id: 'id',
        name: 'name',
        photos: 'photos',
        place_id: placeId,
        reference: 'reference',
        types: [],
        url: 'url',
        utc_offset: 'utc_offset',
        scope: 'scope'
    };
}

export class GoogleMapsClientStub implements MapsClient {
    static addresses: Array<Address> = [];
    static addressesDelay: number;
    static addressesPromise: Promise<any>;
    static geocode: Array<Geocode> = [];
    static geocodeDelay: number;
    static geocodePromise: Promise<any>;
    static placeDetails: PlaceDetails = null;
    static placeDetailsDelay: number;
    static placeDetailsPromise: Promise<any>;

    autocomplete(apiKey: string, lang: string, request: string) {
        const addresses = GoogleMapsClientStub.addresses;
        const delay = GoogleMapsClientStub.addressesDelay;

        if (GoogleMapsClientStub.addressesPromise) {
            const promise = GoogleMapsClientStub.addressesPromise;
            GoogleMapsClientStub.addressesPromise = null;
            return promise.then(() => addresses);
        }

        return new Promise<Array<Address>>((resolve, reject) => setTimeout(() => resolve(addresses), delay));
    }

    geocode(apiKey: string, lang: string, request: string) {
        const geocode = GoogleMapsClientStub.geocode;
        const delay = GoogleMapsClientStub.geocodeDelay;

        if (GoogleMapsClientStub.geocodePromise) {
            const promise = GoogleMapsClientStub.geocodePromise;
            GoogleMapsClientStub.geocodePromise = null;
            return promise.then(() => geocode);
        }

        return new Promise<Array<Geocode>>((resolve, reject) => setTimeout(() => resolve(geocode), delay));
    }

    placeDetails(apiKey: string, lang: string, request: string) {
        const placeDetails = GoogleMapsClientStub.placeDetails;
        const delay = GoogleMapsClientStub.placeDetailsDelay;

        if (GoogleMapsClientStub.placeDetailsPromise) {
            const promise = GoogleMapsClientStub.placeDetailsPromise;
            GoogleMapsClientStub.placeDetailsPromise = null;
            return promise.then(() => placeDetails);
        }

        return new Promise<PlaceDetails>((resolve, reject) => setTimeout(() => resolve(placeDetails), delay));
    }

    static setAddresses(addresses: Array<Address>, addressesDelay: number = 0) {
        GoogleMapsClientStub.addresses = addresses;
        GoogleMapsClientStub.addressesDelay = addressesDelay;
    }

    static setAddressesPromise(addresses: Array<Address>) {
        let resolve = null, reject = null;
        GoogleMapsClientStub.setAddresses(addresses);
        GoogleMapsClientStub.addressesPromise = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
        });
        return {resolve, reject};
    }

    static setGeocode(geocode: Geocode, geocodeDelay: number = 0) {
        GoogleMapsClientStub.geocode = [geocode];
        GoogleMapsClientStub.geocodeDelay = geocodeDelay;
    }

    static setGeocodePromise(geocode: Geocode) {
        let resolve = null, reject = null;
        GoogleMapsClientStub.setGeocode(geocode);
        GoogleMapsClientStub.geocodePromise = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
        });
        return {resolve, reject};
    }

    static setPlaceDetails(placeDetails: PlaceDetails, placeDetailsDelay: number = 0) {
        GoogleMapsClientStub.placeDetails = placeDetails;
        GoogleMapsClientStub.placeDetailsDelay = placeDetailsDelay;
    }

    static setPlaceDetailsPromise(placeDetails: PlaceDetails) {
        let resolve = null, reject = null;
        GoogleMapsClientStub.setPlaceDetails(placeDetails);
        GoogleMapsClientStub.placeDetailsPromise = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
        });
        return {resolve, reject};
    }

    static reset() {
        GoogleMapsClientStub.addresses = [];
        GoogleMapsClientStub.addressesDelay = 0;
        GoogleMapsClientStub.geocode = null;
        GoogleMapsClientStub.geocodeDelay = 0;
        GoogleMapsClientStub.placeDetails = null;
        GoogleMapsClientStub.placeDetailsDelay = 0;
    }
}
