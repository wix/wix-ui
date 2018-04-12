import {AddressInput} from '../../src/components/AddressInput';
import {GoogleMapsClientStub} from '../../src/components/AddressInput/GoogleMapsClientStub';
import {MapsClientConstructor} from '../../src/clients/GoogleMaps/types';
import * as helper from '../../src/components/AddressInput/AddressInputTestHelper';

GoogleMapsClientStub.setAddresses([helper.ADDRESS_1, helper.ADDRESS_2]);
GoogleMapsClientStub.setGeocode(helper.GEOCODE_1);

const Client: MapsClientConstructor = GoogleMapsClientStub as MapsClientConstructor;

export default {
  category: 'Components',
  storyName: 'AddressInput',

  component: AddressInput,
  componentPath: '../../src/components/AddressInput',

  componentProps: {
    apiKey: '',
    lang: 'en',
    Client,
    onSelect: () => null,
    'data-hook': 'storybook-addressInput'
  }
};
