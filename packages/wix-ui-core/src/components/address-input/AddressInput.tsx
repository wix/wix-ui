import * as React from 'react';
import { style, classes } from './AddressInput.st.css';
import {
  InputWithOptions,
  InputWithOptionsProps,
} from '../input-with-options/InputWithOptions';
import { intersection } from '../../utils/intersection';
import { Option, OptionFactory } from '../dropdown-option';
import {
  Address,
  AddressOutput,
  Geocode,
  MapsClient,
  MapsClientConstructor,
  PlaceDetails,
  Handler,
} from '../../clients/GoogleMaps/types';
import {
  convertToFullAddress,
  convertToPartialAddress,
  trySetStreetNumberIfNotReceived,
} from '../../clients/GoogleMaps/google2address/google2address';

const first = require('lodash/first');
const throttle = require('lodash/throttle');
const isArray = require('lodash/isArray');

export { Handler };

export enum Converter {
  full = 'full',
  simple = 'simple',
}

export type AddressInputProps = Pick<
  InputWithOptionsProps,
  'fixed' | 'flip' | 'moveBy' | 'placement' | 'emptyStateMessage'
> & {
  /** Maps client, should implement autocomplete, geocode and placeDetails methods */
  Client: MapsClientConstructor;
  /** Handler for when an option is selected */
  onSelect(raw: AddressOutput): void;
  /** Maps API key */
  apiKey?: string;
  /** Maps client ID */
  clientId?: string;
  /** Maps language */
  lang?: string;
  /** Address handler - geocode or places */
  handler?: Handler;
  /** Limit addresses to certain country */
  countryCode?: string;
  /** Placeholder to display */
  placeholder?: string;
  /** Sets the input to disabled */
  disabled?: boolean;
  /** Sets the input to readOnly */
  readOnly?: boolean;
  /** Standard input onChange callback */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** Standard input onKeyDown callback */
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  /** Standard input onFocus callback */
  onFocus?(): void;
  /** Standard input onBlur callback */
  onBlur?(): void;
  /** Remove previously fetched addresses upon blur */
  clearSuggestionsOnBlur?: boolean;
  /** Callback when the user pressed the Enter key or Tab key after he wrote in the Input field - meaning the user selected something not in the list  */
  onManualInput?(value: string): void;
  /** Lower level filtering of autocomplete result types (see [here](https://developers.google.com/places/supported_types) for list)  */
  filterTypes?: string[];
  /** Limit the autocomplete to specific types (see [here](https://developers.google.com/places/supported_types#table3) for list) */
  types?: string[];
  /** Inputs value */
  value?: string;
  /** If set to `true`, we will attempt to get a Google location from the input's text if there are no suggestions. This is useful when looking for locations for which google does not give suggestions - for example: Apartment/Apt  */
  fallbackToManual?: boolean;
  /** If set to true, content element will always be visible, used for preview mode */
  forceContentElementVisibility?: boolean;
  /** Options to override default one, used for preview mode */
  forceOptions?: Partial<Option>[];
  /** Force first option selection when user leaves component */
  forceSelect?: boolean;
  /** Options to override default throttle value, 0 used to disable throttle */
  throttleInterval?: number;
  /** Node to be rendered in front of each suggestion */
  locationIcon?: React.ReactNode;
  /** Inline styles */
  style?: object;
  /** Input inline styles */
  inputStyle?: React.CSSProperties;
  /** Option inline styles */
  optionStyle?: React.CSSProperties;
  /** Prefix for input */
  prefix?: React.ReactNode;
  /** Suffix for input */
  suffix?: React.ReactNode;
  /** Fixed footer in content element */
  fixedFooter?: React.ReactNode;
  /** Id */
  id?: string;
  /** aria-label - accessibility*/
  'aria-label'?: string;
  /** Pass errors from Google Client to callback */
  onError?(err: Error): void;
  /** Standard input onClick callback */
  onClick?(): void;
  /** Standard input onDoubleClick callback */
  onDoubleClick?(): void;
  /** Standard input onMouseEnter callback */
  onMouseEnter?(): void;
  /** Standard input onMouseLeave callback */
  onMouseLeave?(): void;
  /** A custom formatter for maps API response */
  converterType?: Converter;
  /** Pass a custom class to the input element */
  inputClassName?: string;
  /** Options box z-index */
  optionsContainerZIndex?: number;
};

export interface AddressInputState {
  options: Option[];
  inputValue: string;
  isDirty: boolean;
}

function filterAddressesByType(addresses: Address[], filterTypes?: string[]) {
  return filterTypes && filterTypes.length > 0
    ? (addresses || []).filter(
        address => intersection(address.types, filterTypes).length > 0,
      )
    : addresses;
}

