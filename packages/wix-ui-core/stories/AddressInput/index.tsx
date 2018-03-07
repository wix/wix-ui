import 'react';
import createStory from '../create-story';
import {AddressInput} from '../../src/components/AddressInput';
import * as AddressInputSource from '!raw-loader!../../src/components/AddressInput/AddressInput.tsx';
import {GoogleMapsIframeClient} from '../../src/clients/GoogleMaps/GoogleMapsIframeClient';
import {MapsClientConstructor} from '../../src/clients/GoogleMaps/types';

export const story = () => {
    const Client: MapsClientConstructor = GoogleMapsIframeClient as MapsClientConstructor;

    return createStory({
        category: 'Components',
        name: 'AddressInput',
        storyName: 'AddressInput',
        component: AddressInput,
        componentProps: () => ({
            apiKey: '',
            lang: 'en',
            Client,
            onSelect: () => null
        }),
        source: AddressInputSource
    });
};
