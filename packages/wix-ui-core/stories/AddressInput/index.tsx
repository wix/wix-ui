import 'react';
import createStory from '../create-story';
import {AddressInput} from '../../src/components/AddressInput';
import * as AddressInputSource from '!raw-loader!../../src/components/AddressInput/AddressInput.tsx';
import {GoogleMapsClientStub} from '../../src/components/AddressInput/GoogleMapsClientStub';
import {MapsClientConstructor} from '../../src/clients/GoogleMaps/types';
import * as helper from '../../src/components/AddressInput/AddressInputTestHelper';

GoogleMapsClientStub.setAddresses([helper.ADDRESS_1, helper.ADDRESS_2]);
GoogleMapsClientStub.setGeocode(helper.GEOCODE_1);

export const story = () => {
    const Client: MapsClientConstructor = GoogleMapsClientStub as MapsClientConstructor;

    return createStory({
        category: 'Components',
        name: 'AddressInput',
        storyName: 'AddressInput',
        component: AddressInput,
        componentProps: () => ({
            apiKey: '',
            lang: 'en',
            Client,
            onSelect: () => null,
            'data-hook': 'storybook-addressInput'
        }),
        source: AddressInputSource
    });
};
