import {googleRequestHandler} from './GoogleRequestHandler';
import {EventEmitterMock, GoogleMapsMock} from '../IframeTestUtils';
import * as handlerNames from '../handlersName';

let dummyGoogleMapsMock, mockRequestId, mockAutocompleteResult, eventEmitterMock, googleMock, postMessageMock,
  initRequestHandler,
  googleSpy, getPlacePredictionsSpy, geoCodeSpy, getDetailsSpy, mockGetDetailsResult, mockGeocodeResult;

describe('googleRequestHandler', async () => {
  beforeEach(() => {
    postMessageMock = jest.fn();
    dummyGoogleMapsMock = GoogleMapsMock();
    mockRequestId = 'a';
    mockAutocompleteResult = ['a'];
    mockGetDetailsResult = {
      geometry: {
        location: {
          lat: () => 53.46102819999999,
          lng: () => -2.2461541000000125
        }
      },
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png',
      id: '043fda0f408c31b200eaf6e161e4fe3adf51b25c'
    };
    mockGeocodeResult = [{
      geometry: {
        location: {
          lat: () => 39.902508,
          lng: () => -75.28446199999999
        },
        locationType: 'ROOFTOP',
        viewport: {
          northeast: {
            lat: () => 39.9038569802915,
            lng: () => -75.28311301970849
          },
          southwest: {
            lat: () => 39.9011590197085,
            lng: () => -75.2858109802915
          }
        }
      },
      placeId: 'ChIJnYWtvK_DxokRLIqoK6qTKDk'
    }];
    eventEmitterMock = new EventEmitterMock();
    googleMock = GoogleMapsMock(
      {
        getPlacePredictions: (request, callback) => {
          callback(mockAutocompleteResult, dummyGoogleMapsMock.maps.GeocoderStatus.OK);
        }
      },
      {
        geocode: (request, callback) => {
          callback(mockGeocodeResult, dummyGoogleMapsMock.maps.GeocoderStatus.OK);
        }
      },
      {
        getDetails: (request, callback) => {
          callback(mockGetDetailsResult, dummyGoogleMapsMock.maps.GeocoderStatus.OK);
        }
      }
    );
    geoCodeSpy = jest.fn();
    getDetailsSpy = jest.fn();
    getPlacePredictionsSpy = jest.fn();
    googleSpy = GoogleMapsMock(
      {
        getPlacePredictions: getPlacePredictionsSpy
      },
      {
        geocode: geoCodeSpy
      },
      {
        getDetails: getDetailsSpy
      }
    );
    initRequestHandler = googleRequestHandler(eventEmitterMock, handlerNames);
  });

  it('should call google getPlacePredictions', () => {
    initRequestHandler(googleSpy);
    eventEmitterMock.triggerMessage({
      data: {
        method: handlerNames.autocompleteHandlerName,
        requestId: mockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });

    expect(getPlacePredictionsSpy).toBeCalled();
  });

  it('should call google geocode', () => {
    initRequestHandler(googleSpy);
    eventEmitterMock.triggerMessage({
      data: {
        method: handlerNames.geocodeHandlerName,
        requestId: mockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });

    expect(geoCodeSpy).toBeCalled();
  });

  it('should call google getDetails', () => {
    initRequestHandler(googleSpy);
    eventEmitterMock.triggerMessage({
      data: {
        method: handlerNames.placeDetailsHandlerName,
        requestId: mockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });

    expect(getDetailsSpy).toBeCalled();
  });

  it('should return google response to our request once google has been initialized', () => {
    initRequestHandler(googleMock);
    eventEmitterMock.triggerMessage({
      data: {
        method: handlerNames.autocompleteHandlerName,
        requestId: mockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });
    expect(postMessageMock).toHaveBeenCalledWith(
      {
        results: mockAutocompleteResult,
        status: dummyGoogleMapsMock.maps.GeocoderStatus.OK,
        requestId: mockRequestId
      }, '*'
    );
  });

  it('should return google response to our getPlacesPredictions request when the request is posted before google initialization', () => {
    eventEmitterMock.triggerMessage({
      data: {
        method: handlerNames.autocompleteHandlerName,
        requestId: mockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });
    initRequestHandler(googleMock);
    expect(postMessageMock).toHaveBeenCalledWith(
      {
        results: mockAutocompleteResult,
        status: dummyGoogleMapsMock.maps.GeocoderStatus.OK,
        requestId: mockRequestId
      }, '*'
    );
  });

  it('should return google response to our geocode request when the request is posted before google initialization', () => {
    eventEmitterMock.triggerMessage({
      data: {
        method: handlerNames.geocodeHandlerName,
        requestId: mockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });
    initRequestHandler(googleMock);
    expect(postMessageMock).toHaveBeenCalledWith(
      {results: mockGeocodeResult, status: dummyGoogleMapsMock.maps.GeocoderStatus.OK, requestId: mockRequestId}, '*'
    );
  });

  it('should return google response to our getDetails request when the request is posted before google initialization', () => {
    eventEmitterMock.triggerMessage({
      data: {
        method: handlerNames.placeDetailsHandlerName,
        requestId: mockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });
    initRequestHandler(googleMock);
    expect(postMessageMock).toHaveBeenCalledWith(
      {results: mockGetDetailsResult, status: dummyGoogleMapsMock.maps.GeocoderStatus.OK, requestId: mockRequestId}, '*'
    );
  });

  it('should return google response to our requests when the request is posted before google initialization and there is more than 1 request', () => {
    const secondMockRequestId = mockRequestId + mockRequestId;
    eventEmitterMock.triggerMessage({
      data: {
        method: handlerNames.autocompleteHandlerName,
        requestId: mockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });

    eventEmitterMock.triggerMessage({
      data: {
        method: handlerNames.autocompleteHandlerName,
        requestId: secondMockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });
    initRequestHandler(googleMock);
    expect(postMessageMock).toHaveBeenCalledTimes(2);
    expect(postMessageMock).toHaveBeenCalledWith(
      {
        results: mockAutocompleteResult,
        status: dummyGoogleMapsMock.maps.GeocoderStatus.OK,
        requestId: mockRequestId
      }, '*'
    );
    expect(postMessageMock).toHaveBeenCalledWith(
      {
        results: mockAutocompleteResult,
        status: dummyGoogleMapsMock.maps.GeocoderStatus.OK,
        requestId: secondMockRequestId
      }, '*'
    );
  });

  it('should return google response to our diffrent requests when posted before google initialization', () => {
    const secondMockRequestId = mockRequestId + mockRequestId;
    eventEmitterMock.triggerMessage({
      data: {
        method: handlerNames.autocompleteHandlerName,
        requestId: mockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });

    eventEmitterMock.triggerMessage({
      data: {
        method: handlerNames.placeDetailsHandlerName,
        requestId: secondMockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });
    initRequestHandler(googleMock);
    expect(postMessageMock).toHaveBeenCalledTimes(2);
    expect(postMessageMock).toHaveBeenCalledWith(
      {
        results: mockAutocompleteResult,
        status: dummyGoogleMapsMock.maps.GeocoderStatus.OK,
        requestId: mockRequestId
      }, '*'
    );
    expect(postMessageMock).toHaveBeenCalledWith(
      {
        results: mockGetDetailsResult,
        status: dummyGoogleMapsMock.maps.GeocoderStatus.OK,
        requestId: secondMockRequestId
      }, '*'
    );
  });

  it('should return google response for our requests when one is called before initialization and the other after', () => {
    eventEmitterMock.triggerMessage({
      data: {
        method: handlerNames.autocompleteHandlerName,
        requestId: mockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });

    initRequestHandler(googleMock);
    expect(postMessageMock).toHaveBeenCalledTimes(1);
    expect(postMessageMock).toHaveBeenCalledWith(
      {
        results: mockAutocompleteResult,
        status: dummyGoogleMapsMock.maps.GeocoderStatus.OK,
        requestId: mockRequestId
      }, '*'
    );

    const secondMockRequestId = mockRequestId + mockRequestId;
    eventEmitterMock.triggerMessage({
      data: {
        method: handlerNames.autocompleteHandlerName,
        requestId: secondMockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });

    expect(postMessageMock).toHaveBeenCalledTimes(2);
    expect(postMessageMock).toHaveBeenCalledWith(
      {
        results: mockAutocompleteResult,
        status: dummyGoogleMapsMock.maps.GeocoderStatus.OK,
        requestId: secondMockRequestId
      }, '*'
    );
  });

  it('should wrap request with an object if needed', () => {
    const input = 'input';
    initRequestHandler(googleSpy);
    eventEmitterMock.triggerMessage({
      data: {
        method: handlerNames.autocompleteHandlerName,
        requestId: mockRequestId,
        request: input
      },
      source: {
        postMessage: postMessageMock
      }
    });

    expect(getPlacePredictionsSpy.mock.calls[0][0]).toEqual({input});
  });

  it('should not wrap request if it is already wrapped', () => {
    const input = 'input';
    initRequestHandler(googleSpy);

    eventEmitterMock.triggerMessage({
      data: {
        method: handlerNames.autocompleteHandlerName,
        requestId: mockRequestId,
        request: {input}
      },
      source: {
        postMessage: postMessageMock
      }
    });

    expect(getPlacePredictionsSpy.mock.calls[0][0]).toEqual({input});
  });

  it('should return a serializable response for geocode', () => {
    initRequestHandler(googleMock);
    eventEmitterMock.triggerMessage({
      data: {
        method: handlerNames.geocodeHandlerName,
        requestId: mockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });

    const args = postMessageMock.mock.calls[0][0];

    const serializedArgs = JSON.parse(JSON.stringify(args));
    expect(serializedArgs).toEqual(args);
  });

  it('should return a serializable response for placeDetails', () => {
    initRequestHandler(googleMock);
    eventEmitterMock.triggerMessage({
      data: {
        method: handlerNames.placeDetailsHandlerName,
        requestId: mockRequestId
      },
      source: {
        postMessage: postMessageMock
      }
    });

    const args = postMessageMock.mock.calls[0][0];

    const serializedArgs = JSON.parse(JSON.stringify(args));
    expect(serializedArgs).toEqual(args);
  });
});
