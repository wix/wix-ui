import * as React from 'react';
import * as map from 'lodash.map';
import * as first from 'lodash.first';
import * as filter from 'lodash.filter';
import * as intersection from 'lodash.intersection';
import * as throttle from 'lodash.throttle';
import style from './AddressInput.st.css';
import * as propTypes from 'prop-types';
import {InputWithOptions} from '../../baseComponents/InputWithOptions/InputWithOptions';

import {Option, OptionFactory} from '../../baseComponents/DropdownOption';
import {
    Address,
    AddressOutput, Geocode, MapsClient, MapsClientConstructor,
    PlaceDetails, Handler
} from '../../clients/GoogleMaps/types';
import {google2address, trySetStreetNumberIfNotReceived} from './google2address';

export {Handler};

export interface AddressInputProps {
    Client: MapsClientConstructor;
    onSelect: (raw: AddressOutput) => any;
    apiKey: string;
    lang: string;
    handler?: Handler;
    countryCode?: string;
    placeHolder?: string;
    readOnly?: boolean;
    onChange?: (value: string) => any;
    onKeyDown?: (value: string) => any;
    onFocus?: () => any;
    onBlur?: () => any;
    clearSuggestionsOnBlur?: boolean;
    onManualInput?: (value: string) => any;
    filterTypes?: Array<string>;
    types?: Array<string>;
    value?: string;
    fallbackToManual?: boolean;
}

export interface AddressInputState {
    options: Array<Option>;
    inputValue: string;
}

function createOptionFromAddress(address) {
    return OptionFactory.create({
        id: address.place_id,
        isDisabled: false,
        isSelectable: true,
        value: address.description,
        render: () => address.description
    });
}

function filterAddressesByType(addresses: Array<Address>, filterTypes?: Array<string>) {
    return filterTypes ? filter(addresses, address => intersection(address.types, filterTypes).length > 0) : addresses;
}

function formatAddressOutput(google: Geocode|PlaceDetails, description: string, rawInputValue: string): AddressOutput {
    trySetStreetNumberIfNotReceived(google, rawInputValue);

    return {
        originValue: description,
        googleResult: google,
        address: google2address(google)
    };
}

function createAutocompleteRequest(input: string, props: AddressInputProps) {
    const {countryCode, types} = props;
    const result: any = {input};

    if (typeof countryCode === 'string') {
        result.componentRestrictions = {country: countryCode.toLowerCase()};
    }

    if (types) {
        result.types = types;
    }

    return result;
}

/**
 * AddressInput
 */
export class AddressInput extends React.PureComponent<AddressInputProps, AddressInputState> {
    static displayName = 'AddressInput';

    static propTypes = {
        Client: propTypes.func,
        onSelect: propTypes.func,
        apiKey: propTypes.string,
        lang: propTypes.string,
        handler: propTypes.oneOf([Handler.geocode, Handler.places]),
        countryCode: propTypes.string,
        placeHolder: propTypes.string,
        readOnly: propTypes.bool,
        onChange: propTypes.func,
        onKeyDown: propTypes.func,
        onFocus: propTypes.func,
        onBlur: propTypes.func,
        clearSuggestionsOnBlur: propTypes.bool,
        onManualInput: propTypes.func,
        filterTypes: propTypes.arrayOf(propTypes.string),
        types: propTypes.arrayOf(propTypes.string),
        value: propTypes.string,
        fallbackToManual: propTypes.bool
    };

    static defaultProps = {
        handler: Handler.geocode
    };

    client: MapsClient;
    addressRequestId;
    geocodeRequestId;
    placeDetailsRequestId;
    currentAddressRequest;

    constructor(props) {
        super(props);
        this.state = {options: [], inputValue: ''};
        this.addressRequestId = 0;
        this.geocodeRequestId = 0;
        this.placeDetailsRequestId = 0;

        this.getAddressOptions = throttle(this.getAddressOptions, 150);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnManualInput = this.handleOnManualInput.bind(this);
        this.currentAddressRequest = Promise.resolve();
    }

    componentDidMount() {
        this.client = new this.props.Client();
    }

    async getAddressOptions(input) {
        const requestId = ++this.addressRequestId;
        let resolveCurrentAddressRequest = () => null;
        this.currentAddressRequest = new Promise(resolve => resolveCurrentAddressRequest = resolve);
        const {apiKey, lang, filterTypes} = this.props;
        const results = await this.client.autocomplete(apiKey, lang, createAutocompleteRequest(input, this.props));
        const filteredResults = filterAddressesByType(results, filterTypes);
        const options = map(filteredResults, createOptionFromAddress);

        if (requestId === this.addressRequestId) {
            this.setState({options}, resolveCurrentAddressRequest);
        }
    }

    async getGeocode(placeId, description, rawInputValue) {
        const requestId = ++this.geocodeRequestId;
        const {apiKey, lang, countryCode: region} = this.props;
        const request = placeId ? {placeId, region} : {address: rawInputValue};
        const geocode = await this.client.geocode(apiKey, lang, request);

        if (requestId === this.geocodeRequestId) {
            this.props.onSelect(formatAddressOutput(first(geocode), description, rawInputValue));
        }
    }

    async getPlaceDetails(placeId, description, rawInputValue) {
        const requestId = ++this.placeDetailsRequestId;
        const {apiKey, lang} = this.props;
        const placeDetails = await this.client.placeDetails(apiKey, lang, {placeId});

        if (requestId === this.placeDetailsRequestId) {
            this.props.onSelect(formatAddressOutput(placeDetails, description, rawInputValue));
        }
    }

    onSelect(option, rawInputValue) {
        const {handler} = this.props;

        if (!option.id && !rawInputValue) {
            this.props.onSelect(null);
        } else if (handler === Handler.geocode || !option.id) {
            this.getGeocode(option.id, option.value, rawInputValue);
        } else if (handler === Handler.places) {
            this.getPlaceDetails(option.id, option.value, rawInputValue);
        }
    }

    handleOnChange(e) {
        const {onChange} = this.props;
        const {value} = e.target;

        if (typeof onChange === 'function') {
            this.props.onChange(e);
        }

        this.setState({inputValue: value});

        if (value) {
            this.getAddressOptions(value);
        } else {
            this.setState({options: []});
        }
    }

    async handleOnManualInput(e) {
        const {onManualInput, fallbackToManual} = this.props;
        if (typeof onManualInput === 'function') {
            onManualInput(e);
        }

        await this.currentAddressRequest;

        if (fallbackToManual && this.state.options.length === 0) {
            this.onSelect({}, this.state.inputValue);
        }
    }

    render() {
        const {placeHolder, onKeyDown, onFocus, onBlur, clearSuggestionsOnBlur, value} = this.props;
        const {options} = this.state;

        const inputProps = {
            onChange: this.handleOnChange,
            onKeyDown: (e) => { onKeyDown && onKeyDown(e); },
            onFocus: () => { onFocus && onFocus(); },
            onBlur: () => { onBlur && onBlur(); clearSuggestionsOnBlur && this.setState({options: []}); },
            placeholder: placeHolder,
            disabled: this.props.readOnly,
            value
        };

        const states = {};
        const timeout = options.length > 0 ? 150 : 0;

        return <InputWithOptions
            {...style('root', states, this.props)}
            onSelect={(option) => this.onSelect(option, this.state.inputValue)}
            options={options}
            inputProps={inputProps}
            onManualInput={this.handleOnManualInput}
            timeout={timeout}
        />;
    }
}
