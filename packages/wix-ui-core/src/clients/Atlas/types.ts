export interface Suggestion {
  place_id: string;
  description: string;
  types: string[];
}

export type ClientAutocompleteRequest =
  | string
  | {
      input: string;
      componentRestrictions?: {
        country: string;
      };
    };

export interface ClientGeocodeRequest {
  placeId: string;
}
