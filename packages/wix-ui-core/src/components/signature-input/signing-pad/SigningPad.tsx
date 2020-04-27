import * as React from 'react';
import SignaturePad, { IOptions } from 'signature_pad';
import {
  withSignatureInputContext,
  WithSignaturePadProps,
} from '../SignatureInputContext';
import * as PropTypes from 'prop-types';
import { DataHooks } from '../dataHooks';
import { generateID } from '../utils';
import { classes } from './SigningPad.st.css';
import { Omit } from 'type-zoo/types';

export type SignaturePadApi = Pick<
  SignaturePad,
  'clear' | 'toDataURL' | 'isEmpty'
> & {
  focus(): void;
  blur(): void;
};

export type SigningPadOwnProps = Omit<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  'onFocus' | 'onBlur'
> & {
  'data-hook'?: string;
  penColor?: IOptions['penColor'];
  penWidth?: string;
  disabled?: boolean;
  required?: boolean;
  canvasRef?(instance: HTMLCanvasElement): void;
  onInit?(padAPI: SignaturePadApi): void;
  onDrawStart?(e: MouseEvent | React.Touch | React.ChangeEvent): void;
  onDraw?(e: MouseEvent | React.Touch | React.ChangeEvent): void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

export interface SigningPadProps
  extends SigningPadOwnProps,
    WithSignaturePadProps {}

const initialState = { a11yInputValue: '' };
type SigningPadState = Readonly<typeof initialState>;

const calculatePenColor = (penColor?: string) =>
  (isValidColor(penColor) && penColor) || 'black';

const isValidColor = (strColor: string) => {
  const s = new Option().style;
  s.color = strColor;

  // invalid css values don't persist
  return s.color !== '';
};

// size of the drawn signature varies according mouse speed
// the penWidth represents the maximal width of the drawn
// signature line
const transformPenSizeToWidths = (
  penWidth?: string,
): Pick<IOptions, 'minWidth' | 'maxWidth'> => {
  const maxWidth = +penWidth || 2.5;
  return {
    minWidth: Math.max(maxWidth / 5, 0.5),
    maxWidth,
  };
};

const clearA11yValue = () => ({ a11yInputValue: '' });
const updateA11yValue = (value: string) => ({ a11yInputValue: value });

class SigningPadComp extends React.Component<SigningPadProps, SigningPadState> {
  static displayName = 'SigningPad';

  static propTypes = {
    /* Testing ID */
    'data-hook': PropTypes.string,
    /* Color of the signature drawn over the canvas */
    penColor: PropTypes.string,
    /* Width of the signature line drawn over the canvas */
    penWidth: PropTypes.string,
    /* Callback to get imperative signature pad instace API  */
    onInit: PropTypes.func,
    /* Is the signature pad disabled */
    disabled: PropTypes.bool,
    /* Is signature mandatory in form context */
    required: PropTypes.bool,
    /* Callback to get an instance of the canvas HTML element instance */
    canvasRef: PropTypes.func,
    /* Callback which is called when a curve starts to be drawn on the canvas */
    onDrawStart: PropTypes.func,
    /* Callback which is called when a curve is drawn on the canvas */
    onDraw: PropTypes.func,
    /* Callback which is called when the a11y input receives focus  */
    onFocus: PropTypes.func,
    /* Callback which is called when the a11y input loses focus */
    onBlur: PropTypes.func,
  };

  readonly state = initialState;

  private a11yInputEl: HTMLInputElement = undefined;
  private canvasEl: HTMLCanvasElement = undefined;
  private signaturePad: SignaturePad = undefined;

  componentDidMount() {
    this.initSignaturePad();
    this.updateContextInputId();
    this.invokeOnInitCallback();
  }

  initSignaturePad = () => {
    const {
      setSignaturePadContext,
      penColor,
      penWidth,
      onDrawStart,
      onDraw,
      disabled,
    } = this.props;

    this.signaturePad = new SignaturePad(this.canvasEl, {
      penColor: calculatePenColor(penColor),
      onBegin: this.invokeIfDefined(onDrawStart),
      onEnd: this.invokeIfDefined(onDraw),
      ...transformPenSizeToWidths(penWidth),
    });

    setSignaturePadContext({
      clear: () => {
        this.signaturePad.clear();
        this.setState(clearA11yValue);
      },
    });

    if (disabled) {
      this.signaturePad.off();
    }

    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    this.canvasEl.width = this.canvasEl.offsetWidth * ratio;
    this.canvasEl.height = this.canvasEl.offsetHeight * ratio;
    const ctx = this.canvasEl.getContext('2d');

    ctx.scale(ratio, ratio);
  };

  updateContextInputId = () => {
    const { setInputId } = this.props;
    const id = `signature-input-a11y-input-${generateID()}`;
    setInputId(id);
  };

  invokeOnInitCallback = () => {
    const { onInit } = this.props;

    this.invokeIfDefined(onInit)({
      clear: () => {
        this.signaturePad.clear();
        this.setState(clearA11yValue);
      },
      toDataURL: (format?: string, encoderOptions?: number) => {
        return this.signaturePad.toDataURL(format, encoderOptions);
      },
      isEmpty: () => {
        return this.signaturePad.isEmpty() && this.isA11yInputEmpty();
      },
      focus: () => {
        this.a11yInputEl.focus();
      },
      blur: () => {
        this.a11yInputEl.blur();
      },
    });
  };

  componentWillUnmount() {
    const { setInputId } = this.props;
    setInputId(undefined);

    this.signaturePad.off();
  }

  componentDidUpdate(prevProps: SigningPadProps) {
    const {
      penWidth: prevPenWidth,
      penColor: prevPenColor,
      disabled: prevDisabled,
    } = prevProps;
    const { penWidth, penColor, disabled } = this.props;

    if (prevPenWidth !== penWidth) {
      const { minWidth, maxWidth } = transformPenSizeToWidths(penWidth);
      this.signaturePad.minWidth = minWidth;
      this.signaturePad.maxWidth = maxWidth;
    }

    if (prevPenColor !== penColor) {
      this.signaturePad.penColor = calculatePenColor(penColor);
    }

    if (prevDisabled && !disabled) {
      this.signaturePad.on();
    } else if (!prevDisabled && disabled) {
      this.signaturePad.off();
    }
  }

  setCanvasRef = (canvas: HTMLCanvasElement) => {
    const { canvasRef } = this.props;
    this.canvasEl = canvas;
    this.invokeIfDefined(canvasRef)(canvas);
  };

  handleInputChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { onDraw } = this.props;

    // clears drawns curves and typed characters and restore drawn curves
    if (!this.signaturePad.isEmpty() || !this.isA11yInputEmpty()) {
      const drawnData = this.signaturePad.toData();
      this.signaturePad.clear();
      this.signaturePad.fromData(drawnData);
    }

    this.setState(updateA11yValue(e.target.value));
    const ctx = this.canvasEl.getContext('2d');
    ctx.font = '25px Sacramento';
    ctx.fillText(e.target.value, 20, this.canvasEl.offsetHeight / 2);
    this.invokeIfDefined(onDraw)(e);
  };

  isA11yInputEmpty = () => !this.state.a11yInputValue;

  invokeIfDefined = <T extends unknown>(fn?: (e: T) => void) => (e: T) => {
    fn && fn(e);
  };

  render() {
    const {
      setSignaturePadContext,
      setSignatureTitleId,
      setInputId,
      padApi,
      titleId,
      inputId,
      penColor,
      penWidth,
      canvasRef,
      disabled,
      required,
      onInit,
      onDraw,
      onFocus,
      onBlur,
      onClick,
      ...rest
    } = this.props;

    const { a11yInputValue } = this.state;

    return (
      <React.Fragment>
        <input
          id={inputId}
          value={a11yInputValue}
          onChange={this.handleInputChange}
          className={classes.visuallyHidden}
          data-hook={DataHooks.a11yInput}
          disabled={!!disabled}
          aria-required={!!required}
          onFocus={this.invokeIfDefined(onFocus)}
          onBlur={this.invokeIfDefined(onBlur)}
          ref={inputRef => (this.a11yInputEl = inputRef)}
          {...(titleId && { 'aria-labelledby': titleId })}
        />
        <canvas
          ref={this.setCanvasRef}
          aria-hidden
          {...rest}
          onClick={this.invokeIfDefined(!disabled && onClick)}
        />
      </React.Fragment>
    );
  }
}

export const SigningPad = withSignatureInputContext(SigningPadComp);
