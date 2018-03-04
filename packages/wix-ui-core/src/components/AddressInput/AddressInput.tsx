import * as React from 'react';
import * as map from 'lodash.map';
import * as first from 'lodash.first';
import * as filter from 'lodash.filter';
import * as intersection from 'lodash.intersection';
import style from './AddressInput.st.css';
import * as propTypes from 'prop-types';
import {InputWithOptions} from '../../baseComponents/InputWithOptions/InputWithOptions';

import {Option, OptionFactory} from '../../baseComponents/DropdownOption';
import {
    Address,
    AddressOutput, Geocode, MapsClient, MapsClientConstructor,
    PlaceDetails, Handler
} from '../../clients/GoogleMaps/types';
import {google2address} from './google2address';

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
}

export interface AddressInputState {
    options: Array<Option>;
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

function filterAddressesByType(addresses:Array<Address>, filterTypes?:Array<string>) {
    return filterTypes ? filter(addresses, address => intersection(address.types, filterTypes).length > 0) : addresses;
}

function formatAddressOutput(google: Geocode|PlaceDetails, description: string): AddressOutput {
    return {
        originValue: description,
        googleResult: google,
        address: google2address(google)
    }
}

function createAutocompleteRequest(input:string, props:AddressInputProps) {
    const {countryCode, types} = props;
    const result:any = {input};

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
        value: propTypes.string
    };

    static defaultProps = {
        handler: Handler.geocode
    };

    client: MapsClient;
    addressRequestId;
    geocodeRequestId;
    placeDetailsRequestId;

    constructor(props) {
        super(props);
        this.state = {options: []};
        this.addressRequestId = 0;
        this.geocodeRequestId = 0;
        this.placeDetailsRequestId = 0;
    }

    componentDidMount() {
        this.client = new this.props.Client();
    }

    async getAddressOptions(input) {
        if (!input) {
            return this.setState({options: []});
        }

        const requestId = ++this.addressRequestId;
        const {apiKey, lang, filterTypes, countryCode} = this.props;
        const results = await this.client.autocomplete(apiKey, lang, createAutocompleteRequest(input, this.props));
        const filteredResults = filterAddressesByType(results, filterTypes);
        const options = map(filteredResults, createOptionFromAddress);

        if (requestId === this.addressRequestId) {
            this.setState({options});
        }
    }

    async getGeocode(placeId, description) {
        const requestId = ++this.geocodeRequestId;
        const {apiKey, lang, countryCode: region} = this.props;
        const geocode = await this.client.geocode(apiKey, lang, {placeId, region});

        if (requestId === this.geocodeRequestId) {
            this.props.onSelect(formatAddressOutput(first(geocode), description));
        }
    }

    async getPlaceDetails(placeId, description) {
        const requestId = ++this.placeDetailsRequestId;
        const {apiKey, lang} = this.props;
        const placeDetails = await this.client.placeDetails(apiKey, lang, {placeId});

        if (requestId === this.placeDetailsRequestId) {
            this.props.onSelect(formatAddressOutput(placeDetails, description));
        }
    }

    onSelect(option) {
        const {handler} = this.props;

        if (handler === Handler.geocode) {
            this.getGeocode(option.id, option.value);
        } else if (handler === Handler.places) {
            this.getPlaceDetails(option.id, option.value);
        }
    }

    render() {
        const {placeHolder, onChange, onKeyDown, onFocus, onBlur, clearSuggestionsOnBlur, onManualInput, value} = this.props;
        const {options} = this.state;

        const inputProps = {
            onChange: (e) => { onChange && onChange(e); this.getAddressOptions(e.target.value) },
            onKeyDown: (e) => { onKeyDown && onKeyDown(e); },
            onFocus: () => { onFocus && onFocus(); },
            onBlur: () => { onBlur && onBlur(); clearSuggestionsOnBlur && this.setState({options: []}) },
            placeholder: placeHolder,
            disabled: this.props.readOnly,
            value
        };

        const states = {};
        const timeout = options.length > 0 ? 150 : 0;

        return <InputWithOptions
            {...style('root', states, this.props)}
            onSelect={(option) => this.onSelect(option)}
            options={options}
            inputProps={inputProps}
            onManualInput={onManualInput}
            timeout={timeout}
        />;
    }
}
