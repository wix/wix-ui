declare namespace __WSR {
  namespace clients {

    export class clients  {
      static GoogleMapsClient : GoogleMapsClient;
    }

    export class GoogleMapsClient {
      autocomplete(object: any): any;
      geocode(object: any): any;
      placeDetails(object: any): any;
    }
  }
}

declare module 'wix-style-react' {
  export import clients = __WSR.clients.clients;
}

declare module 'wix-style-react/clients' {
  export default __WSR.clients.clients;
}
