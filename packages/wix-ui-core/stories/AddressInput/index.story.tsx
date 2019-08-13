import { AddressInput } from '../../src/components/address-input';
import { GoogleMapsClientStub } from '../../src/components/address-input/GoogleMapsClientStub';
import { MapsClientConstructor } from '../../src/clients/GoogleMaps/types';
import * as helper from '../../src/components/address-input/AddressInputTestHelper';
import { Category } from '../utils';

GoogleMapsClientStub.setAddresses([helper.ADDRESS_1, helper.ADDRESS_2]);
GoogleMapsClientStub.setGeocode(helper.GEOCODE_1);

const Client: MapsClientConstructor = GoogleMapsClientStub as MapsClientConstructor;

export default {
  category: Category.COMPONENTS,
  storyName: 'AddressInput',

  component: AddressInput,
  componentPath: '../../src/components/address-input',

  componentProps: setState => ({
    apiKey: '',
    lang: 'en',
    Client,
    fixed: true,
    forceSelect: false,
    onSelect: value => setState({ value: value.address.formatted }),
    'data-hook': 'storybook-addressInput',
  }),

  exampleProps: {
    placement: [
      'auto-start',
      'auto',
      'auto-end',
      'top-start',
      'top',
      'top-end',
      'right-start',
      'right',
      'right-end',
      'bottom-end',
      'bottom',
      'bottom-start',
      'left-end',
      'left',
      'left-start',
    ],
  },

  codeExample: false,
};
