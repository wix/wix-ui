import {AddressInput} from '../../src/components/address-input';
import {GoogleMapsClientStub} from '../../src/components/address-input/GoogleMapsClientStub';
import {MapsClientConstructor} from '../../src/clients/GoogleMaps/types';
import * as helper from '../../src/components/address-input/AddressInputTestHelper';

GoogleMapsClientStub.setAddresses([helper.ADDRESS_1, helper.ADDRESS_2]);
GoogleMapsClientStub.setGeocode(helper.GEOCODE_1);

const Client: MapsClientConstructor = GoogleMapsClientStub as MapsClientConstructor;

export default {
  category: 'Components',
  storyName: 'AddressInput',

  component: AddressInput,
  componentPath: '../../src/components/address-input',

  componentProps: setState => ({
    apiKey: '',
    lang: 'en',
    Client,
    onSelect: value => setState({value: value.address.formatted}),
    'data-hook': 'storybook-addressInput'
  })
};
