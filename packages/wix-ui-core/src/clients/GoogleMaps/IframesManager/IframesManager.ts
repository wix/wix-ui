import {googleRequestHandler} from '../GoogleRequestHandler/GoogleRequestHandler';
import * as handlerNames from '../handlersName';

export class IframesManager {
    _iframeMap = new Map();

    static getKey(apiKey, lang) {
        return `${apiKey}-${lang}`;
    }

    addIframe(apiKey, lang) {
        if (this.hasIframe(apiKey, lang)) {
            return this.getIframe(apiKey, lang);
        }

        const iframeKey = IframesManager.getKey(apiKey, lang);
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';

        const scriptElement = document.createElement('script');
        scriptElement.type = 'text/javascript';
        scriptElement.innerText = 'window.initAutoComplete = (' + googleRequestHandler.toString() + ')(window, ' + JSON.stringify(handlerNames) + '); window.googleReady = () => window.initAutoComplete(window.google);';

        iframe.onload = () => {
            iframe.contentWindow.document.body.appendChild(scriptElement);
            const googleScript = document.createElement('script');
            googleScript.type = 'text/javascript';
            googleScript.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${apiKey}&language=${lang}&callback=googleReady`;

            iframe.contentWindow.document.body.appendChild(googleScript);
        };

        document.body.appendChild(iframe);
        this._iframeMap.set(iframeKey, iframe);
        return iframe.contentWindow;
    }

    getIframe(apiKey, lang) {
        const iframeKey = IframesManager.getKey(apiKey, lang);
        return this._iframeMap.get(iframeKey).contentWindow;
    }

    hasIframe(apiKey, lang) {
        const iframeKey = IframesManager.getKey(apiKey, lang);
        return this._iframeMap.has(iframeKey);
    }
}
