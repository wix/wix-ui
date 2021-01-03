import { WixAtlasServiceWeb } from '@wix/ambassador-wix-atlas-service-web/http';
import { IAddressInputControllerActions } from '../AddressInput.types';
import {
  Address,
  Geocode,
  MapsClient,
  PlacesServiceStatusTypes,
} from './types';

const ATLAS_WEB_BASE_URL = '/api/wix-atlas-service-web';
const BASE_LINGUIST_HEADER =
  '|en-us|false|4e8a573a-6b3e-426f-9d2f-5285b7dc90f8';
const { AutocompleteServiceV2, PlacesServiceV2 } = WixAtlasServiceWeb(ATLAS_WEB_BASE_URL);

//TODO: Rewrite this
const serializeResult = results => ({
  ...results,
  geometry: {
    ...results.geometry,
    location: {
      lat: results.geometry.location.lat,
      lng: results.geometry.location.lng,
    },
  },
});

const toSuggestions = (predictions: Array<V2Prediction>): Array<Address> =>
  predictions.map(prediction => ({
    place_id: prediction.searchId || '',
    description: prediction.description || '',
    types: []
  }));

export class AtlasBasicClient implements MapsClient {
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
      const predictResponse = this._predict(predictRequest)
      if (predictResponse.predictions && predictResponse.predictions.length) {
        // setAutoCompleteError(false);
        return toSuggestions(predictResponse.predictions || []);
      } else {
        //TODO: ....? How is it done in bolt?
        return [];
        // onAutoCompleteError(translationKeys.noResults);
      }
    }
    //TODO: what to do here?
    catch {
      return []
    }
  }

  useClientId() {}

  async geocode(
    clientId: string,
    lang: string,
    request: any,
    //TODO: Why array?????
  ): Promise<Geocode[]> {
    this._initServices(lang);
    const getPlaceRequest = {
      searchId: request.placeId
    }
    try {
      const result = this._getPlace(getPlaceRequest);
      return [serializeResult(result)];
    }
    catch {
      //TODO: What to do here?
      return [{}] as any
    }
  }
}
