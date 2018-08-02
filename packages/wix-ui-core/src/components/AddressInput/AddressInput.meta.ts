import {AddressInput} from './AddressInput';
import {GoogleMapsClientStub} from './GoogleMapsClientStub';
import {MapsClientConstructor} from '../../clients/GoogleMaps/types';
const noop = require('lodash/noop');
import * as helper from './AddressInputTestHelper';
import Registry from '@ui-autotools/registry';
GoogleMapsClientStub.setAddresses([helper.ADDRESS_1, helper.ADDRESS_2]);
GoogleMapsClientStub.setGeocode(helper.GEOCODE_1);

const Client: MapsClientConstructor = GoogleMapsClientStub as MapsClientConstructor;
const addressInputMeta = Registry.getComponentMetadata(AddressInput);
addressInputMeta.reactStrictModeCompliant = false;

addressInputMeta
  .addSim({
    title: 'Simulation with default props',
    props: {
      apiKey: '',
      lang: 'en',
      Client,
      onSelect: noop
    }
  });
