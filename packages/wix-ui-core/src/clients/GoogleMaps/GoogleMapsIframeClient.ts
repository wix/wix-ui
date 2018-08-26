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

  autocomplete(key: string, lang: string, request: string) {
    let requestIframe;
    if (this._iframesManager.hasIframe(key, lang)) {
      requestIframe = this._iframesManager.getIframe(key, lang);
    } else if (this._useClientId) {
        requestIframe = this._iframesManager.addIframe(null, lang, key);
    } else {
        requestIframe = this._iframesManager.addIframe(key, lang);
    }

    const requestId = generateID();
    const requestPromise = new Promise<object[] | any>((resolve, reject) => {
      this._promisesMap.set(requestId, {requestPromise, resolve, reject});
    });

    requestIframe.postMessage({request, requestId, method: autocompleteHandlerName}, '*');
    return requestPromise;
  }

  geocode(apiKey: string, lang: string, request: string) {
    let requestIframe;
    if (this._iframesManager.hasIframe(apiKey, lang)) {
      requestIframe = this._iframesManager.getIframe(apiKey, lang);
    } else {
      requestIframe = this._iframesManager.addIframe(apiKey, lang);
    }

    const requestId = generateID();
    const requestPromise = new Promise<object[] | any>((resolve, reject) => {
      this._promisesMap.set(requestId, {requestPromise, resolve, reject});
    });

    requestIframe.postMessage({request, requestId, method: geocodeHandlerName}, '*');
    return requestPromise;
  }

  placeDetails(apiKey: string, lang: string, request: string) {
    let requestIframe;
    if (this._iframesManager.hasIframe(apiKey, lang)) {
      requestIframe = this._iframesManager.getIframe(apiKey, lang);
    } else {
      requestIframe = this._iframesManager.addIframe(apiKey, lang);
    }

    const requestId = generateID();
    const requestPromise = new Promise<object[] | any>((resolve, reject) => {
      this._promisesMap.set(requestId, {requestPromise, resolve, reject});
    });
    requestIframe.postMessage({request, requestId, method: placeDetailsHandlerName}, '*');
    return requestPromise;
  }
}
