export interface Address {
  place_id: string;
  description: string;
  types: string[];
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
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  types: string[];
}

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
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
  address_components: AddressComponent[];
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
  types: string[];
  url: string;
  utc_offset: string;
  html_attributions: string;
}

export interface InternalAddress {
  locale?: string;
  formatted?: string;
  street_number?: InternalAddressComponent;
  route?: InternalAddressComponent;
  locality?: InternalAddressComponent;
  admin_area_4?: InternalAddressComponent;
  admin_area_3?: InternalAddressComponent;
  admin_area_2?: InternalAddressComponent;
  admin_area_1?: InternalAddressComponent;
  country?: string | InternalAddressComponent;
  postal_code?: InternalAddressComponent;
  location?: InternalLocation;
  streetAddress?: StreetAddress;
  postalCode?: string;
  subdivision?: string;
  city?: string;
}

export interface AddressOutput {
  originValue: string;
  googleResult: Geocode | PlaceDetails;
  address: InternalAddress;
}

export type MapsClientConstructor = new (lang?: string, instance?: string) => MapsClient;

export interface BaseMapsClient<GeocodeResult> {
  name: string;
  autocomplete(
    apiKey: string,
    lang: string,
    request: any,
    instance?: string,
  ): Promise<Address[]>;
  geocode(
    apiKey: string,
    lang: string,
    request: any,
    instance?: string,
  ): Promise<GeocodeResult[]>;
}

export interface AtlasMapsClient extends BaseMapsClient<InternalAddress> {
  name: 'atlas';
}

export interface GoogleMapsClient extends BaseMapsClient<Geocode> {
  name: 'google';
  placeDetails(
    apiKey: string,
    lang: string,
    request: any,
  ): Promise<PlaceDetails>;
  useClientId(): void;
}

export type MapsClient = GoogleMapsClient | AtlasMapsClient;

export enum Handler {
  geocode = 'geocode',
  places = 'places',
}

// Status is dictated due to https://developers.google.com/maps/documentation/javascript/reference/places-service#PlacesServiceStatus
export enum PlacesServiceStatusTypes {
  Ok = 'OK',
  InvalidRequest = 'INVALID_REQUEST',
  NotFound = 'NOT_FOUND',
  OverQueryLimit = 'OVER_QUERY_LIMIT',
  RequestDenied = 'REQUEST_DENIED',
  UnknownError = 'UNKNOWN_ERROR',
  ZeroResults = 'ZERO_RESULTS',
}
