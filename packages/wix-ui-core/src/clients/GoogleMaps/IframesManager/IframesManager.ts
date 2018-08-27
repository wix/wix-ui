import {googleRequestHandler} from '../GoogleRequestHandler/GoogleRequestHandler';
import * as handlerNames from '../handlersName';
import {string} from "prop-types";

export class IframesManager {
    private _iframeMap: Map<string, HTMLIFrameElement> = new Map();

    private static getKey(apiKey: string, lang: string) {
        return `${apiKey}-${lang}`;
    }

    addIframe({apiKey, lang, clientId}: {apiKey?: string, lang: string, clientId?: string}) {
        if (this.hasIframe(apiKey, lang)) {
            return this.getIframe(apiKey, lang);
        }

        const iframeKey = IframesManager.getKey(apiKey, lang);
        const iframe = document.createElement('iframe');
        iframe.setAttribute('data-lang', lang);
        iframe.setAttribute('data-api-key', clientId || apiKey);
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        this.populateIframe(iframe, apiKey, lang, clientId);
        this._iframeMap.set(iframeKey, iframe);
        return iframe.contentWindow;
    }

    getIframe(key: string, lang: string) {
        const iframeKey = IframesManager.getKey(key, lang);
        return this._iframeMap.get(iframeKey).contentWindow;
    }

    hasIframe(key: string, lang: string) {
        const iframeKey = IframesManager.getKey(key, lang);
        return this._iframeMap.has(iframeKey);
    }

    removeAllIframes() {
        this._iframeMap.forEach(iframe => iframe.remove());
        this._iframeMap.clear();
    }

    populateIframe(iframe: HTMLIFrameElement, apiKey: string, lang: string, clientId: string): void {
        const iframeBody = iframe.contentWindow.document.body;
        iframeBody.appendChild(this.createInitializationScript());
        iframeBody.appendChild(this.createGoogleMapsScript(apiKey, lang, clientId));
    }

    private createInitializationScript() {
        const script = document.createElement('script');
        script.innerText = 'window.initAutoComplete = (' + googleRequestHandler.toString() + ')(window, ' + JSON.stringify(handlerNames) + '); window.googleReady = () => window.initAutoComplete(window.google);';
        return script;
    }

    private createGoogleMapsScript(apiKey, lang, clientId) {
        const script = document.createElement('script');
        script.src = IframesManager.generateUrl({apiKey, lang, clientId});
        return script;
    }

    static generateUrl({apiKey, clientId, lang}: {apiKey?:string, clientId?:string, lang}):string {
        if (clientId) {
            return `https://maps.googleapis.com/maps/api/js?libraries=places&client=${clientId}&language=${lang}&callback=googleReady`;
        } else {
            return `https://maps.googleapis.com/maps/api/js?libraries=places&key=${apiKey}&language=${lang}&callback=googleReady`;
        }
    }
}
