import {
  CommonAddress,
  V2GetPlaceResponse,
  V2Prediction,
  WixAtlasServiceWeb,
} from '@wix/ambassador-wix-atlas-service-web/http'
import {
  Address,
  // MapsClient,
} from './types';

const ATLAS_WEB_BASE_URL = '/api/wix-atlas-service-web';
const BASE_LINGUIST_HEADER =
  '|en-us|false|4e8a573a-6b3e-426f-9d2f-5285b7dc90f8';
const { AutocompleteServiceV2, PlacesServiceV2 } = WixAtlasServiceWeb(ATLAS_WEB_BASE_URL);

const serializeResult = (results: Array<CommonAddress>) =>
  results.map(atlasResponse => ({
    formatted_address: atlasResponse.formattedAddress,
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

// export class AtlasBasicClient implements MapsClient {
export class AtlasBasicClient {
  private _predict;
  private _getPlace;

  _initServices(lang) {
    if (!this._predict) {
      this._predict= AutocompleteServiceV2()({
        'x-wix-linguist': `${lang}${BASE_LINGUIST_HEADER}`,
      }).predict;
    }

    if (!this._getPlace) {
      this._getPlace= PlacesServiceV2()({
        'x-wix-linguist': `${lang}${BASE_LINGUIST_HEADER}`,
      }).getPlace;
    }
  }

  async autocomplete(
    clientId: string,
    lang: string,
    request: any,
  ): Promise<Address[]> {
    const predictRequest = {
      input: request.input,
      ...(request.componentRestrictions && request.componentRestrictions.country
        ? {
          country_codes: [request.componentRestrictions.country],
        }
        : {}),

    }
    this._initServices(lang);
    try {
      const predictResponse = await this._predict(predictRequest)
      if (predictResponse.predictions && predictResponse.predictions.length) {
        // setAutoCompleteError(false);
        // return toSuggestions(predictResponse.predictions || []);
        const toSugg = toSuggestions(predictResponse.predictions || []);
        return toSugg
      } else {
        return Promise.reject('ZERO_RESULTS');
        //TODO: ....? How is it done in bolt?
        // return [];
        // onAutoCompleteError(translationKeys.noResults);
      }
    }
    catch (e) {
      return Promise.reject(e)
    }
  }

  useClientId() {}
  placeDetails() { return Promise.resolve({} as any)}

  async geocode(
    clientId: string,
    lang: string,
    request: any,
    //TODO: Why array?????
  ) {
    this._initServices(lang);
    const getPlaceRequest = {
      searchId: request.placeId
    }
    try {
      const result: V2GetPlaceResponse = await this._getPlace(getPlaceRequest);
      return serializeResult([result?.place?.address] || [{}]);
    }
    catch {
      //TODO: What to do here?
      return [{}] as any
    }
  }
}
