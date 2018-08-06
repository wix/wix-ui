import * as React from 'react';
import {bool, func, string, node, oneOf} from 'prop-types';
const omit = require('lodash/omit');
import {Tickers} from './Tickers';
import {Input, InputProps} from '../Input';
import style from './TimePicker.st.css';
import {FIELD, BLANK, NULL_TIME, AmPmOptions, AmPmStrings} from './constants';
import {
  increment,
  decrement,
  convertToAmPm,
  leftpad,
  getFieldFromPos,
  parseTime,
  isValidTime
} from './utils';

export type TimePickerProps = Pick<InputProps, 'disabled'> & {
  /**
   *  Callback function when user changes the value of the component.
   *  Will be called only with valid values (this component is semi-controlled)
   */
  onChange?: (value: string) => void;

  /** Standard input onFocus callback */
  onFocus?: React.FocusEventHandler<HTMLElement>;

  /** Standard input onBlur callback */
  onBlur?: React.FocusEventHandler<HTMLElement>;

  /** Use native (input type = 'time') interaction */
  useNativeInteraction?: boolean;

  /** Display and interact as AM/PM instead of 24 hour */
  useAmPm?: AmPmOptions;

  /** Interval in minutes to increase / decrease the time when on minutes or external */
  step?: number;

  /** Time in 24hour format according to the spec 23:59(:59(.999)) (https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#times). Can be null */
  value?: string;

  /** What to display for the up ticker. Will only be shown if tickerDownIcon is also provided */
  tickerUpIcon?: React.ReactNode;

  /** What to display for the down ticker. Will only be shown if tickerUpIcon is also provided */
  tickerDownIcon?: React.ReactNode;

  /** Is it an error state */
  error?: boolean;

  /** custom width of component. Goes into inline style so any css distance value allowed */
  style?: React.CSSProperties;
}

export interface TimePickerState {
  value: string;
  focus: boolean;
}

// TODO: make all _prefix private when the parser won't choke on it

/**
 * Time Picker - following the Chrome on Mac behavior (mostly)
 */
export class TimePicker extends React.PureComponent<TimePickerProps, TimePickerState> {
  static displayName = 'TimePicker';

  /**
   * Tracks when focus is lost from the element or from the entire page -
   * We don't want focus to move if we left the page
   */
  _shouldHighlightOnFocus: boolean;

  /**
   * Tracks when the user started typing in a numerical field, to switch
   * behavior on first type and on subsequent types
   */
  _hasStartedTyping: boolean;

  /** For disabling select and drag */
  _mouseDown: boolean;

  /** To keep track of where to increment / decrement externally (ticker) */
  _lastFocusedField: FIELD;

  /** Reference to the input component */
  _inputRef: Input;

  static defaultProps = {
    onChange             : () => null,
    useNativeInteraction : false,
    useAmPm              : AmPmOptions.None,
    step                 : 1,
    value                : null
  };

