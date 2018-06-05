import {IframesManager} from './IframesManager';
import {getIframes, getIframeWithLangAndApiKey, isIframeVisible} from '../IframeTestUtils';
let iframesManager: IframesManager;

class IframeManagerWithHTTPStub extends IframesManager {
  // Override the method that injects scripts into the iframe, because we
  // don't want to fetch HTTP resources over the network in the tests.
  populateIframe() {
    return;
  }
}

describe('IframesManager', () => {
  beforeEach(() => {
    iframesManager = new IframeManagerWithHTTPStub();
  });

  afterEach(() => {
    iframesManager.removeAllIframes();
  });

  it('should add invisible iframe to the DOM when trying to add an iframe with same key', () => {
    const apiKey = 'a';
    const lang = 'en';
    iframesManager.addIframe(apiKey, lang);
    iframesManager.addIframe(apiKey, lang);

    const iframe = getIframeWithLangAndApiKey(lang, apiKey);

    expect(getIframes().length).toEqual(1);
    expect(iframe).toBeDefined();
    expect(isIframeVisible(iframe)).toEqual(false);
  });

  it('should return an postMessageable object when calling adding of getting iframe', () => {
    const apiKey = 'a';
    const lang = 'en';
    let eventEmitter = iframesManager.addIframe(apiKey, lang);

    expect(eventEmitter.postMessage).toBeDefined();
    eventEmitter = iframesManager.getIframe(apiKey, lang);
    expect(eventEmitter.postMessage).toBeDefined();
  });

  it('should create 2 iframes on the dom as 2 requests are using 2 different apiKeys', () => {
    const firstApiKey = 'a';
    const secondApiKey = 'b';
    const lang = 'en';

    iframesManager.addIframe(firstApiKey, lang);
    iframesManager.addIframe(secondApiKey, lang);

    expect(getIframes().length).toEqual(2);
    expect(getIframeWithLangAndApiKey(lang, firstApiKey)).toBeDefined();
    expect(getIframeWithLangAndApiKey(lang, secondApiKey)).toBeDefined();
  });

  it('should create 2 iframes on the dom as 2 requests are using 2 different langs', () => {
    const apiKey = 'a';
    const firstLang = 'en';
    const secondLang = 'fr';

    iframesManager.addIframe(apiKey, firstLang);
    iframesManager.addIframe(apiKey, secondLang);

    expect(getIframes().length).toEqual(2);

    expect(getIframeWithLangAndApiKey(firstLang, apiKey)).toBeDefined();
    expect(getIframeWithLangAndApiKey(secondLang, apiKey)).toBeDefined();
  });

  it('should create 2 iframes on the DOM as 2 requests are using 2 different langs & apiKeys', () => {
    const firstApiKey = 'a';
    const secondApiKey = 'b';
    const firstLang = 'en';
    const secondLang = 'fr';

    iframesManager.addIframe(firstApiKey, firstLang);
    iframesManager.addIframe(secondApiKey, secondLang);

    expect(getIframes().length).toEqual(2);

    expect(getIframeWithLangAndApiKey(firstLang, firstApiKey)).toBeDefined();
    expect(getIframeWithLangAndApiKey(secondLang, secondApiKey)).toBeDefined();
  });
});
