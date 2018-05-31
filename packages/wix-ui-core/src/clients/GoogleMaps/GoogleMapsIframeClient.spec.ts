import {GoogleMapsIframeClient as RealGoogleMapsIframeClient} from './GoogleMapsIframeClient';
import {autocompleteHandlerName, geocodeHandlerName, placeDetailsHandlerName} from './handlersName';
import {IframesManagerMock} from './IframeTestUtils';

class GoogleMapsIframeClient extends RealGoogleMapsIframeClient {
  constructor() {
    super();
    this._iframesManager = new IframesManagerMock();
  }
}

const iframeManagerPrototype = IframesManagerMock.prototype;

describe('GoogleMapsIframeClient', () => {
  let client;
  const mockApiKey = 'a';
  const mockLang = 'en';

  it('should return a resolved promise once the status sent by iframesManager is OK', async () => {
    iframeManagerPrototype.hasIframe.mockImplementationOnce(() => true);
    iframeManagerPrototype.getIframe.mockImplementationOnce(() => ({
      postMessage: requestObj => {
        const targetOrigin = '*';
        const {requestId} = requestObj;
        (<any>global).postMessage({requestId, results: [], status: 'OK'}, targetOrigin);
      }
    }));

    client = new GoogleMapsIframeClient();
    await expect(client.autocomplete(mockApiKey, mockLang)).resolves.toEqual([]);
    expect(iframeManagerPrototype.getIframe).toBeCalled();
  });

  it('should add an iframe once if 2 request with different google methods are using same apiKey and language', () => {
    const postMessageMock = jest.fn();

    iframeManagerPrototype.hasIframe.mockImplementationOnce(() => false);
    iframeManagerPrototype.addIframe.mockImplementationOnce(() => ({
      postMessage: postMessageMock
    }));

    client = new GoogleMapsIframeClient();

    client.autocomplete(mockApiKey, mockLang);

    iframeManagerPrototype.hasIframe.mockImplementationOnce(() => true);
    iframeManagerPrototype.getIframe.mockImplementation(() => ({
      postMessage: postMessageMock
    }));

    client.geocode(mockApiKey, mockLang);

    expect(iframeManagerPrototype.addIframe).toHaveBeenCalledTimes(1);
  });

  it('should call postMessage with method name geocode when geocode is called', () => {
    const postMessageMock = jest.fn();

    iframeManagerPrototype.hasIframe.mockImplementationOnce(() => false);
    iframeManagerPrototype.addIframe.mockImplementationOnce(() => ({
      postMessage: postMessageMock
    }));

    client = new GoogleMapsIframeClient();
    client.geocode(mockApiKey, mockLang);

    const args = postMessageMock.mock.calls[0];
    const requestArgs = args[0];

    expect(requestArgs.method).toEqual(geocodeHandlerName);
  });

  it('should call postMessage with method name autocomplete when autocomplete is called', () => {
    const postMessageMock = jest.fn();

    iframeManagerPrototype.hasIframe.mockImplementationOnce(() => false);
    iframeManagerPrototype.addIframe.mockImplementationOnce(() => ({
      postMessage: postMessageMock
    }));

    client = new GoogleMapsIframeClient();
    client.autocomplete(mockApiKey, mockLang);

    const args = postMessageMock.mock.calls[0];
    const requestArgs = args[0];

    expect(requestArgs.method).toEqual(autocompleteHandlerName);
  });

  it('should call postMessage with method name placeDetails when placeDetails is called', () => {
    const postMessageMock = jest.fn();

    iframeManagerPrototype.hasIframe.mockImplementationOnce(() => false);
    iframeManagerPrototype.addIframe.mockImplementationOnce(() => ({
      postMessage: postMessageMock
    }));

    client = new GoogleMapsIframeClient();
    client.placeDetails(mockApiKey, mockLang);

    const args = postMessageMock.mock.calls[0];
    const requestArgs = args[0];

    expect(requestArgs.method).toEqual(placeDetailsHandlerName);
  });

  it('should return a rejected promise once the status sent by iframesManager is ERROR', async () => {
    iframeManagerPrototype.hasIframe.mockImplementationOnce(() => true);
    iframeManagerPrototype.getIframe.mockImplementationOnce(() => ({
      postMessage: requestObj => {
        const targetOrigin = '*';
        const {requestId} = requestObj;
        (<any>global).postMessage({requestId, results: [], status: 'ERROR'}, targetOrigin);
      }
    }));

    client = new GoogleMapsIframeClient();
    await expect(client.autocomplete(mockApiKey, mockLang, '')).rejects.toBeUndefined();
    expect(iframeManagerPrototype.getIframe).toBeCalled();
  });

  it('should return results and trigger addIframe if the iframe does not exist', async () => {
    iframeManagerPrototype.hasIframe.mockImplementationOnce(() => false);
    iframeManagerPrototype.addIframe.mockImplementationOnce(() => ({
      postMessage: requestObj => {
        const targetOrigin = '*';
        const {requestId} = requestObj;
        (<any>global).postMessage({requestId, results: [], status: 'OK'}, targetOrigin);
      }
    }));

    client = new GoogleMapsIframeClient();
    await expect(client.autocomplete(mockApiKey, mockLang)).resolves.toEqual([]);
    expect(iframeManagerPrototype.addIframe).toBeCalled();
  });

  it('should return a rejected promise and trigger addIframe if the iframe does not exist', async () => {
    iframeManagerPrototype.hasIframe.mockImplementationOnce(() => false);
    iframeManagerPrototype.addIframe.mockImplementationOnce(() => ({
      postMessage: requestObj => {
        const targetOrigin = '*';
        const {requestId} = requestObj;
        (<any>global).postMessage({requestId, results: [], status: 'ERROR'}, targetOrigin);
      }
    }));

    client = new GoogleMapsIframeClient();
    await expect(client.autocomplete(mockApiKey, mockLang)).rejects.toBeUndefined();
    expect(iframeManagerPrototype.addIframe).toBeCalled();
  });

  it('should resolve 2 requests', async () => {
    const firstRequest = 'first';
    const secondRequest = 'second';

    iframeManagerPrototype.hasIframe.mockImplementation(() => true);
    iframeManagerPrototype.getIframe.mockImplementation(() => ({
      postMessage: requestObj => {
        const targetOrigin = '*';
        const {requestId, request} = requestObj;
        const timeout = request === firstRequest ? 20 : 10;
        setTimeout(() => (<any>global).postMessage({requestId, results: [request], status: 'OK'}, targetOrigin), timeout);
      }
    })
    );

    client = new GoogleMapsIframeClient();
    await expect(client.autocomplete(mockApiKey, mockLang, secondRequest)).resolves.toEqual([secondRequest]);
    await expect(client.autocomplete(mockApiKey, mockLang, firstRequest)).resolves.toEqual([firstRequest]);

    iframeManagerPrototype.hasIframe.mockRestore();
    iframeManagerPrototype.getIframe.mockRestore();
  });

  it('should reject first requests and resolve the second one', async () => {
    const firstRequest = 'first';
    const secondRequest = 'second';

    iframeManagerPrototype.hasIframe.mockImplementation(() => true);
    iframeManagerPrototype.getIframe.mockImplementation(() => ({
      postMessage: requestObj => {
        const targetOrigin = '*';
        const {requestId, request} = requestObj;
        const timeout = request === firstRequest ? 20 : 10;
        const status = request === firstRequest ? 'OK' : 'ERROR';
        setTimeout(() => (<any>global).postMessage({requestId, results: [request], status}, targetOrigin), timeout);
      }
    })
    );

    client = new GoogleMapsIframeClient();
    await expect(client.autocomplete(mockApiKey, mockLang, secondRequest)).rejects.toBeUndefined();
    await expect(client.autocomplete(mockApiKey, mockLang, firstRequest)).resolves.toEqual([firstRequest]);

    iframeManagerPrototype.hasIframe.mockRestore();
    iframeManagerPrototype.getIframe.mockRestore();
  });

  it('should reject first requests and resolve the second one', async () => {
    const firstRequest = 'first';
    const secondRequest = 'second';

    iframeManagerPrototype.hasIframe.mockImplementation(() => true);
    iframeManagerPrototype.getIframe.mockImplementation(() => ({
      postMessage: requestObj => {
        const targetOrigin = '*';
        const {requestId, request} = requestObj;
        const timeout = request === firstRequest ? 20 : 10;
        const status = request === firstRequest ? 'OK' : 'ERROR';
        setTimeout(() => (<any>global).postMessage({requestId, results: [request], status}, targetOrigin), timeout);
      }
    })
    );

    client = new GoogleMapsIframeClient();
    await expect(client.autocomplete(mockApiKey, mockLang, secondRequest)).rejects.toBeUndefined();
    await expect(client.autocomplete(mockApiKey, mockLang, firstRequest)).resolves.toEqual([firstRequest]);

    iframeManagerPrototype.hasIframe.mockRestore();
    iframeManagerPrototype.getIframe.mockRestore();
  });

  it('should call postMessage with request & origin parameters', () => {
    const postMessageMock = jest.fn();
    const address = '1 Broadway NYC';

    iframeManagerPrototype.hasIframe.mockImplementationOnce(() => true);
    iframeManagerPrototype.getIframe.mockImplementationOnce(() => ({
      postMessage: postMessageMock
    }));

    client = new GoogleMapsIframeClient();
    client.autocomplete(mockApiKey, mockLang, address);

    const args = postMessageMock.mock.calls[0];
    const requestArg = args[0];
    const targetOrigin = args[1];

    expect(requestArg.requestId).toBeDefined();
    expect(requestArg.request).toBe(address);
    expect(targetOrigin).toBe('*');
  });
});