  static propTypes: Object = {
    ...Input.propTypes,

    /**
     *  Callback function when user changes the value of the component.
     *  Will be called only with valid values (this component is semi-controlled)
     */
    onChange: func,

    /** Standard input onFocus callback */
    onFocus: func,

    /** Standard input onBlur callback */
    onBlur: func,

    /** Use native (input type = 'time') interaction */
    useNativeInteraction: bool,

    /** Display and interact as AM/PM instead of 24 hour */
    useAmPm: oneOf([AmPmOptions.None, AmPmOptions.Lowercase, AmPmOptions.Uppercase, AmPmOptions.Capitalized]),

    /** Interval in minutes to increase / decrease the time when on minutes or external */
    step: (props, propName, componentName) => {
      const step = props[propName];
      if (typeof step === 'undefined' || step === null) { return null; }
      if (typeof step !== 'number')            { return new Error(`Invalid prop '${propName}' supplied to '${componentName}': [${step}] is not a number.`); }
      const integerStep = Math.trunc(step);
      if (integerStep !== step)                { return new Error(`Invalid prop '${propName}' supplied to '${componentName}': [${step}] is not an integer.`); }
      if (integerStep < 1 || integerStep > 60) { return new Error(`Invalid prop '${propName}' supplied to '${componentName}': [${step}] is not in range 1-60.`); }
    },

    /** Time in 24hour format according to the spec 23:59(:59(.999)) (https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#times). Can be null */
    value: (props, propName, componentName) => {
      const value = props[propName];
      if (value !== null && !isValidTime(value)) {
        return new Error(
          `Invalid prop '${propName}' supplied to '${componentName}': [${value}] is not valid, must be in 23:59(:59(.999)) format.
          For details see https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#times`
        );
      }
    },

    /** What to display for the up ticker. Will only be shown if tickerDownIcon is also provided */
    tickerUpIcon: node,

    /** What to display for the down ticker. Will only be shown if tickerUpIcon is also provided */
    tickerDownIcon: node
  };

  constructor(props) {
    super(props);
    this._shouldHighlightOnFocus = true;
    this._hasStartedTyping       = false;
    this._mouseDown              = false;
    this._lastFocusedField       = FIELD.BEFORE;
    this._inputRef               = null;

    this._highlightField = this._highlightField.bind(this);
    this._onMouseDown    = this._onMouseDown.bind(this);
    this._onMouseUp      = this._onMouseUp.bind(this);
    this._onMouseMove    = this._onMouseMove.bind(this);
    this._onClick        = this._onClick.bind(this);
    this._onBlur         = this._onBlur.bind(this);
    this._onFocus        = this._onFocus.bind(this);
    this._onKeyDown      = this._onKeyDown.bind(this);
    this._increment      = this._increment.bind(this);
    this._decrement      = this._decrement.bind(this);
  }

  state = {
    value: this.props.value && isValidTime(this.props.value) ? this.props.value.substr(0, 5) : NULL_TIME,
    focus: false
  };

  componentWillReceiveProps(nextProps) {
    let {value} = nextProps;
    if (this.props.value !== value) {
      if (!value || !isValidTime(value)) {
        value = NULL_TIME;
      }
      this.setState({value: value.substr(0, 5)});
    }
  }

  _highlightField(DOMelement: HTMLInputElement, field: FIELD) {
    const startPos = (field - 1) * 3;
    if (startPos < 0) { return; }
    DOMelement.setSelectionRange(startPos, startPos + 2);
  }

  _onMouseDown(e) {
    this._shouldHighlightOnFocus = false;
    this._hasStartedTyping       = false;
    this._mouseDown              = true;
  }

  _onMouseUp(e) {
    this._mouseDown = false;
  }

  _onMouseMove(e) {
    if (this._mouseDown) { e.preventDefault(); }
  }

  _onClick(e) {
    // Highlighting on click instead of mousedown because the selectionStart isn't set yet
    e.preventDefault();
    const elem = e.target;
    const field = getFieldFromPos(elem.selectionStart);
    // Using setTimeout because otherwise mouse clicking on a selection will de-select :/
    setTimeout(() => this._highlightField(elem, field), 0);
  }

  _onBlur(e) {
    this._shouldHighlightOnFocus = e.target !== document.activeElement;
    this._hasStartedTyping = false;
    this._lastFocusedField = getFieldFromPos(e.target.selectionStart);

    // Validate on blur and call onChange if needed
    let {value} = this.state;
    const {onChange, useAmPm} = this.props;

    if (value === NULL_TIME) {
      if (!!this.props.value) {
        onChange(null);
      }
    } else if (isValidTime(value, useAmPm !== AmPmOptions.None)) {
      if (this.props.value !== value) {
        onChange(value);
      }
    } else {
      const {hour, minute} = parseTime(value);
      const nHour          = parseInt(hour)   || 0;
      let   nMinute        = parseInt(minute) || 0;
      if (nMinute > 59) { nMinute = 59; }
      value = `${leftpad(nHour)}:${leftpad(nMinute)}`;
      this.setState({value}, () => { if (value !== this.props.value) { onChange(value); } });
    }

    this.setState({focus: false});
    this.props.onBlur && this.props.onBlur(e);
  }

