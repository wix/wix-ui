export const googleRequestHandler = (eventEmitter, handlersName) => {
  const context = {
    handleGoogleRequest,
    requestsQueue: [],
    googleInstance: undefined,
    _autocomplete: undefined,
    _placesServices: undefined,
    _geocoder: undefined
  };

  const handlerMap = {};
  handlerMap[handlersName.autocompleteHandlerName] = autocomplete;
  handlerMap[handlersName.geocodeHandlerName] = geocode;
  handlerMap[handlersName.placeDetailsHandlerName] = getDetails;

  function handleGoogleRequest(event) {
    if (!event.data.method) {
      throw 'no method was supplied';
    }
    const handler = handlerMap[event.data.method];
    handler(event);
  }

  const locationFuncOrValue = locationProp => {
    return typeof locationProp === 'function' ? locationProp() : locationProp;
  };

  const serializeResult = results => Object.assign(results, {
    geometry: {
      location: {
        lat: locationFuncOrValue(results.geometry.location.lat),
        lng: locationFuncOrValue(results.geometry.location.lng)
      }
    }
  });

  function autocomplete(event) {
    !context._autocomplete ? addToQueue(event) : handleAutocompleteRequest(event);
  }

  function geocode(event) {
    !context._geocoder ? addToQueue(event) : handleGeocodeRequest(event);
  }

  function getDetails(event) {
    !context._placesServices ? addToQueue(event) : handleGetDetailsRequest(event);
  }

  function addToQueue(event) {
    context.requestsQueue.unshift(event);
  }

  function handleAutocompleteRequest(event) {
    const request = typeof event.data.request === 'string' ? {input: event.data.request} : event.data.request;
    context._autocomplete.getPlacePredictions(request, (results, status) => {
      if ((status !== context.googleInstance.maps.GeocoderStatus.OK) && (status !== context.googleInstance.maps.GeocoderStatus.ZERO_RESULTS)) {
        event.source.postMessage({results, status: 'ERROR', requestId: event.data.requestId}, '*');
      } else {
        event.source.postMessage({results, status: 'OK', requestId: event.data.requestId}, '*');
      }
    });
  }

  function handleGeocodeRequest(event) {
    const request = typeof event.data.request === 'string' ? {address: event.data.request} : event.data.request;
    context._geocoder.geocode(request, (results, status) => {
      if ((status !== context.googleInstance.maps.GeocoderStatus.OK) && (status !== context.googleInstance.maps.GeocoderStatus.ZERO_RESULTS)) {
        event.source.postMessage({results, status: 'ERROR', requestId: event.data.requestId}, '*');
      } else {
        event.source.postMessage({
          results: results.map(element =>
            serializeResult(element)
          ),
          status: 'OK', requestId: event.data.requestId
        }, '*');
      }
    });
  }

  function handleGetDetailsRequest(event) {
    const request = typeof event.data.request === 'string' ? {placeId: event.data.request} : event.data.request;
    context._placesServices.getDetails(request, (results, status) => {
      if ((status !== context.googleInstance.maps.GeocoderStatus.OK) && (status !== context.googleInstance.maps.GeocoderStatus.ZERO_RESULTS)) {
        event.source.postMessage({results, status: 'ERROR', requestId: event.data.requestId}, '*');
      } else {
        results.photos = {};
        event.source.postMessage({
          results: serializeResult(results),
          status: 'OK', requestId: event.data.requestId
        }, '*');
      }
    });
  }

  const initRequestHandler = googleInstance => {
    context.googleInstance = googleInstance;

    context._autocomplete = new googleInstance.maps.places.AutocompleteService();
    context._geocoder = new googleInstance.maps.Geocoder();

    const map = new googleInstance.maps.Map(document.createElement('div'));
    context._placesServices = new googleInstance.maps.places.PlacesService(map);

    context.requestsQueue.forEach(request => handleGoogleRequest(request));
  };

  eventEmitter.addEventListener('message', context.handleGoogleRequest, false);

  return initRequestHandler;
};
