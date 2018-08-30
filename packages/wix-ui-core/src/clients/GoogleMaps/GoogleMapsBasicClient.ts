import {Omit} from 'type-zoo';
import {Address, Geocode, MapsClient} from './types';

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

const serializeResult = results =>
  Object.assign(results, {
    geometry: {
      location: {
        lat: locationFuncOrValue(results.geometry.location.lat),
        lng: locationFuncOrValue(results.geometry.location.lng),
      },
    },
  });

// placeDetails is not required at the moment
export class GoogleMapsBasicClient implements Omit<MapsClient, 'placeDetails'> {
  _autocomplete;
  _geocoder;
  _loadScriptPromise;

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
    script.src = `//maps.googleapis.com/maps/api/js?libraries=places&client=${clientId}&callback=initMap&language=${lang}`;
    document.body.appendChild(script);

    this._loadScriptPromise = promise;

    return promise;
  }

  useClientId() {
    return null;
  }

  async autocomplete(clientId: string, lang: string, request: any): Promise<Array<Address>> {
    const { promise, resolve, reject } = defer();

    await this.loadScript(clientId, lang);
    this._autocomplete.getPlacePredictions(
      typeof request === 'string' ? { input: request } : request,
      (results, status) => {
        if (status === 'OK') {
          resolve(results);
        } else {
          reject('ERROR');
        }
      },
    );

    return (promise as Promise<Array<Address>>);
  }

  async geocode(clientId: string, lang: string, request: any): Promise<Array<Geocode>> {
    const { promise, resolve, reject } = defer();

    await this.loadScript(clientId, lang);
    this._geocoder.geocode(
      typeof request === 'string' ? { address: request } : request,
      (results, status) => {
        if (status === 'OK') {
          resolve(results.map(result => serializeResult(result)));
        } else {
          reject('ERROR');
        }
      },
    );

    return (promise as Promise<Array<Geocode>>);
  }
}
