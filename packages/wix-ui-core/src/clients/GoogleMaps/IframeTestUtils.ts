const LANGUAGE_PARAM_NAME = 'language';
const API_KEY_PARAM_NAME = 'key';

export const getIframes = () => document.querySelectorAll('iframe');

export const getIframeWithLangAndApiKey = (lang, apiKey): HTMLIFrameElement | null =>
    document.querySelector(`iframe[data-lang=${lang}][data-api-key=${apiKey}]`);

export const isIframeVisible = iframe => iframe.style.display !== 'none';

export const triggerIframeInitAutocomplete = (mockedGoogleInstance, lang, apiKey) => {
    const iframe = getIframeWithLangAndApiKey(lang, apiKey);
    const iframeWindow = iframe.contentWindow;
    (<any>iframeWindow).initAutocomplete(mockedGoogleInstance);
};

export const GoogleMapsMock = (autocompleteInstance?, geocoderInstance?, placesServiceInstance?) => {
    return {
        maps: {
            Map: () => {
                return {};
            },
            places: {
                AutocompleteService: () => autocompleteInstance,
                PlacesService: () => placesServiceInstance,
                PlacesServiceStatus: {
                    OK: 'OK',
                    ZERO_RESULTS: 'ZERO_RESULTS'
                },
                AutocompleteServiceStatus: {
                    OK: 'OK',
                    ERROR: 'ERROR',
                    ZERO_RESULTS: 'ZERO_RESULTS'
                }
            },
            Geocoder: () => geocoderInstance,
            GeocoderStatus: {
                OK: 'OK',
                ZERO_RESULTS: 'ZERO_RESULTS'
            }
        }
    };
};

export class EventEmitterMock {
    eventListeners = [];

    addEventListener(eventName, callback) {
        this.eventListeners.push(callback);
    }

    triggerMessage(event) {
        this.eventListeners.forEach(callback => callback(event));
    }
}

export function IframesManagerMock () {
    return;
}

IframesManagerMock.prototype = {
    addIframe: jest.fn(),
    getIframe: jest.fn(),
    hasIframe: jest.fn(),
    removeAllIframes: jest.fn(),
};
