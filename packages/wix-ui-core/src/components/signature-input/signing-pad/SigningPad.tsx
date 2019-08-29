import * as React from 'react';
import SignaturePad, { IOptions } from 'signature_pad';
import {
  withSignatureInputContext,
  WithSignaturePadProps,
} from '../SignatureInputContext';
import * as PropTypes from 'prop-types';

export type SignaturePadApi = Pick<
  SignaturePad,
  'clear' | 'toDataURL' | 'isEmpty'
>;

export interface SigningPadOwnProps
  extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  'data-hook'?: string;
  penColor?: IOptions['penColor'];
  penWidth?: string;
  disabled?: boolean;
  required?: boolean;
  canvasRef?(instance: HTMLCanvasElement): void;
  onInit?(padAPI: SignaturePadApi): void;
  onDraw?(e: MouseEvent | React.Touch): void;
}

export interface SigningPadProps
  extends SigningPadOwnProps,
    WithSignaturePadProps {}

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

class SigningPadComp extends React.Component<SigningPadProps> {
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
  };

  private canvasEl: HTMLCanvasElement = undefined;
  private signaturePad: SignaturePad = undefined;

  componentDidMount() {
    const {
      setSignaturePadContext,
      penColor,
      penWidth,
      onInit,
      disabled,
    } = this.props;
    this.signaturePad = new SignaturePad(this.canvasEl, {
      penColor: calculatePenColor(penColor),
      onEnd: this.handleDraw,
      ...transformPenSizeToWidths(penWidth),
    });

    setSignaturePadContext(this.signaturePad);

    if (disabled) {
      this.signaturePad.off();
    }

    onInit &&
      onInit({
        clear: this.signaturePad.clear.bind(this.signaturePad),
        toDataURL: this.signaturePad.toDataURL.bind(this.signaturePad),
        isEmpty: this.signaturePad.isEmpty.bind(this.signaturePad),
      });
  }

  handleDraw: (e: MouseEvent | React.Touch) => void = e => {
    const { onDraw } = this.props;
    onDraw && onDraw(e);
  };

  componentWillUnmount() {
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
    canvasRef && canvasRef(canvas);
  };

  handleClick: React.MouseEventHandler<HTMLCanvasElement> = e => {
    const { disabled, onClick } = this.props;

    if (!disabled && onClick) {
      onClick(e);
    }
  };

  render() {
    const {
      setSignaturePadContext,
      setSignatureTitleId,
      pad,
      titleId,
      penColor,
      penWidth,
      onInit,
      canvasRef,
      disabled,
      required,
      ...rest
    } = this.props;

    const a11yProps: React.HTMLAttributes<HTMLCanvasElement> = {
      'aria-disabled': !!disabled,
      'aria-required': !!required,
      ...(titleId && { 'aria-labelledby': titleId }),
    };

    return (
      <canvas
        ref={this.setCanvasRef}
        {...a11yProps}
        {...rest}
        onClick={this.handleClick}
      ></canvas>
    );
  }
}

export const SigningPad = withSignatureInputContext(SigningPadComp);
