const metaSiteInstaceMock = 'some-meta-site-instance';
const predictRequestMock = {
  input: 'predict-input',
  countryCodes: ['IL'],
};

const successfulPredictResponseMock = {
  predictions: [
    {
      searchId: 'some-search-id',
      description: 'some-description',
    },
  ],
};

const getPlaceRequestMock = {
  placeId: 'some-id',
};

const successfulGetPlaceResponseMock = {
  place: {
    address: {
      formattedAddress: 'some-formattedAddress',
      streetAddress: 'some-streetAddress',
      subdivision: 'some-subdivision',
      city: 'some-city',
      country: 'some-country',
      postalCode: 'some-postalCode',
    },
  },
};

export {
  metaSiteInstaceMock,
  predictRequestMock,
  getPlaceRequestMock,
  successfulPredictResponseMock,
  successfulGetPlaceResponseMock,
};
