import {Address, Geocode, MapsClient, PlaceDetails} from '../../clients/GoogleMaps/types';

export function createAddress(description:string, types:Array<string> = []): Address {
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
    }
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
    static geocode: Array<Geocode> = [];
    static geocodeDelay: number;
    static placeDetails: PlaceDetails = null;
    static placeDetailsDelay: number;

    autocomplete(apiKey: string, lang: string, request: string) {
        const addresses = GoogleMapsClientStub.addresses;
        const delay = GoogleMapsClientStub.addressesDelay;
        return new Promise<Array<Address>>((resolve, reject) => setTimeout(() => resolve(addresses), delay));
    }

    geocode(apiKey: string, lang: string, request: string) {
        const geocode = GoogleMapsClientStub.geocode;
        const delay = GoogleMapsClientStub.geocodeDelay;
        return new Promise<Array<Geocode>>((resolve, reject) => setTimeout(() => resolve(geocode), delay));
    }

    placeDetails(apiKey: string, lang: string, request: string) {
        const placeDetails = GoogleMapsClientStub.placeDetails;
        const delay = GoogleMapsClientStub.placeDetailsDelay;
        return new Promise<PlaceDetails>((resolve, reject) => setTimeout(() => resolve(placeDetails), delay));
    }

    static setAddresses(addresses: Array<Address>, addressesDelay: number = 0) {
        GoogleMapsClientStub.addresses = addresses;
        GoogleMapsClientStub.addressesDelay = addressesDelay;
    }

    static setGeocode(geocode: Geocode, geocodeDelay: number = 0) {
        GoogleMapsClientStub.geocode = [geocode];
        GoogleMapsClientStub.geocodeDelay = geocodeDelay;
    }

    static setPlaceDetails(placeDetails: PlaceDetails, placeDetailsDelay: number = 0) {
        GoogleMapsClientStub.placeDetails = placeDetails;
        GoogleMapsClientStub.placeDetailsDelay = placeDetailsDelay;
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

const autocompleteEx = [
  {
    "description": "Ewing Township, NJ, USA",
    "id": "726cbf9723b1f0eb520abe11e42f085e77a5a7ba",
    "matched_substrings": [
      {
        "length": 2,
        "offset": 0
      }
    ],
    "place_id": "ChIJEzmBludXwYkR32BlbKXIGMk",
    "reference": "CjQvAAAAGFzdJ5Ei0vvITM9S35hyyHbP2AFQMhgehber3KQ8cA5e3ic7cJVW4W1VaZbe9MuaEhC7RiXZF3dM3y7umNnpySfBGhSVJbhOQvAHtRTNPZ8JF3yx5yolyQ",
    "structured_formatting": {
      "main_text": "Ewing Township",
      "main_text_matched_substrings": [
        {
          "length": 2,
          "offset": 0
        }
      ],
      "secondary_text": "NJ, USA"
    },
    "terms": [
      {
        "offset": 0,
        "value": "Ewing Township"
      },
      {
        "offset": 16,
        "value": "NJ"
      },
      {
        "offset": 20,
        "value": "USA"
      }
    ],
    "types": [
      "locality",
      "political",
      "geocode"
    ]
  }
];

const geocodeEx = [
    {
        "address_components": [
            {
                "long_name": "New York",
                "short_name": "New York",
                "types": [
                    "locality",
                    "political"
                ]
            },
            {
                "long_name": "New York",
                "short_name": "NY",
                "types": [
                    "administrative_area_level_1",
                    "political"
                ]
            },
            {
                "long_name": "United States",
                "short_name": "US",
                "types": [
                    "country",
                    "political"
                ]
            }
        ],
        "formatted_address": "New York, NY, USA",
        "geometry": {
            "location": {
                "lat": 40.7127753,
                "lng": -74.0059728
            }
        },
        "place_id": "ChIJOwg_06VPwokRYv534QaPC8g",
        "types": [
            "locality",
            "political"
        ]
    }
];

const placeDetailsEx = {
    "address_components": [
        {
            "long_name": "New South Wales",
            "short_name": "NSW",
            "types": [
                "administrative_area_level_1",
                "political"
            ]
        },
        {
            "long_name": "Australia",
            "short_name": "AU",
            "types": [
                "country",
                "political"
            ]
        }
    ],
    "adr_address": "<span class=\"region\">New South Wales</span>, <span class=\"country-name\">Australia</span>",
    "formatted_address": "New South Wales, Australia",
    "geometry": {
        "location": {
            "lat": -31.2532183,
            "lng": 146.92109900000003
        }
    },
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
    "id": "e6a10a4a3a0314c74c98164c32fdb5dadf0d0f61",
    "name": "New South Wales",
    "photos": {},
    "place_id": "ChIJDUte93TLDWsRLZ_EIhGvgBc",
    "reference": "CmRbAAAAGDIqPB2H-GxGEf_LB4foheEb79phAkhnDZUkeFWMLNJuinzZxC5Ui-3TumlPdgvPbqRopWTiVLcbEg2pBh0hMv6BDbdhojfqCeudtoy4T9Oc8r0JsM8QxF8BAnNuiAfkEhDIR0n2IPjeItkXVU_ebeb8GhT5hfPcRbjBwaPm-ZCIIj2hZqwkZw",
    "scope": "GOOGLE",
    "types": [
        "administrative_area_level_1",
        "political"
    ],
    "url": "https://maps.google.com/?q=New+South+Wales,+Australia&ftid=0x6b0dcb74f75e4b0d:0x1780af1122c49f2d",
    "utc_offset": 660,
    "html_attributions": []
};

const wsrEx = {
    "originValue": "Aritzia, 5th Avenue, New York, NY, USA",
    "googleResult": {
        "address_components": [
            {
                "long_name": "600",
                "short_name": "600",
                "types": [
                    "street_number"
                ]
            },
            {
                "long_name": "5th Avenue",
                "short_name": "5th Ave",
                "types": [
                    "route"
                ]
            },
            {
                "long_name": "Manhattan",
                "short_name": "Manhattan",
                "types": [
                    "political",
                    "sublocality",
                    "sublocality_level_1"
                ]
            },
            {
                "long_name": "New York",
                "short_name": "New York",
                "types": [
                    "locality",
                    "political"
                ]
            },
            {
                "long_name": "New York County",
                "short_name": "New York County",
                "types": [
                    "administrative_area_level_2",
                    "political"
                ]
            },
            {
                "long_name": "New York",
                "short_name": "NY",
                "types": [
                    "administrative_area_level_1",
                    "political"
                ]
            },
            {
                "long_name": "United States",
                "short_name": "US",
                "types": [
                    "country",
                    "political"
                ]
            },
            {
                "long_name": "10020",
                "short_name": "10020",
                "types": [
                    "postal_code"
                ]
            },
            {
                "long_name": "2302",
                "short_name": "2302",
                "types": [
                    "postal_code_suffix"
                ]
            }
        ],
        "formatted_address": "600 5th Ave, New York, NY 10020, USA",
        "geometry": {
            "location": {
                "lat": 40.757698,
                "lng": -73.9783099
            },
            "location_type": "ROOFTOP",
            "viewport": {
                "south": 40.75634901970849,
                "west": -73.97965888029148,
                "north": 40.75904698029149,
                "east": -73.97696091970852
            }
        },
        "place_id": "ChIJyxv9kv5YwokRWyCNi32nJ5k",
        "types": [
            "clothing_store",
            "establishment",
            "point_of_interest",
            "store"
        ]
    },
    "address": {
        "formatted": "600 5th Ave, New York, NY 10020, USA",
        "latLng": {
            "lat": 40.757698,
            "lng": -73.9783099
        },
        "approximate": true,
        "city": "New York",
        "state": "NY",
        "country": "United States",
        "countryCode": "US",
        "street": "5th Avenue",
        "number": "600",
        "postalCode": "10020"
    }
};