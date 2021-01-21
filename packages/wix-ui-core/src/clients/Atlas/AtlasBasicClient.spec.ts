import { AtlasBasicClient } from './AtlasBasicClient'
import {
  getPlaceRequestMock,
  metaSiteInstaceMock,
  predictRequestMock,
  successfulPredictResponseMock,
  successfulGetPlaceResponseMock,
} from './testUtils'


const lang = 'en'
const clientId = 'some-id'

describe('AtlasBasicClient', () => {
  describe('autocomplete', () => {
    const successfulResult = [{
      place_id: successfulPredictResponseMock.predictions[0].searchId,
      description: successfulPredictResponseMock.predictions[0].description,
      types: []
    }]

    it('should call atlass getPlace and return a promise', async () => {
      let result
      const client = new AtlasBasicClient()
      const predictRequest = {
        input: predictRequestMock.input,
        componentRestrictions: {
          country: 'IL'
        }
      }
      try {
        result = await client.autocomplete(clientId, lang, predictRequest, metaSiteInstaceMock)
      }
      catch (e) {
        result = e
      }
      expect(result).toEqual(successfulResult)
    })

    it('should set the country filter to atlas autocomplete request', async () => {
      let result
      const client = new AtlasBasicClient()
      const predictRequest = {
        input: predictRequestMock.input,
        componentRestrictions: {
          country: 'some-other country'
        }
      }
      try {
        result = await client.autocomplete(clientId, lang, predictRequest, metaSiteInstaceMock)
      }
      catch (e) {
        result = e
      }
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
      const client = new AtlasBasicClient()
      try {
        result = await client.geocode(clientId, lang, getPlaceRequestMock, metaSiteInstaceMock)
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
      const client = new AtlasBasicClient()
      try {
        result = await client.autocomplete(clientId, lang, predictRequestMock, '')
      }
      catch (e) {
        result = e
      }
      return expect(result).toEqual('PredictFailed')
    })

    it('Should fail geocode with invalid auth header', async () => {
      let result
      const client = new AtlasBasicClient()
      try {
        result = await client.geocode(clientId, lang, getPlaceRequestMock, '')
      }
      catch (e) {
        result = e
      }
      return expect(result).toEqual('GetPlaceFailed')
    })
  })
})
