import * as React from 'react';
import createStory from '../create-story';
import {AddressInput} from '../../src/components/AddressInput';
import {GoogleMapsClientStub} from '../../src/components/AddressInput/GoogleMapsClientStub';
import {MapsClientConstructor} from '../../src/clients/GoogleMaps/types';
import * as helper from '../../src/components/AddressInput/AddressInputTestHelper';

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
                    data-hook="storybook-addressInput"/>
                {this.state.lagLng && <div data-hook="lat-lng">{this.state.lagLng}</div>}
            </div>
        );
    }
};