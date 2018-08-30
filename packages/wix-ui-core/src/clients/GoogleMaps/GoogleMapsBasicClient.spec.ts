import { GoogleMapsBasicClient } from './GoogleMapsBasicClient';
import * as flushPromises from 'flush-promises';

const LANG = 'en';
const CLIENT_ID = 'client-id';
const EXPECTED_URL = `//maps.googleapis.com/maps/api/js?libraries=places&client=${CLIENT_ID}&callback=initMap&language=${LANG}`;

describe('GoogleMapsBasicClient', () => {
  const appendChildSpy = jest
    .spyOn(document.body, 'appendChild')
    .mockImplementation(() => null);

  let status = 'OK';

  const getStatus = () => status;
  const setStatus = newStatus => (status = newStatus);

  const setUpGoogleMapsMock = () => {
    const getPlacePredictions = jest.fn((request, callback) => {
      const result = 'result ' + request.input;
      setTimeout(() => callback(result, getStatus()), 10);
    });
    const geocode = jest.fn((request, callback) => {
      const result = [
        {
          geometry: {
            location: {
              lat: () => 1,
              lng: () => 2,
            },
          },
        },
      ];
      setTimeout(() => callback(result, getStatus()), 10);
    });
    (window as any).google = {
      maps: {
        places: {
          AutocompleteService: jest.fn(() => ({ getPlacePredictions })),
        },
        Geocoder: jest.fn(() => ({ geocode })),
      },
    };
    return { mock: (window as any).google, getPlacePredictions, geocode };
  };

  afterEach(() => {
    appendChildSpy.mockClear();
    delete (window as any).google;
    delete (window as any).initMap;
    setStatus('OK');
  });

  afterAll(() => {
    (appendChildSpy as any).mockRestore();
  });

  describe('Initialization', () => {
    it('should append google maps api script tag', () => {
      const client = new GoogleMapsBasicClient();
      client.loadScript(CLIENT_ID, LANG);

      const firstCall = appendChildSpy.mock.calls[0][0];
      expect(firstCall.src.indexOf(EXPECTED_URL)).not.toBe(-1);
    });

    it('should not append google maps api script tag in cased it is already loaded', () => {
      const client = new GoogleMapsBasicClient();
      setUpGoogleMapsMock();
      client.loadScript(CLIENT_ID, LANG);
      expect(appendChildSpy).not.toHaveBeenCalled();
    });

    it('should create a global callback function for google maps init', () => {
      const client = new GoogleMapsBasicClient();
      expect((window as any).initMap).not.toBeDefined();
      client.loadScript(CLIENT_ID, LANG);
      expect((window as any).initMap).toBeDefined();
    });

    it('should wait until script is fully loaded to initiate the client', async () => {
      const client = new GoogleMapsBasicClient();
      client.autocomplete(CLIENT_ID, LANG, 'tel aviv');

      const { mock } = setUpGoogleMapsMock();
      expect(mock.maps.places.AutocompleteService).not.toHaveBeenCalled();
      expect(mock.maps.Geocoder).not.toHaveBeenCalled();
      (window as any).initMap();
      expect(mock.maps.places.AutocompleteService).toHaveBeenCalled();
      expect(mock.maps.Geocoder).toHaveBeenCalled();
    });

    it('should instantiate inner objects if google maps api is already loaded (only once)', () => {
      const client = new GoogleMapsBasicClient();
      const { mock } = setUpGoogleMapsMock();

      client.autocomplete(CLIENT_ID, LANG, 'tel aviv');
      expect(mock.maps.places.AutocompleteService).toHaveBeenCalled();
      expect(mock.maps.Geocoder).toHaveBeenCalled();

      client.autocomplete(CLIENT_ID, LANG, 'tel aviv');
      expect(mock.maps.places.AutocompleteService).toHaveBeenCalledTimes(1);
      expect(mock.maps.Geocoder).toHaveBeenCalledTimes(1);
    });

    it('should append script tag only once', () => {
      const client = new GoogleMapsBasicClient();
      client.autocomplete(CLIENT_ID, LANG, 'tel aviv');
      client.autocomplete(CLIENT_ID, LANG, 'tel aviv yafo');
      expect(appendChildSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Functionality', () => {
    describe('autocomplete', () => {
      it('should call getPlacePredictions and return a promise', async () => {
        const client = new GoogleMapsBasicClient();
        const result = client.autocomplete(CLIENT_ID, LANG, 'tel aviv');
        const { getPlacePredictions } = setUpGoogleMapsMock();
        (window as any).initMap();
        await flushPromises();
        expect(getPlacePredictions).toHaveBeenCalledWith(
          { input: 'tel aviv' },
          expect.anything(),
        );
        expect(await result).toBe('result tel aviv');
      });

      it('should handle an object as the request as well', async () => {
        const client = new GoogleMapsBasicClient();
        const result = client.autocomplete(CLIENT_ID, LANG, {
          input: 'tel aviv',
        });
        const { getPlacePredictions } = setUpGoogleMapsMock();
        (window as any).initMap();
        await flushPromises();
        expect(getPlacePredictions).toHaveBeenCalledWith(
          { input: 'tel aviv' },
          expect.anything(),
        );
        expect(await result).toBe('result tel aviv');
      });

      it('Should throw an error if status is not OK', async () => {
        setStatus('NOT_OK');
        const client = new GoogleMapsBasicClient();
        const result = client.autocomplete(CLIENT_ID, LANG, 'tel aviv');
        const { getPlacePredictions } = setUpGoogleMapsMock();
        (window as any).initMap();
        await flushPromises();
        expect(getPlacePredictions).toHaveBeenCalledWith(
          { input: 'tel aviv' },
          expect.anything(),
        );
        return expect(result).rejects.toEqual('ERROR');
      });
    });

    describe('geocode', () => {
      it('should call geocode and return a promise', async () => {
        const client = new GoogleMapsBasicClient();
        const result = client.geocode(CLIENT_ID, LANG, 'tel aviv');
        const { geocode } = setUpGoogleMapsMock();
        (window as any).initMap();
        await flushPromises();
        expect(geocode).toHaveBeenCalledWith(
          { address: 'tel aviv' },
          expect.anything(),
        );
        expect(await result).toEqual([
          { geometry: { location: { lat: 1, lng: 2 } } },
        ]);
      });

      it('should handle an object as the request as well', async () => {
        const client = new GoogleMapsBasicClient();
        const result = client.geocode(CLIENT_ID, LANG, { address: 'tel aviv' });
        const { geocode } = setUpGoogleMapsMock();
        (window as any).initMap();
        await flushPromises();
        expect(geocode).toHaveBeenCalledWith(
          { address: 'tel aviv' },
          expect.anything(),
        );
        expect(await result).toEqual([
          { geometry: { location: { lat: 1, lng: 2 } } },
        ]);
      });

      it('Should throw an error if status is not OK 1', async () => {
        setStatus('NOT_OK');
        const client = new GoogleMapsBasicClient();
        const result = client.geocode(CLIENT_ID, LANG, 'tel aviv');
        const { geocode } = setUpGoogleMapsMock();
        (window as any).initMap();
        await flushPromises();
        expect(geocode).toHaveBeenCalledWith(
          { address: 'tel aviv' },
          expect.anything(),
        );
        return expect(result).rejects.toBe('ERROR');
      });
    });
  });
});
