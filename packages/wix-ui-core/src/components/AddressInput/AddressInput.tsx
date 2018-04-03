import * as React from 'react';
import style from './AddressInput.st.css';
import {func, string, array, bool, oneOf, arrayOf, Requireable} from 'prop-types';
import {InputWithOptions} from '../../baseComponents/InputWithOptions/InputWithOptions';

import {Option, OptionFactory} from '../../baseComponents/DropdownOption';
import {
    Address,
    AddressOutput, Geocode, MapsClient, MapsClientConstructor,
    PlaceDetails, Handler
} from '../../clients/GoogleMaps/types';
import {google2address, trySetStreetNumberIfNotReceived} from '../../clients/GoogleMaps/google2address/google2address';

const first = require('lodash/first');
const map = require('lodash/map');
const filter = require('lodash/filter');
const intersection = require('lodash/intersection');
const throttle = require('lodash/throttle');

export {Handler};

export interface AddressInputProps {
    /** Maps client, should implement autocomplete, geocode and placeDetails methods */
    Client: MapsClientConstructor;
    /** Handler for when an option is selected */
    onSelect: (raw: AddressOutput) => void;
    /** Maps API key */
    apiKey: string;
    /** Maps language */
    lang: string;
    /** Address handler - geocode or places */
    handler?: Handler;
    /** Limit addresses to certain country */
    countryCode?: string;
    /** Placeholder to display */
    placeholder?: string;
    /** Sets the input to readOnly */
    readOnly?: boolean;
    /** Standard input onChange callback */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    /** Standard input onKeyDown callback */
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    /** Standard input onFocus callback */
    onFocus?: () => void;
    /** Standard input onBlur callback */
    onBlur?: () => void;
    /** Remove previously fetched addresses upon blur */
    clearSuggestionsOnBlur?: boolean;
    /** Callback when the user pressed the Enter key or Tab key after he wrote in the Input field - meaning the user selected something not in the list  */
    onManualInput?: (value: string) => void;
    /** Lower level filtering of autocomplete result types (see [here](https://developers.google.com/places/supported_types) for list)  */
    filterTypes?: Array<string>;
    /** Limit the autocomplete to specific types (see [here](https://developers.google.com/places/supported_types#table3) for list) */
    types?: Array<string>;
    /** Inputs value */
    value?: string;
    /** If set to `true`, we will attempt to get a Google location from the input's text if there are no suggestions. This is useful when looking for locations for which google does not give suggestions - for example: Apartment/Apt  */
    fallbackToManual?: boolean;
    /** If set to true, content element will always be visible, used for preview mode */
    forceContentElementVisibility?: boolean;
    /** Options to override default one, used for preview mode */
    forceOptions?: Array<Option>;
}

export interface AddressInputState {
    options: Array<Option>;
    inputValue: string;
}

function createOptionFromAddress(address) {
    return OptionFactory.create({
        id: address.place_id,
        value: address.description
    });
}

function filterAddressesByType(addresses: Array<Address>, filterTypes?: Array<string>) {
    return (filterTypes && filterTypes.length > 0) ? filter(addresses, address => intersection(address.types, filterTypes).length > 0) : addresses;
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
        /** Maps client, should implement autocomplete, geocode and placeDetails methods */
        Client: func.isRequired,
        /** Handler for when an option is selected */
        onSelect: func.isRequired,
        /** Maps API key */
        apiKey: string.isRequired,
        /** Maps language */
        lang: string.isRequired,
        /** Address handler - geocode or places */
        handler: oneOf([Handler.geocode, Handler.places]),
        /** Limit addresses to certain country */
        countryCode: string,
        /** Placeholder to display */
        placeholder: string,
        /** Sets the input to readOnly */
        readOnly: bool,
        /** Standard input onChange callback */
        onChange: func,
        /** Standard input onKeyDown callback */
        onKeyDown: func,
        /** Standard input onFocus callback */
        onFocus: func,
        /** Standard input onBlur callback */
        onBlur: func,
        /** Remove previously fetched addresses upon blur */
        clearSuggestionsOnBlur: bool,
        /** Callback when the user pressed the Enter key or Tab key after he wrote in the Input field - meaning the user selected something not in the list  */
        onManualInput: func,
        /** Lower level filtering of autocomplete result types (see [here](https://developers.google.com/places/supported_types) for list)  */
        filterTypes: arrayOf(string),
        /** Limit the autocomplete to specific types (see [here](https://developers.google.com/places/supported_types#table3) for list) */
        types: arrayOf(string),
        /** Inputs value */
        value: string,
        /** If set to `true`, we will attempt to get a Google location from the input's text if there are no suggestions. This is useful when looking for locations for which google does not give suggestions - for example: Apartment/Apt  */
        fallbackToManual: bool,
        /** If set to true, content element will always be visible, used for preview mode */
        forceContentElementVisibility: bool,
        /** Options to override default one, used for preview mode */
        forceOptions: array
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
        this._onSelect = this._onSelect.bind(this);
        this._handleOnBlur = this._handleOnBlur.bind(this);
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

    _onSelect(option: Option|null) {
        const {handler} = this.props;
        const {inputValue} = this.state;

        if (!option && !inputValue) {
            this.props.onSelect(null);
        } else if (!option) {
            this._getGeocode(null, null, inputValue);
        } else if (handler === Handler.geocode && option) {
            this._getGeocode(option.id, option.value, inputValue);
        } else if (handler === Handler.places) {
            this._getPlaceDetails(option.id, option.value, inputValue);
        }
    }

    _handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {onChange} = this.props;
        const {value} = e.target;

        onChange && onChange(e);

        this.setState({inputValue: value});

        if (value) {
            this._getAddressOptions(value);
        } else {
            this.setState({options: []});
        }
    }

    async _handleOnManualInput(value: string) {
        const {onManualInput, fallbackToManual} = this.props;
        onManualInput && onManualInput(value);

        await this.currentAddressRequest;

        if (fallbackToManual && this.state.options.length === 0) {
            this._onSelect(null);
        }
    }

    _handleOnBlur() {
        const {onBlur, clearSuggestionsOnBlur} = this.props;
        onBlur && onBlur();
        if (clearSuggestionsOnBlur) {
            this.setState({options: []});
        }
    }

    render() {
        const {placeholder, onKeyDown, onFocus, onBlur, clearSuggestionsOnBlur, value, forceContentElementVisibility, forceOptions, readOnly} = this.props;
        const options = forceOptions || this.state.options;

        const inputProps = {
            onChange: this._handleOnChange,
            onKeyDown,
            onFocus,
            onBlur: this._handleOnBlur,
            placeholder,
            disabled: readOnly,
            value
        };

        const states = {};
        const timeout = options.length > 0 ? 150 : 0;

        return <InputWithOptions
            {...style('root', states, this.props)}
            onSelect={this._onSelect}
            options={options}
            inputProps={inputProps}
            onManualInput={this._handleOnManualInput}
            timeout={timeout}
            forceContentElementVisibility={forceContentElementVisibility}
        />;
    }
}
