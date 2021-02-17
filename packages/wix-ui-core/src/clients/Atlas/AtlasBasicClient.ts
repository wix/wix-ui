import {
  CommonAddress,
  V2GetPlaceResponse,
  V2Prediction,
  WixAtlasServiceWeb,
} from '@wix/ambassador-wix-atlas-service-web/http';
import {
  ClientAutocompleteRequest,
  ClientGeocodeRequest,
  Suggestion,
} from './types';
import { AtlasMapsClient, InternalAddress } from '../GoogleMaps/types';

let WixAtlasService = WixAtlasServiceWeb;

export const mockWixAtlasService = (atlasMock: any): void => {
  WixAtlasService = atlasMock
}

export const ATLAS_WEB_BASE_URL = '/_api/wix-atlas-service-web';
const BASE_LINGUIST_HEADER = '|en-us|false|';

const serializeGeocodeResult = (results: CommonAddress[]): InternalAddress[] =>
  results.map(atlasResponse => ({
    formatted: atlasResponse.formattedAddress,
    streetAddress: atlasResponse.streetAddress,
    subdivision: atlasResponse.subdivision,
    city: atlasResponse.city,
    country: atlasResponse.country,
    postalCode: atlasResponse.postalCode,
    ...(atlasResponse.geocode
      ? {
          location: {
            latitude: atlasResponse.geocode.latitude,
            longitude: atlasResponse.geocode.longitude,
          },
        }
      : {}),
  }));

const toSuggestions = (predictions: V2Prediction[]): Suggestion[] =>
  predictions.map(prediction => ({
    place_id: prediction.searchId || '',
    description: prediction.description || '',
    types: [],
  }));

export class AtlasBasicClient implements AtlasMapsClient {
  name;
  private readonly _predict;
  private readonly _getPlace;

  constructor({ lang, instance, externalBaseUrl }: { lang: string, instance: string, externalBaseUrl?: string }) {
    const baseUrl = externalBaseUrl ? `${externalBaseUrl}${ATLAS_WEB_BASE_URL}` : ATLAS_WEB_BASE_URL
    const { AutocompleteServiceV2, PlacesServiceV2 } = WixAtlasService(
      baseUrl,
    );

    this.name = 'atlas';

    this._predict = AutocompleteServiceV2()({
      Authorization: instance,
      'x-wix-linguist': `${lang}${BASE_LINGUIST_HEADER}${instance}`,
    }).predict;

    this._getPlace = PlacesServiceV2()({
      Authorization: instance,
      'x-wix-linguist': `${lang}${BASE_LINGUIST_HEADER}${instance}`,
    }).getPlace;
  }

  async autocomplete(
    clientId: string,
    lang: string,
    request: ClientAutocompleteRequest,
  ): Promise<Suggestion[]> {
    const predictRequest = {
      input: typeof request === 'string' ? request : request.input,
      ...(typeof request !== 'string' &&
      request.componentRestrictions &&
      request.componentRestrictions.country
        ? {
            countryCodes: [request.componentRestrictions.country],
          }
        : {}),
    };
    const predictResponse = await this._predict(predictRequest);
    if (predictResponse.predictions && predictResponse.predictions.length) {
      return toSuggestions(predictResponse.predictions);
    }
    return Promise.reject('ZERO_RESULTS');
  }

  async geocode(clientId: string, lang: string, request: ClientGeocodeRequest) {
    const getPlaceRequest = {
      searchId: request.placeId,
    };

    const result: V2GetPlaceResponse = await this._getPlace(getPlaceRequest);
    if (result?.place?.address) {
      return serializeGeocodeResult([result.place.address]);
    }
    return Promise.reject('Place Not Found');
  }
}