  _onFocus(e) {
    if (this._shouldHighlightOnFocus) {
      const elem = e.target;
      this._highlightField(elem, FIELD.HOUR);
      this._hasStartedTyping = false;
    }
    this.setState({focus: true});
    this.props.onFocus && this.props.onFocus(e);
  }

  _onKeyDown(e) {
    /*
      Respond to:
      - tab
      - numbers
      - case-insensitive A, P (for am/pm)
      - arrow keys
      - delete and backspace
    */

    if (e.altKey || e.ctrlKey || e.metaKey) { return; }

    const elem                    = e.target;
    const startPos                = elem.selectionStart;
    const {useAmPm, onChange}     = this.props;
    let {value}                   = this.state;
    let currentField              = getFieldFromPos(startPos);
    const isAmPm                  = useAmPm !== AmPmOptions.None;

    // Checking for TAB first because it's the only key that might have default behavior
    // Shift focus between fields if tab is pressed, or use regular behavior if the field is on the edge
    // i.e., tabbing while on AM/PM or shift+tab on hour
    if (e.key === 'Tab') {
      currentField += e.shiftKey ? -1 : 1;
      if (currentField === FIELD.HOUR || currentField === FIELD.MINUTE || currentField === FIELD.AMPM && isAmPm) {
        e.preventDefault();
        this._highlightField(elem, currentField);
      }
      return;
    }

    // Block other input default behavior
    e.preventDefault();

    // Handle numeric input
    if (/^[0-9]$/.test(e.key)) {
      const num = parseInt(e.key);
      let {hour, minute} = parseTime(value);

      if (currentField === FIELD.HOUR) {
        if (this._hasStartedTyping) {
          let nHour = parseInt(`${hour[1]}${num}`);
          if (nHour > 12 && isAmPm) { nHour = 12; }
          if (nHour > 23)           { nHour = 23; }
          hour = `${nHour}`;
          currentField = FIELD.MINUTE;
          this._hasStartedTyping = false;
        } else {
          if ((num > 1 && isAmPm) || num > 2) {
            currentField = FIELD.MINUTE;
          } else {
            this._hasStartedTyping = true;
          }
          hour = e.key;
        }
      } else if (currentField === FIELD.MINUTE) {
          if (this._hasStartedTyping) {
            minute = `${parseInt(`${minute[1]}${num}`)}`;
          } else {
            this._hasStartedTyping = true;
            minute = e.key;
          }
      }

      value = `${leftpad(hour)}:${leftpad(minute)}`;
      this.setState({value}, () => {
        this._highlightField(elem, currentField);
        if (isValidTime(value)) { onChange(value); }
      });
      return;
    }

    this._hasStartedTyping = false;

    // All the rest: arrow keys, tab, delete, backspace, A/P
    switch (e.key) {
      // Change focus on arrow left or right
      case 'ArrowLeft': {
        currentField -= 1;
        if (currentField === FIELD.BEFORE) { currentField = FIELD.HOUR; }
        this._highlightField(elem, currentField);
        break;
      }

      case 'ArrowRight': {
        currentField += 1;
        if (currentField === FIELD.AMPM && !isAmPm) { currentField = FIELD.MINUTE; }
        if (currentField === FIELD.AFTER)           { currentField = FIELD.AMPM; }
        this._highlightField(elem, currentField);
        break;
      }

      // Increment or decrement for up/down arrows
      case 'ArrowUp':
      case 'ArrowDown': {
        const {step} = this.props;
        value = e.key === 'ArrowUp'
          ? increment({value, field: currentField, step})
          : decrement({value, field: currentField, step});
        this.setState({value}, () => {
          this._highlightField(elem, currentField);
          if (isValidTime(value)) { onChange(value); }
        });
        break;
      }

      // AM / PM only if on relevant field
      case 'a':
      case 'A':
      case 'p':
      case 'P': {
        if (currentField !== FIELD.AMPM) { break; }
        const {hour} = parseTime(value);
        const nHour = parseInt(hour);
        if (nHour < 12 && (e.key === 'p' || e.key === 'P') ||
            nHour > 11 && (e.key === 'a' || e.key === 'A')) {
          value = increment({value, field: FIELD.AMPM});
          this.setState({value}, () => {
            this._highlightField(elem, FIELD.AMPM);
            onChange(value);
          });
        }
        break;
      }

      // Change field to BLANK on delete or backspace. Ignore if field is AM/PM
      case 'Delete':
      case 'Backspace': {
        const {hour, minute} = parseTime(value);
        const callback = () => {
          if (this.state.value === NULL_TIME) { onChange(null); }
          this._highlightField(elem, currentField);
        };
        if (currentField === FIELD.HOUR)   { this.setState({value: `${BLANK}:${minute}`}, callback); }
        if (currentField === FIELD.MINUTE) { this.setState({value: `${hour}:${BLANK}`},   callback); }
        break;
      }

      default:
    }
  }

