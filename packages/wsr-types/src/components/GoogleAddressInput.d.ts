declare namespace __WSR {
  namespace GoogleAddressInput {
    export interface GoogleAddressInputProps
      extends BaseComponents.OmitPolyfill<
        Input.InputProps,
        'onChange' | 'onBlur' | 'onFocus'| 'onKeyDown'| 'onKeyUp'| 'onPaste'
      > {
      placeholder?: string;
      valuePrefix?: string;
      countryCode?: string;
      value?: string;
      error?: boolean;
      onChange?: React.MouseEventHandler<HTMLButtonElement>,
      onBlur?: React.MouseEventHandler<HTMLButtonElement>,
      onFocus?: React.MouseEventHandler<HTMLButtonElement>,
      onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>,
      onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>,
      onPaste?: React.ClipboardEventHandler<HTMLInputElement>,
      onSet?: Function;
      magnifyingGlass?: boolean;
      readOnly?: boolean;
      autoSelect?: boolean;
      clearSuggestionsOnBlur?: boolean;
      fallbackToManual?: boolean;
      poweredByGoogle?: boolean;
      footer?: string;
      types?: Array<any>;
      filterTypes?: Array<any>;
      placeDetailsFields?: Array<any>;
      theme?: Input.InputTheme;
      footerOptions?: object;
      handler?: 'geocode' | 'places',
      Client?: clients.GoogleMapsClient
    }

    export class GoogleAddressInput extends React.Component<
      GoogleAddressInputProps
    > {}
  }
}

declare module 'wix-style-react' {
  export import GoogleAddressInput = __WSR.GoogleAddressInput.GoogleAddressInput;
  export import GoogleAddressInputProps = __WSR.GoogleAddressInput.GoogleAddressInputProps;
}

declare module 'wix-style-react/GoogleAddressInput' {
  export interface GoogleAddressInputProps
    extends __WSR.GoogleAddressInput.GoogleAddressInputProps {}
  export default __WSR.GoogleAddressInput.GoogleAddressInput;
}
