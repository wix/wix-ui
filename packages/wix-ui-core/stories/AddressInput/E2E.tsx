import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { AddressInput } from '../../src/components/address-input';
import { GoogleMapsClientStub } from '../../src/components/address-input/GoogleMapsClientStub';
import { MapsClientConstructor } from '../../src/clients/GoogleMaps/types';
import * as helper from '../../src/components/address-input/AddressInputTestHelper';
import {Category} from '../utils';

export const DataHooks = {
  resetStub: 'reset-stub',
  fillStub: 'fill-stub',
  input: 'storybook-address-input',
  latLng: 'lat-lng',
};

const Client: MapsClientConstructor = GoogleMapsClientStub as MapsClientConstructor;

export class AddressInputE2E extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { lagLng: '' };
  }

  handleOnSelect(value) {
    this.setState({
      lagLng: JSON.stringify(value.googleResult.geometry.location),
    });
  }

  fillStub() {
    GoogleMapsClientStub.setAddresses([helper.ADDRESS_1, helper.ADDRESS_2]);
    GoogleMapsClientStub.setGeocode(helper.GEOCODE_1);
  }

  resetStub() {
    GoogleMapsClientStub.reset();
  }

  render() {
    const optionStyle: React.CSSProperties = {
      padding: '0 20px',
      background: 'rgba(200, 255, 200, 0.4)',
      fontWeight: 'bold',
    };
    return (
      <div>
        <button onClick={this.fillStub} data-hook={DataHooks.fillStub}>
          Fill stub
        </button>
        <button onClick={this.resetStub} data-hook={DataHooks.resetStub}>
          Reset stub
        </button>
        <AddressInput
          onSelect={value => this.handleOnSelect(value)}
          apiKey=""
          Client={Client}
          lang="en"
          data-hook={DataHooks.input}
          emptyStateMessage={'No Results'}
          optionStyle={optionStyle}
        />
        {this.state.lagLng && (
          <div data-hook={DataHooks.latLng}>{this.state.lagLng}</div>
        )}
      </div>
    );
  }
}

const isE2E = (global as any).self === (global as any).top;

if (isE2E) {
  storiesOf(Category.COMPONENTS, module).add('AddressInputE2E', () => (
    <AddressInputE2E />
  ));
}
