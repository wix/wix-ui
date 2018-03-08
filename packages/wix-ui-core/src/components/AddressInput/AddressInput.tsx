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
import {google2address, trySetStreetNumberIfNotReceived} from '../../clients/GoogleMaps/google2address/google2address';

export {Handler};

export interface AddressInputProps {
    /** Maps client, should implement autocomplete, geocode and placeDetails methods */
    Client: MapsClientConstructor;
    /** Handler for when an option is selected */
    onSelect: (raw: AddressOutput) => any;
    /** Maps API key */
    apiKey: string;
    /** Maps language */
    lang: string;
    /** Address handler - geocode or places */
    handler?: Handler;
    /** Limit addresses to certain country */
    countryCode?: string;
    /** Placeholder to display */
    placeHolder?: string;
    /** Sets the input to readOnly */
    readOnly?: boolean;
    /** Standard input onChange callback */
    onChange?: React.EventHandler<React.ChangeEvent<HTMLInputElement>>;
    /** Standard input onKeyDown callback */
    onKeyDown?: React.EventHandler<React.KeyboardEvent<HTMLInputElement>>;
    /** Standard input onFocus callback */
    onFocus?: () => any;
    /** Standard input onBlur callback */
    onBlur?: () => any;
    /** Remove previously fetched addresses upon blur */
    clearSuggestionsOnBlur?: boolean;
    /** Callback when the user pressed the Enter key or Tab key after he wrote in the Input field - meaning the user selected something not in the list  */
    onManualInput?: (value: string) => any;
    /** Lower level filtering of autocomplete result types (see [here](https://developers.google.com/places/supported_types) for list)  */
    filterTypes?: Array<string>;
    /** Limit the autocomplete to specific types (see [here](https://developers.google.com/places/supported_types#table3) for list) */
    types?: Array<string>;
    /** Inputs value */
    value?: string;
    /** If set to `true`, we will attempt to get a Google location from the input's text if there are no suggestions. This is useful when looking for locations for which google does not give suggestions - for example: Apartment/Apt  */
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

const EMPTY_OPTION = OptionFactory.create({id: null});

/**
 * AddressInput
 */
export class AddressInput extends React.PureComponent<AddressInputProps, AddressInputState> {
    static displayName = 'AddressInput';

    static propTypes = {
        /** Maps client, should implement autocomplete, geocode and placeDetails methods */
        Client: propTypes.func,
        /** Handler for when an option is selected */
        onSelect: propTypes.func,
        /** Maps API key */
        apiKey: propTypes.string,
        /** Maps language */
        lang: propTypes.string,
        /** Address handler - geocode or places */
        handler: propTypes.oneOf([Handler.geocode, Handler.places]),
        /** Limit addresses to certain country */
        countryCode: propTypes.string,
        /** Placeholder to display */
        placeHolder: propTypes.string,
        /** Sets the input to readOnly */
        readOnly: propTypes.bool,
        /** Standard input onChange callback */
        onChange: propTypes.func,
        /** Standard input onKeyDown callback */
        onKeyDown: propTypes.func,
        /** Standard input onFocus callback */
        onFocus: propTypes.func,
        /** Standard input onBlur callback */
        onBlur: propTypes.func,
        /** Remove previously fetched addresses upon blur */
        clearSuggestionsOnBlur: propTypes.bool,
        /** Callback when the user pressed the Enter key or Tab key after he wrote in the Input field - meaning the user selected something not in the list  */
        onManualInput: propTypes.func,
        /** Lower level filtering of autocomplete result types (see [here](https://developers.google.com/places/supported_types) for list)  */
        filterTypes: propTypes.arrayOf(propTypes.string),
        /** Limit the autocomplete to specific types (see [here](https://developers.google.com/places/supported_types#table3) for list) */
        types: propTypes.arrayOf(propTypes.string),
        /** Inputs value */
        value: propTypes.string,
        /** If set to `true`, we will attempt to get a Google location from the input's text if there are no suggestions. This is useful when looking for locations for which google does not give suggestions - for example: Apartment/Apt  */
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

        this._getAddressOptions = throttle(this._getAddressOptions, 150);
        this._handleOnChange = this._handleOnChange.bind(this);
        this._handleOnManualInput = this._handleOnManualInput.bind(this);
        this.currentAddressRequest = Promise.resolve();
    }

    componentDidMount() {
        this.client = new this.props.Client();
    }

    async _getAddressOptions(input: string) {
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

    async _getGeocode(placeId: string | number, description: string, rawInputValue: string) {
        const requestId = ++this.geocodeRequestId;
        const {apiKey, lang, countryCode: region} = this.props;
        const request = placeId ? {placeId, region} : {address: rawInputValue};
        const geocode = await this.client.geocode(apiKey, lang, request);

        if (requestId === this.geocodeRequestId) {
            this.props.onSelect(formatAddressOutput(first(geocode), description, rawInputValue));
        }
    }

    async _getPlaceDetails(placeId: string | number, description: string, rawInputValue: string) {
        const requestId = ++this.placeDetailsRequestId;
        const {apiKey, lang} = this.props;
        const placeDetails = await this.client.placeDetails(apiKey, lang, {placeId});

        if (requestId === this.placeDetailsRequestId) {
            this.props.onSelect(formatAddressOutput(placeDetails, description, rawInputValue));
        }
    }

    _onSelect(option: Option, rawInputValue: string) {
        const {handler} = this.props;

        if (!option.id && !rawInputValue) {
            this.props.onSelect(null);
        } else if (handler === Handler.geocode || !option.id) {
            this._getGeocode(option.id, option.value, rawInputValue);
        } else if (handler === Handler.places) {
            this._getPlaceDetails(option.id, option.value, rawInputValue);
        }
    }

    _handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {onChange} = this.props;
        const {value} = e.target;

        if (typeof onChange === 'function') {
            this.props.onChange(e);
        }

        this.setState({inputValue: value});

        if (value) {
            this._getAddressOptions(value);
        } else {
            this.setState({options: []});
        }
    }

    async _handleOnManualInput(value: string) {
        const {onManualInput, fallbackToManual} = this.props;
        if (typeof onManualInput === 'function') {
            onManualInput(value);
        }

        await this.currentAddressRequest;

        if (fallbackToManual && this.state.options.length === 0) {
            this._onSelect(EMPTY_OPTION, this.state.inputValue);
        }
    }

    render() {
        const {placeHolder, onKeyDown, onFocus, onBlur, clearSuggestionsOnBlur, value} = this.props;
        const {options} = this.state;

        const inputProps = {
            onChange: this._handleOnChange,
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
            onSelect={(option) => this._onSelect(option, this.state.inputValue)}
            options={options}
            inputProps={inputProps}
            onManualInput={this._handleOnManualInput}
            timeout={timeout}
        />;
    }
}
