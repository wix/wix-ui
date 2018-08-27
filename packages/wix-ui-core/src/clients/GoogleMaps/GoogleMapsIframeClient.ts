import {IframesManager} from './IframesManager/IframesManager';
import {autocompleteHandlerName, geocodeHandlerName, placeDetailsHandlerName} from './handlersName';
import {generateID} from './utils';
import {MapsClient} from './types';

export class GoogleMapsIframeClient implements MapsClient {
  _iframesManager = new IframesManager();
  _promisesMap = new Map();
  _useClientId = false;

  constructor() {
    window.addEventListener('message', this.handleMessage, false);
  }

  handleMessage = (event: MessageEvent) => {
    const {data} = event;
    if (data.requestId && this._promisesMap.has(data.requestId)) {
      const promise = this._promisesMap.get(data.requestId);
      data.status === 'OK' ? promise.resolve(data.results) : promise.reject();
    }
  }

  useClientId() {
    this._useClientId = true;
  }

  getOrAddIframe(key: string, lang: string) {
      if (this._iframesManager.hasIframe(key, lang)) {
          return this._iframesManager.getIframe(key, lang);
      } else if (this._useClientId) {
          return this._iframesManager.addIframe({lang, clientId: key});
      } else {
          return this._iframesManager.addIframe({lang, apiKey: key});
      }
  }

  autocomplete(key: string, lang: string, request: string) {
    const requestIframe = this.getOrAddIframe(key, lang);

    const requestId = generateID();
    const requestPromise = new Promise<object[] | any>((resolve, reject) => {
      this._promisesMap.set(requestId, {requestPromise, resolve, reject});
    });

    requestIframe.postMessage({request, requestId, method: autocompleteHandlerName}, '*');
    return requestPromise;
  }

  geocode(key: string, lang: string, request: string) {
    const requestIframe = this.getOrAddIframe(key, lang);

    const requestId = generateID();
    const requestPromise = new Promise<object[] | any>((resolve, reject) => {
      this._promisesMap.set(requestId, {requestPromise, resolve, reject});
    });

    requestIframe.postMessage({request, requestId, method: geocodeHandlerName}, '*');
    return requestPromise;
  }

  placeDetails(key: string, lang: string, request: string) {
    const requestIframe = this.getOrAddIframe(key, lang);

    const requestId = generateID();
    const requestPromise = new Promise<object[] | any>((resolve, reject) => {
      this._promisesMap.set(requestId, {requestPromise, resolve, reject});
    });
    requestIframe.postMessage({request, requestId, method: placeDetailsHandlerName}, '*');
    return requestPromise;
  }
}
