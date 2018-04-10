import * as React from 'react';
import {GoogleMapsIframeClient} from '../../src/clients/GoogleMaps';

const buttonStyle = {
    fontSize: '15px',
    margin: '15px'
};

export class GoogleMapsIframeClientStory extends React.Component<{}, { inputValue: string, result: object[] }> {
    state = {result: [], inputValue: ''};
    client = new GoogleMapsIframeClient();

    constructor(props: any) {
        super(props);
    }

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    }

    autocomplete(apiKey, lang) {
        this.client.autocomplete(apiKey, lang, this.state.inputValue).then((result: object[]) => this.setState({result}));
    }

    geocode(apiKey, lang) {
        this.client.geocode(apiKey, lang, this.state.inputValue).then((result: object[]) => this.setState({result}));
    }

    placeDetails(apiKey, lang) {
        this.client.placeDetails(apiKey, lang, this.state.inputValue).then((result: object[]) => this.setState({result: [result]}));
    }

    render() {
        return (
            <div data-hook="story-google-maps-iframe-client">
                <input
                    type="text"
                    onChange={evt => this.updateInputValue(evt)}
                />
                <button
                    style={buttonStyle}
                    key="story-button-autocomplete-1"
                    onClick={() => this.autocomplete('AIzaSyD62EDVK-7ssPsChsfBiSjEnix4oZHjSsU', 'en')}
                >autocomplete(apiKey1,
                    en)
                </button>
                <button
                    style={buttonStyle}
                    key="story-button-autocomplete-2"
                    onClick={() => this.autocomplete('AIzaSyCWzV1viw-6rUbKDAhzVq848lPB6P9u2EI', 'en')}
                >autocomplete(apiKey2,
                    en)
                </button>
                <button
                    style={buttonStyle}
                    key="story-button-autocomplete-3"
                    onClick={() => this.autocomplete('AIzaSyCWzV1viw-6rUbKDAhzVq848lPB6P9u2EI', 'fr')}
                >autocomplete(apiKey2,
                    fr)
                </button>
                <button
                    style={buttonStyle}
                    key="story-button-geocode"
                    onClick={() => this.geocode('AIzaSyCWzV1viw-6rUbKDAhzVq848lPB6P9u2EI', 'fr')}
                >geocode
                </button>
                <button
                    style={buttonStyle}
                    key="story-button-placeDetails"
                    onClick={() => this.placeDetails('AIzaSyCWzV1viw-6rUbKDAhzVq848lPB6P9u2EI', 'fr')}
                >placeDetails
                </button>
                {this.state.result.length > 0 &&
                <pre>{JSON.stringify(this.state.result, null, 4)}</pre>
                }
            </div>
        );
    }
}
