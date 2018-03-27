import * as React from 'react';
import {bool, func, object, string} from 'prop-types';
const omit = require('lodash/omit');
import {Input, InputProps} from '../Input';
import style from '../Input/Input.st.css';
import {
  FIELD,
  BLANK,
  NULL_TIME,
  increment,
  decrement,
  convertToAmPm,
  leftpad,
  getFieldFromPos,
  parseTime,
  isValidTime
} from './utils';

export interface TimePickerProps extends InputProps {
  onChange?: (value: any) => any;
  useNativeInteraction?: boolean;
  useAmPm?: boolean;
  step?: number;
  separateSteps?: boolean;
  value?: string;
  placeholder?: string;
}

export interface TimePickerState {
  value: string;
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

  /** To be able to call focus */
  _inputRef: Input;

  static defaultProps = {
    onChange             : () => { return null; },
    useNativeInteraction : false,
    useAmPm              : false,
    step                 : 1,
    separateSteps        : false,
    value                : null,
    placeholder          : NULL_TIME,
  };

  static propTypes: Object = {
    ...Input.propTypes,

    /**
     *  Callback function when user changes the value of the component.
     *  Will be called only with valid values (this component is semi-controlled)
     */
    onChange: func,

    /** Use native (input type = 'time') interaction */
    useNativeInteraction: bool,

    /** Display and interact as AM/PM instead of 24 hour */
    useAmPm: bool,

    /** Interval in minutes to increase / decrease the time when on minutes or external */
    step: (props, propName, componentName) => {
      const step = props[propName];
      if (typeof step === 'undefined' || step === null) { return null; }
      if (typeof step !== 'number')            { return new Error(`Invalid prop '${propName}' supplied to '${componentName}': [${step}] is not a number.`); }
      const integerStep = Math.trunc(step);
      if (integerStep !== step)                { return new Error(`Invalid prop '${propName}' supplied to '${componentName}': [${step}] is not an integer.`); }
      if (integerStep < 1 || integerStep > 60) { return new Error(`Invalid prop '${propName}' supplied to '${componentName}': [${step}] is not in range 1-60.`); }
    },

    /** When true, does not tie hour to minute when incrementing / decrementing (i.e, inc on 00:59 will go to 00:00 instead of 01:00) */
    separateSteps: bool,

    /** Time in 24hour format (00:00 - 23:59). Can be null */
    value: string,

    /** What to display when value is null */
    placeholder: string,
  };