function formatAddressOutput(
  google: Geocode | PlaceDetails,
  description: string,
  rawInputValue: string,
  converterType: Converter,
): AddressOutput {
  trySetStreetNumberIfNotReceived(google, rawInputValue);

  const converter =
    converterType === Converter.full
      ? convertToFullAddress
      : convertToPartialAddress;

  return {
    originValue: description,
    googleResult: google,
    address: converter(google),
  };
}

function createAutocompleteRequest(input: string, props: AddressInputProps) {
  const { countryCode, types } = props;
  const result: any = { input };

  if (typeof countryCode === 'string') {
    result.componentRestrictions = { country: countryCode.toLowerCase() };
  }

  if (types) {
    result.types = types;
  }

  return result;
}

/**
 * AddressInput
 */
export class AddressInput extends React.PureComponent<
  AddressInputProps,
  AddressInputState
> {
  static displayName = 'AddressInput';
  inputRef;
  inputWithOptionsRef;

  static defaultProps = {
    handler: Handler.geocode,
    throttleInterval: 150,
    lang: 'en',
    converterType: Converter.full,
  };

  client: MapsClient;
  addressRequestId;
  geocodeRequestId;
  placeDetailsRequestId;
  currentAddressRequest;
  unmounted: boolean = false;
  optionWasSelected: boolean = false;

  constructor(props) {
    super(props);
    this.addressRequestId = 0;
    this.geocodeRequestId = 0;
    this.placeDetailsRequestId = 0;

    this._getAddressOptions =
      props.throttleInterval === 0
        ? this._getAddressOptions.bind(this)
        : throttle(this._getAddressOptions, props.throttleInterval);
    this._handleOnChange = this._handleOnChange.bind(this);
    this._handleOnManualInput = this._handleOnManualInput.bind(this);
    this._onSelect = this._onSelect.bind(this);
    this._handleOnBlur = this._handleOnBlur.bind(this);
    this._renderOption = this._renderOption.bind(this);
    this._createOptionFromAddress = this._createOptionFromAddress.bind(this);
    this._handleContentMouseDown = this._handleContentMouseDown.bind(this);
    this.currentAddressRequest = Promise.resolve();

    this.state = { options: [], inputValue: props.value || '', isDirty: false };
  }

  componentDidMount() {
    this.client = new this.props.Client();
    if (this.props.clientId) {
      this.client.useClientId();
    }
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // If user interacted, meaning the value is "dirty",
    // we want to update it in any case.
    if (nextProps.value !== this.props.value || this.state.isDirty) {
      this.setState({ inputValue: nextProps.value, isDirty: false });
    }
  }

  focus() {
    this.inputRef.focus();
  }

  blur() {
    this.inputRef.blur();
  }

  close() {
    this.inputWithOptionsRef.close();
  }

  clear() {
    this.setState({ inputValue: '', options: [] });
  }

  _getKey() {
    return this.props.clientId || this.props.apiKey;
  }

  async _getAddressOptions(input: string) {
    const requestId = ++this.addressRequestId;
    let resolveCurrentAddressRequest;
    this.currentAddressRequest = new Promise(
      resolve => (resolveCurrentAddressRequest = resolve),
    );
    const { lang, filterTypes } = this.props;
    const results = await this.client.autocomplete(
      this._getKey(),
      lang,
      createAutocompleteRequest(input, this.props),
    );
    const filteredResults = filterAddressesByType(results, filterTypes) || [];
    const options = filteredResults.map(this._createOptionFromAddress);
    if (!this.unmounted && requestId === this.addressRequestId) {
      this.setState({ options }, resolveCurrentAddressRequest);
    }
  }

  async _getGeocode(
    placeId: string | number,
    description: string,
    rawInputValue: string,
  ) {
    const requestId = ++this.geocodeRequestId;
    const { lang, countryCode: region, converterType } = this.props;
    const request = placeId ? { placeId, region } : { address: rawInputValue };
    const geocode = await this.client.geocode(this._getKey(), lang, request);

    if (requestId === this.geocodeRequestId) {
      this._invokeOnSelect(
        formatAddressOutput(
          first(geocode),
          description,
          rawInputValue,
          converterType,
        ),
      );
    }
  }

  async _getPlaceDetails(
    placeId: string | number,
    description: string,
    rawInputValue: string,
  ) {
    const requestId = ++this.placeDetailsRequestId;
    const { lang, converterType } = this.props;
    const placeDetails = await this.client.placeDetails(this._getKey(), lang, {
      placeId,
    });

    if (requestId === this.placeDetailsRequestId) {
      this._invokeOnSelect(
        formatAddressOutput(
          placeDetails,
          description,
          rawInputValue,
          converterType,
        ),
      );
    }
  }

  _invokeOnSelect(value) {
    if (!this.unmounted) {
      this.setState({ isDirty: true });
      this.props.onSelect(value);
    }
  }

  async _forceSelectIfNeeded() {
    const { forceSelect } = this.props;
    if (forceSelect) {
      const options = this._options();
      const firstOption = options.length ? first(options) : null;

      if (!this.optionWasSelected && firstOption) {
        try {
          await this._onSelect(firstOption);
        } catch (e) {
          this._handleClientError(e);
        }
      }
    }
  }

  async _onSelect(option: Option | null) {
    const { handler } = this.props;
    const { inputValue } = this.state;

    try {
      if (!option && !inputValue) {
        this._invokeOnSelect(null);
      } else if (!option) {
        await this._getGeocode(null, null, inputValue);
      } else if (handler === Handler.geocode && option) {
        await this._getGeocode(option.id, option.value, inputValue);
      } else if (handler === Handler.places) {
        await this._getPlaceDetails(option.id, option.value, inputValue);
      }
    } catch (e) {
      this._handleClientError(e);
    }
  }

  async _handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { onChange } = this.props;
    const { value } = e.target;
    this.optionWasSelected = false;

    onChange && onChange(e);

    this.setState({ inputValue: value });

    if (value) {
      try {
        await this._getAddressOptions(value);
      } catch (e) {
        this._handleClientError(e);
      }
    } else {
      this.setState({ options: [] });
    }
  }

  _handleClientError(e) {
    const { onError } = this.props;
    this.setState({ options: [] });
    if (onError) {
      onError(e);
    } else {
      throw e;
    }
  }

  async _handleOnManualInput(value: string) {
    const { onManualInput, fallbackToManual } = this.props;
    onManualInput && onManualInput(value);

    await this.currentAddressRequest;

    if (fallbackToManual && this.state.options.length === 0) {
      try {
        await this._onSelect(null);
      } catch (e) {
        this._handleClientError(e);
      }
    }
  }

  async _handleOnBlur() {
    const { clearSuggestionsOnBlur, onBlur } = this.props;

    await this._forceSelectIfNeeded();

    onBlur && onBlur();
    if (clearSuggestionsOnBlur) {
      this.setState({ options: [] });
    }
  }

  _handleContentMouseDown(e) {
    this.optionWasSelected = true;
    e.preventDefault(); // Prevent input blur
  }

  _renderOption(val) {
    const { locationIcon, optionStyle } = this.props;
    return (
      <div className={style.option} style={optionStyle}>
        {locationIcon && (
          <div className={style.iconWrapper} data-hook="location-icon-wrapper">
            {locationIcon}
          </div>
        )}
        <div className={style.optionContent}>{val}</div>
      </div>
    );
  }

  _createOptionFromAddress(address) {
    return OptionFactory.create({
      id: address.place_id,
      value: address.description,
      render: this._renderOption,
    });
  }

  _options() {
    const { forceOptions } = this.props;

    if (isArray(forceOptions) && forceOptions.length > 0) {
      return forceOptions.map(this._createOptionFromAddress);
    }
    return this.state.options;
  }

  render() {
    const {
      placeholder,
      placement,
      onKeyDown,
      onFocus,
      forceContentElementVisibility,
      emptyStateMessage,
      readOnly,
      disabled,
      style: inlineStyles,
      prefix,
      suffix,
      fixedFooter,
      id,
      inputStyle,
      flip,
      fixed,
      optionStyle,
      moveBy,
      inputClassName,
      optionsContainerZIndex,
    } = this.props;
    const options = this._options();

    const inputProps = {
      'aria-label': this.props['aria-label'],
      onChange: this._handleOnChange,
      onKeyDown,
      onFocus,
      onBlur: this._handleOnBlur,
      placeholder,
      readOnly,
      disabled,
      value: this.state.inputValue,
      prefix,
      suffix,
      ref: ref => (this.inputRef = ref),
      onClick: this.props.onClick,
      onDoubleClick: this.props.onDoubleClick,
      onMouseEnter: this.props.onMouseEnter,
      onMouseLeave: this.props.onMouseLeave,
      style: inputStyle,
      inputClassName,
    };

    const states = {};
    const hasOptions = options.length > 0;
    const timeout = hasOptions ? 150 : 0;

    return (
      <InputWithOptions
        className={style(classes.root, states)}
        onContentMouseDown={this._handleContentMouseDown}
        onSelect={this._onSelect}
        options={options}
        inputProps={inputProps}
        placement={placement}
        onManualInput={this._handleOnManualInput}
        timeout={timeout}
        forceContentElementVisibility={forceContentElementVisibility}
        style={inlineStyles}
        fixedFooter={hasOptions && fixedFooter}
        id={id}
        ref={ref => (this.inputWithOptionsRef = ref)}
        allowReselect
        filterPredicate={() => true}
        flip={flip}
        fixed={fixed}
        moveBy={moveBy}
        emptyStateMessage={emptyStateMessage}
        emptyStateStyle={optionStyle}
        optionsContainerZIndex={optionsContainerZIndex}
      />
    );
  }
}
