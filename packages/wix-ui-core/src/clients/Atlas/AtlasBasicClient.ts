import {
  CommonAddress,
  V2GetPlaceResponse,
  V2Prediction,
  WixAtlasServiceWeb,
} from '@wix/ambassador-wix-atlas-service-web/http'
import {
  Address,
} from './types';
import { BaseMapsClient } from '../GoogleMaps/types'

const ATLAS_WEB_BASE_URL = '/api/wix-atlas-service-web';
const BASE_LINGUIST_HEADER =
  '|en-us|false|4e8a573a-6b3e-426f-9d2f-5285b7dc90f8';
const { AutocompleteServiceV2, PlacesServiceV2 } = WixAtlasServiceWeb(ATLAS_WEB_BASE_URL);

const serializeResult = (results: Array<CommonAddress>) =>
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
          latitude: atlasResponse.geocode.latitude || 0,
          longitude: atlasResponse.geocode.longitude || 0,
        },
      }
      : {}),
  }))

const toSuggestions = (predictions: Array<V2Prediction>): Array<Address> =>
  predictions.map(prediction => ({
    place_id: prediction.searchId || '',
    description: prediction.description || '',
    types: []
  }));

export class AtlasBasicClient implements BaseMapsClient {
  private _predictWithHeaders;
  private _getPlaceWithHeaders;

  private _predict(request: any, lang: string, instance: string) {
    if (!this._predictWithHeaders) {
      this._predictWithHeaders = AutocompleteServiceV2()({
        'Authorization': instance,
        'x-wix-linguist': `${lang}${BASE_LINGUIST_HEADER}`,
      }).predict;
    }
    return this._predictWithHeaders(request)
  }

  private _getPlace(request: any, lang: string, instance: string) {
    if (!this._getPlaceWithHeaders) {
      this._getPlaceWithHeaders = PlacesServiceV2()({
        'Authorization': instance,
        'x-wix-linguist': `${lang}${BASE_LINGUIST_HEADER}`,
      }).getPlace;
    }

    return this._getPlaceWithHeaders(request)
  }

  async autocomplete(
    clientId: string,
    lang: string,
    request: any,
    instance: string
  ): Promise<Address[]> {

    const predictRequest = {
      input: typeof request === 'string' ? request: request.input,
      ...(request.componentRestrictions && request.componentRestrictions.country
        ? {
          countryCodes: [request.componentRestrictions.country],
        }
        : {}),

    }
    try {
      const predictResponse = await this._predict(predictRequest, lang, instance)
      if (predictResponse.predictions && predictResponse.predictions.length) {
        return toSuggestions(predictResponse.predictions || []);
      } else {
        return Promise.reject('ZERO_RESULTS');
      }
    }
    catch (e) {
      return Promise.reject(e)
    }
  }

  async geocode(
    clientId: string,
    lang: string,
    request: any,
    instance: string
  ) {
    const getPlaceRequest = {
      searchId: request.placeId
    }

    try {
      const result: V2GetPlaceResponse = await this._getPlace(getPlaceRequest, lang, instance);
      return serializeResult([result?.place?.address] || [{}]) as any;
    }
    catch (e) {
      return Promise.reject(e)
    }
  }
}