  constructor(props) {
    super(props);
    this._shouldHighlightOnFocus = true;
    this._hasStartedTyping       = false;
    this._mouseDown              = false;
    this._lastFocusedField       = FIELD.NONE;

    let {value} = props;
    if (!value || !isValidTime(value)) {
      value = isValidTime(props.placeholder) ? props.placeholder : NULL_TIME;
    }

    this.state = {value};

    // Internal functions
    this._highlightField = this._highlightField.bind(this);
    this._onMouseDown    = this._onMouseDown.bind(this);
    this._onMouseUp      = this._onMouseUp.bind(this);
    this._onMouseMove    = this._onMouseMove.bind(this);
    this._onClick        = this._onClick.bind(this);
    this._onBlur         = this._onBlur.bind(this);
    this._onFocus        = this._onFocus.bind(this);
    this._onKeyDown      = this._onKeyDown.bind(this);

    // External functions (for ticker buttons)
    this.increment       = this.increment.bind(this);
    this.decrement       = this.decrement.bind(this);
    this.focus           = this.focus.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let {value, placeholder} = nextProps;
    if (this.props.value !== value || this.props.placeholder !== placeholder) {
      if (!value || !isValidTime(value)) {
        value = placeholder ? placeholder : NULL_TIME;
      }
      this.setState({value});
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
    if (isValidTime(value, useAmPm) || value === NULL_TIME) {
      if (value !== this.props.value) { onChange(value === NULL_TIME ? null : value); }
    } else {
      const {hour, minute} = parseTime(value);
      const nHour          = parseInt(hour)   || 0;
      let   nMinute        = parseInt(minute) || 0;
      if (nMinute > 59) { nMinute = 59; }
      value = `${leftpad(nHour)}:${leftpad(nMinute)}`;
      this.setState({value}, () => { if (value !== this.props.value) { onChange(value); } });
    }
  }

  _onFocus(e) {
    if (!this._shouldHighlightOnFocus) { return; }
    const elem = e.target;
    this._highlightField(elem, FIELD.HOUR);
    this._hasStartedTyping = false;
  }

  _onKeyDown(e) {
    /*
      Respond to:
      - numbers
      - case-insensitive A, P (for am/pm)
      - arrow keys
      - delete and backspace
      - tab
    */
    if (e.altKey || e.ctrlKey || e.metaKey) { return; }

    const elem                = e.target;
    const startPos            = elem.selectionStart;
    const {useAmPm, onChange} = this.props;
    let {value}               = this.state;
    let currentField          = getFieldFromPos(startPos);

    // Handle numeric input
    if (/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      const num = parseInt(e.key);
      let {hour, minute} = parseTime(value);

      if (currentField === FIELD.HOUR) {
        if (this._hasStartedTyping) {
          let nHour = parseInt(`${hour[1]}${num}`);
          if (nHour > 12 && useAmPm) { nHour = 12; }
          if (nHour > 23)            { nHour = 23; }
          hour = `${nHour}`;
          currentField = FIELD.MINUTE;
          this._hasStartedTyping = false;
        } else {
          if (num > 1 && useAmPm || num > 2) {
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
        e.preventDefault();
        currentField -= 1;
        if (currentField === FIELD.NONE) { currentField = FIELD.HOUR; }
        this._highlightField(elem, currentField);
        break;
      }

      case 'ArrowRight': {
        e.preventDefault();
        currentField += 1;
        if (currentField === FIELD.AMPM && !useAmPm) { currentField = FIELD.MINUTE; }
        if (currentField === FIELD.AFTER)            { currentField = FIELD.AMPM; }
        this._highlightField(elem, currentField);
        break;
      }

      // Increment or decrement for up/down arrows
      case 'ArrowUp':
      case 'ArrowDown': {
        e.preventDefault();
        const {step, separateSteps} = this.props;
        value = e.key === 'ArrowUp'
          ? increment({value, field: currentField, step, separateSteps})
          : decrement({value, field: currentField, step, separateSteps});
        this.setState({value}, () => {
          this._highlightField(elem, currentField);
          if (isValidTime(value)) { onChange(value); }
        });
        break;
      }

      // AM / PM only if on relevant field
      case 'a': // keycode 65
      case 'A':
      case 'p': // keycode 80
      case 'P': {
        e.preventDefault();
        if (currentField !== FIELD.AMPM) { break; }
        const {hour} = parseTime(value);
        const nHour = parseInt(hour);
        if (nHour < 12 && e.keyCode === 80 || nHour > 11 && e.keyCode === 65) {
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
        e.preventDefault();
        const {hour, minute} = parseTime(value);
        const callback = () => {
          if (this.state.value === NULL_TIME) { onChange(null); }
          this._highlightField(elem, currentField);
        };
        if (currentField === FIELD.HOUR)   { this.setState({value: `${BLANK}:${minute}`}, callback); }
        if (currentField === FIELD.MINUTE) { this.setState({value: `${hour}:${BLANK}`},   callback); }
        break;
      }

      // Shift focus between fields if tab is pressed, or use regular behavior if the field is on the edge
      // i.e., tabbing while on AM/PM or shift+tab on hour
      case 'Tab': {
        currentField += e.shiftKey ? -1 : 1;
        if (currentField === FIELD.HOUR || currentField === FIELD.MINUTE || currentField === FIELD.AMPM && useAmPm) {
          e.preventDefault();
          this._highlightField(elem, currentField);
        }
        break;
      }

      // Disallow other keyboard inputs
      default: {
        e.preventDefault();
      }
    }
  }

  increment(field?: FIELD) {
    let {value} = this.state;
    const {step, separateSteps} = this.props;
    value = increment({value, field: field || this._lastFocusedField || FIELD.MINUTE, step, separateSteps});
    this.setState({value});
  }

  decrement(field?: FIELD) {
    let {value} = this.state;
    const {step, separateSteps} = this.props;
    value = decrement({value, field: field || this._lastFocusedField || FIELD.MINUTE, step, separateSteps});
    this.setState({value});
  }

  focus() {
    this._inputRef.focus();
  }

  render() {
    const {useNativeInteraction, useAmPm, ...rest} = this.props;
    const passThroughProps = omit(rest, Object.keys(TimePicker.propTypes));

    let {value} = this.state;
    if (useAmPm) {
      value = convertToAmPm(value);
    }

    return (
      <Input
        ref         = {ref => this._inputRef = ref}
        {...style('root', {}, this.props)}
        {...passThroughProps}
        value       = {value}
        type        = {useNativeInteraction ? 'time' : 'text'}
        onKeyDown   = {this._onKeyDown}
        onFocus     = {this._onFocus}
        onBlur      = {this._onBlur}
        onMouseDown = {this._onMouseDown}
        onMouseUp   = {this._onMouseUp}
        onMouseMove = {this._onMouseMove}
        onClick     = {this._onClick}
        onDragStart = {e => { e.preventDefault(); e.stopPropagation(); }}
      />
    );
  }
}
