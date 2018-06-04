import {googleRequestHandler} from '../GoogleRequestHandler/GoogleRequestHandler';
import * as handlerNames from '../handlersName';

export class IframesManager {
    private _iframeMap: Map<string, HTMLIFrameElement> = new Map();

    private static getKey(apiKey: string, lang: string) {
        return `${apiKey}-${lang}`;
    }

    addIframe(apiKey: string, lang: string) {
        if (this.hasIframe(apiKey, lang)) {
            return this.getIframe(apiKey, lang);
        }

        const iframeKey = IframesManager.getKey(apiKey, lang);
        const iframe = document.createElement('iframe');
        iframe.setAttribute('data-lang', lang);
        iframe.setAttribute('data-api-key', apiKey);
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        this.populateIframe(iframe, apiKey, lang);
        this._iframeMap.set(iframeKey, iframe);
        return iframe.contentWindow;
    }

    getIframe(apiKey: string, lang: string) {
        const iframeKey = IframesManager.getKey(apiKey, lang);
        return this._iframeMap.get(iframeKey).contentWindow;
    }

    hasIframe(apiKey: string, lang: string) {
        const iframeKey = IframesManager.getKey(apiKey, lang);
        return this._iframeMap.has(iframeKey);
    }

    removeAllIframes() {
        this._iframeMap.forEach(iframe => iframe.remove());
        this._iframeMap.clear();
    }

    populateIframe(iframe: HTMLIFrameElement, apiKey: string, lang: string): void {
        const iframeBody = iframe.contentWindow.document.body;
        iframeBody.appendChild(this.createInitializationScript());
        iframeBody.appendChild(this.createGoogleMapsScript(apiKey, lang));
    }

    private createInitializationScript() {
        const script = document.createElement('script');
        script.innerText = 'window.initAutoComplete = (' + googleRequestHandler.toString() + ')(window, ' + JSON.stringify(handlerNames) + '); window.googleReady = () => window.initAutoComplete(window.google);';
        return script;
    }

    private createGoogleMapsScript(apiKey, lang) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${apiKey}&language=${lang}&callback=googleReady`;
        return script;
    }
}
