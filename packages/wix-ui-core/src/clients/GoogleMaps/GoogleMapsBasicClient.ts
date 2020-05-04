import { Omit } from 'type-zoo';
import {
  Address,
  Geocode,
  MapsClient,
  PlacesServiceStatusTypes,
} from './types';

function defer() {
  let resolve, reject;
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  return { promise, resolve, reject };
}

const locationFuncOrValue = locationProp => {
  return typeof locationProp === 'function' ? locationProp() : locationProp;
};

const serializeResult = results => ({
  ...results,
  geometry: {
    ...results.geometry,
    location: {
      lat: locationFuncOrValue(results.geometry.location.lat),
      lng: locationFuncOrValue(results.geometry.location.lng),
    },
  },
});

// placeDetails is not required at the moment
export class GoogleMapsBasicClient implements Omit<MapsClient, 'placeDetails'> {
  private _autocomplete;
  private _geocoder;
  private _loadScriptPromise;
  private _useClientId;

  _initServices() {
    if (!this._autocomplete) {
      this._autocomplete = new (window as any).google.maps.places.AutocompleteService();
    }

    if (!this._geocoder) {
      this._geocoder = new (window as any).google.maps.Geocoder();
    }
  }

  loadScript(clientId, lang) {
    if (this._loadScriptPromise) {
      return this._loadScriptPromise;
    }

    if ((window as any).google && (window as any).google.maps) {
      this._initServices();
      return;
    }

    const { promise, resolve } = defer();

    (window as any).initMap = () => {
      this._initServices();
      resolve();
    };

    const script = document.createElement('script');
    const authKey = this._useClientId ? 'client' : 'key';
    script.src = `//maps.googleapis.com/maps/api/js?libraries=places&${authKey}=${clientId}&callback=initMap&language=${lang}`;
    document.body.appendChild(script);

    this._loadScriptPromise = promise;

    return promise;
  }

  useClientId() {
    this._useClientId = true;
  }

  async autocomplete(
    clientId: string,
    lang: string,
    request: any,
  ): Promise<Address[]> {
    const { promise, resolve, reject } = defer();

    await this.loadScript(clientId, lang);
    this._autocomplete.getPlacePredictions(
      typeof request === 'string' ? { input: request } : request,
      (results, status) => {
        if (status === PlacesServiceStatusTypes.Ok) {
          resolve(results);
        } else {
          reject(status);
        }
      },
    );

    return promise as Promise<Address[]>;
  }

  async geocode(
    clientId: string,
    lang: string,
    request: any,
  ): Promise<Geocode[]> {
    const { promise, resolve, reject } = defer();

    await this.loadScript(clientId, lang);
    this._geocoder.geocode(
      typeof request === 'string' ? { address: request } : request,
      (results, status) => {
        if (status === PlacesServiceStatusTypes.Ok) {
          resolve(results.map(result => serializeResult(result)));
        } else {
          reject(status);
        }
      },
    );

    return promise as Promise<Geocode[]>;
  }
}
