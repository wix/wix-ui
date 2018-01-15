import {IframesManager} from './IframesManager/IframesManager';
import {autocompleteHandlerName, geocodeHandlerName, placeDetailsHandlerName} from './handlersName';
import {generateID} from './utils';

export class GoogleMapsIframeClient {
  _iframesManager = new IframesManager();
  _promisesMap = new Map();

  constructor() {
    window.addEventListener('message', this.handleMessage, false);
  }

  handleMessage = event => {
    const {data} = event;
    if (data.requestId && this._promisesMap.has(data.requestId)) {
      const promise = this._promisesMap.get(data.requestId);
      data.status === 'OK' ? promise.resolve(data.results) : promise.reject();
    }
  }

  autocomplete(apiKey, lang, request) {
    let requestIframe;
    if (this._iframesManager.hasIframe(apiKey, lang)) {
      requestIframe = this._iframesManager.getIframe(apiKey, lang);
    } else {
      requestIframe = this._iframesManager.addIframe(apiKey, lang);
    }

    const requestId = generateID();
    const requestPromise = new Promise((resolve, reject) => {
      this._promisesMap.set(requestId, {requestPromise, resolve, reject});
    });

    requestIframe.postMessage({request, requestId, method: autocompleteHandlerName}, '*');
    return requestPromise;
  }

  geocode(apiKey, lang, request) {
    let requestIframe;
    if (this._iframesManager.hasIframe(apiKey, lang)) {
      requestIframe = this._iframesManager.getIframe(apiKey, lang);
    } else {
      requestIframe = this._iframesManager.addIframe(apiKey, lang);
    }

    const requestId = generateID();
    const requestPromise = new Promise((resolve, reject) => {
      this._promisesMap.set(requestId, {requestPromise, resolve, reject});
    });

    requestIframe.postMessage({request, requestId, method: geocodeHandlerName}, '*');
    return requestPromise;
  }

  placeDetails(apiKey, lang, request) {
    let requestIframe;
    if (this._iframesManager.hasIframe(apiKey, lang)) {
      requestIframe = this._iframesManager.getIframe(apiKey, lang);
    } else {
      requestIframe = this._iframesManager.addIframe(apiKey, lang);
    }

    const requestId = generateID();
    const requestPromise = new Promise((resolve, reject) => {
      this._promisesMap.set(requestId, {requestPromise, resolve, reject});
    });
    requestIframe.postMessage({request, requestId, method: placeDetailsHandlerName}, '*');
    return requestPromise;
  }
}
