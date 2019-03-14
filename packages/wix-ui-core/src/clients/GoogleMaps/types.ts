export interface Address {
    place_id: string;
    description: string;
    types: Array<string>;
}

export interface Location {
    lat: number;
    lng: number;
}

export interface InternalLocation {
    latitude: number;
    longitude: number;
}

export interface Geometry {
    location: Location;
}

export interface Geocode {
    address_components: Array<AddressComponent>;
    formatted_address: string;
    geometry: Geometry;
    place_id: string;
    types: Array<string>;
}

export interface AddressComponent {
    long_name: string;
    short_name: string;
    types: Array<string>;
}

export interface InternalAddressComponent {
    long: string;
    short: string;
}

export interface StreetAddress {
    name?: string;
    number?: string;
}

export interface PlaceDetails {
    address_components: Array<AddressComponent>;
    adr_address: string;
    formatted_address: string;
    geometry: Geometry;
    icon: string;
    id: string;
    name: string;
    photos: string;
    place_id: string;
    reference: string;
    scope: string;
    types: Array<string>;
    url: string;
    utc_offset: string;
    html_attributions: string;
}

export interface InternalAddress {
    formatted?: string;
    location?: InternalLocation;
    streetAddress?: StreetAddress;
    country?: string;
    postalCode?: string;
    subdivision?: string;
    city?: string;
}


export interface AddressOutput {
    originValue: string;
    googleResult: Geocode|PlaceDetails;
    address: InternalAddress;
}

export interface MapsClientConstructor {
    new (): MapsClient;
}

export interface MapsClient {
    autocomplete: (apiKey: string, lang: string, request: any) => Promise<Array<Address>>;
    geocode: (apiKey: string, lang: string, request: any) => Promise<Array<Geocode>>;
    placeDetails: (apiKey: string, lang: string, request: any) => Promise<PlaceDetails>;
    useClientId: () => void
}

export enum Handler {
    geocode = 'geocode',
    places = 'places'
}