  _increment(field?: FIELD) {
    let {value} = this.state;
    const {step, onChange} = this.props;
    value = increment({value, field: field || this._lastFocusedField || FIELD.MINUTE, step});
    this.setState({value});
    if (isValidTime(value)) { onChange(value); }
  }

  _decrement(field?: FIELD) {
    let {value} = this.state;
    const {step, onChange} = this.props;
    value = decrement({value, field: field || this._lastFocusedField || FIELD.MINUTE, step});
    this.setState({value});
    if (isValidTime(value)) { onChange(value); }
  }

  focus() {
    this._inputRef.focus();
  }

  blur() {
    this._inputRef.blur();
  }

  render() {
    const {
      useNativeInteraction,
      useAmPm,
      tickerUpIcon,
      tickerDownIcon,
      style: inlineStyle,
      ...rest
    } = this.props;

    const passThroughProps = omit(rest, [
      'onChange',
      'step',
      'value',
    ]);

    if (useNativeInteraction) {
      const {value: propsValue, onChange} = this.props;
      const sanitizedValue = propsValue && isValidTime(propsValue) ? propsValue.substr(0, 5) : '';

      return (
        <Input
          {...passThroughProps}
          {...style('root', {}, this.props)}
          type        = "time"
          value       = {sanitizedValue}
          onChange    = {e => onChange(e.target.value)}
        />
      );
    }

    let {value, focus} = this.state;
    if (useAmPm !== AmPmOptions.None) {
      value = convertToAmPm({value, strings: AmPmStrings[useAmPm]});
    }

    const tickers = tickerUpIcon && tickerDownIcon && (
      <Tickers
        className      = {style.tickers}
        onIncrement    = {() => this._increment()}
        onDecrement    = {() => this._decrement()}
        tickerUpIcon   = {tickerUpIcon}
        tickerDownIcon = {tickerDownIcon}
      />
    );

    return (
      <Input
        {...passThroughProps}
        {...style('root', {focus}, this.props)}
        ref         = {ref => this._inputRef = ref}
        type        = "text"
        value       = {value}
        suffix      = {tickers}
        onKeyDown   = {this._onKeyDown}
        onFocus     = {this._onFocus}
        onBlur      = {this._onBlur}
        onMouseDown = {this._onMouseDown}
        onMouseUp   = {this._onMouseUp}
        onMouseMove = {this._onMouseMove}
        onClick     = {this._onClick}
        onDragStart = {e => e.stopPropagation()}
        style       = {inlineStyle}
      />
    );
  }
}
