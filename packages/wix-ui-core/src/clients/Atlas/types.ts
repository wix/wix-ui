export interface Address {
  place_id: string;
  description: string;
  types: string[];
}

// export interface MapsClient {
//   autocomplete(apiKey: string, lang: string, request: any): Promise<Address[]>;
//   geocode(apiKey: string, lang: string, request: any): Promise<Geocode[]>;
//   useClientId(): void;
// }
