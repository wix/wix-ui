import {
  getPlaceRequestMock,
  metaSiteInstaceMock,
  predictRequestMock,
  successfulPredictResponseMock,
  successfulGetPlaceResponseMock,
} from './testUtils'

const WixAtlasServiceMock = () => {
  let predictSucceeded = true
  let getPlaceSucceeded = true

  return {
    AutocompleteServiceV2: jest.fn().mockReturnValue(
      jest.fn().mockImplementation((headers: any) => {
        if (headers.Authorization !== metaSiteInstaceMock) {
          predictSucceeded = false
        }
        return {
          predict: jest.fn().mockImplementation(async (request: any) => {
            if (
              request.input !== predictRequestMock.input ||
              (request.countryCodes && request.countryCodes[0] !== predictRequestMock.countryCodes[0])
            ) {
              predictSucceeded = false
            }
            return predictSucceeded ? Promise.resolve(successfulPredictResponseMock) : Promise.reject('PredictFailed')
          }),
        }
      })
    ),
    PlacesServiceV2: jest.fn().mockReturnValue(
      jest.fn().mockImplementation((headers: any) => {
        if (headers.Authorization !== metaSiteInstaceMock) {
          getPlaceSucceeded = false
        }
        return {
          getPlace: jest.fn().mockImplementation(async (request: any) => {
            if (request.searchId !== getPlaceRequestMock.placeId) {
              getPlaceSucceeded = false
            }
            return getPlaceSucceeded ? Promise.resolve(successfulGetPlaceResponseMock) : Promise.reject('GetPlaceFailed')
          }),
        }
      })
    ),
  }
}

export { WixAtlasServiceMock }
