import { ATLAS_WEB_BASE_URL, AtlasBasicClient, mockWixAtlasService } from './AtlasBasicClient'
import {
  getPlaceRequestMock,
  metaSiteInstaceMock,
  predictRequestMock,
  successfulPredictResponseMock,
  successfulGetPlaceResponseMock,
} from './testUtils'
import { WixAtlasServiceMock } from './atlasServiceMock'

const lang = 'en'
const clientId = 'some-id'

describe('AtlasBasicClient', () => {
  beforeEach(() => {
    mockWixAtlasService(WixAtlasServiceMock)
  })

  describe('atlas base url', () => {
    const getBaseUrlAtlasMock = (baseUrl: string) => {
      return {
        AutocompleteServiceV2: jest.fn().mockReturnValue(
          jest.fn().mockReturnValue({
            predict: jest.fn().mockResolvedValue({
              predictions: [{
                description: baseUrl
              }]
            }),
          })),
        PlacesServiceV2: jest.fn().mockReturnValue(
          jest.fn().mockReturnValue({
            getPlace: jest.fn().mockResolvedValue(baseUrl),
          })),
      }
    }

    beforeEach(() => {
      mockWixAtlasService(getBaseUrlAtlasMock)
    })

    it('should use externalBaseUrl if provided', async () => {
      let result
      const externalBaseUrl = 'some-url'
      const client = new AtlasBasicClient({lang, instance: metaSiteInstaceMock, externalBaseUrl})

      try {
        result = await client.autocomplete(clientId, lang, {} as any)
      }
      catch (e) {
        result = e
      }
      expect(result[0].description).toEqual(`${externalBaseUrl}${ATLAS_WEB_BASE_URL}`)
    })

    it('should use only atlas base url if no externalBaseUrl exists',async () => {
      let result
      const client = new AtlasBasicClient({lang, instance: metaSiteInstaceMock})

      try {
        result = await client.autocomplete(clientId, lang, {} as any)
      }
      catch (e) {
        result = e
      }
      expect(result[0].description).toEqual(ATLAS_WEB_BASE_URL)
    })
  })
  describe('autocomplete', () => {
    const successfulResult = [{
      place_id: successfulPredictResponseMock.predictions[0].searchId,
      description: successfulPredictResponseMock.predictions[0].description,
      types: []
    }]

    it('should call atlass getPlace and return a promise', async () => {
      let result
      const client = new AtlasBasicClient({lang, instance: metaSiteInstaceMock})
      const predictRequest = {
        input: predictRequestMock.input,
        componentRestrictions: {
          country: 'IL'
        }
      }
      try {
        result = await client.autocomplete(clientId, lang, predictRequest)
      }
      catch (e) {
        result = e
      }
      expect(result).toEqual(successfulResult)
    })

    it('should set the country filter to atlas autocomplete request', async () => {
      let result
      const client = new AtlasBasicClient({lang, instance: metaSiteInstaceMock})
      const predictRequest = {
        input: predictRequestMock.input,
        componentRestrictions: {
          country: 'some-other country'
        }
      }
      try {
        result = await client.autocomplete(clientId, lang, predictRequest)
      }
      catch (e) {
        result = e
      }
      //autocomplete mock fails if country exists and isnt IL
      expect(result).toEqual('PredictFailed')
    })
  })

  describe('geocode', () => {
    const successfulGetPlace = [{
      formatted: successfulGetPlaceResponseMock.place.address.formattedAddress,
      streetAddress: successfulGetPlaceResponseMock.place.address.streetAddress,
      subdivision: successfulGetPlaceResponseMock.place.address.subdivision,
      city: successfulGetPlaceResponseMock.place.address.city,
      country: successfulGetPlaceResponseMock.place.address.country,
      postalCode: successfulGetPlaceResponseMock.place.address.postalCode,
    }]

    it('should call geocode and return a promise', async () => {
      let result
      const client = new AtlasBasicClient({lang, instance: metaSiteInstaceMock})
      try {
        result = await client.geocode(clientId, lang, getPlaceRequestMock)
      }
      catch (e) {
        result = e
      }
      return expect(result).toEqual(successfulGetPlace)
    })
  })

  describe('invalid auth headers', () => {
    it('Should fail autocomplete with invalid auth header', async () => {
      let result
      const client = new AtlasBasicClient({lang, instance: ''})
      try {
        result = await client.autocomplete(clientId, lang, predictRequestMock)
      }
      catch (e) {
        result = e
      }
      return expect(result).toEqual('PredictFailed')
    })

    it('Should fail geocode with invalid auth header', async () => {
      let result
      const client = new AtlasBasicClient({lang, instance: ''})
      try {
        result = await client.geocode(clientId, lang, getPlaceRequestMock)
      }
      catch (e) {
        result = e
      }
      return expect(result).toEqual('GetPlaceFailed')
    })
  })
})
