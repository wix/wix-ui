import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {AddressInput} from '../../src/components/address-input';
import {GoogleMapsClientStub} from '../../src/components/address-input/GoogleMapsClientStub';
import {MapsClientConstructor} from '../../src/clients/GoogleMaps/types';
import * as helper from '../../src/components/address-input/AddressInputTestHelper';

GoogleMapsClientStub.setAddresses([helper.ADDRESS_1, helper.ADDRESS_2]);
GoogleMapsClientStub.setGeocode(helper.GEOCODE_1);

const Client: MapsClientConstructor = GoogleMapsClientStub as MapsClientConstructor;

export class AddressInputE2E extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {lagLng: ''};
    }

    handleOnSelect(value) {
        this.setState({
            lagLng: JSON.stringify(value.googleResult.geometry.location)
        });
    }

    render() {
        return (
            <div>
                <AddressInput
                    onSelect={value => this.handleOnSelect(value)}
                    apiKey=""
                    Client={Client}
                    lang="en"
                    data-hook="storybook-address-input"
                />
                {this.state.lagLng && <div data-hook="lat-lng">{this.state.lagLng}</div>}
            </div>
        );
    }
}

const isE2E = (global as any).self === (global as any).top;

if (isE2E) {
    storiesOf('Components', module)
        .add('AddressInputE2E', () => (
            <AddressInputE2E />
        ));
}
