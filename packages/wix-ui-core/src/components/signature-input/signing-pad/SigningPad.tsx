import * as React from 'react';
import SignaturePad, { IOptions } from 'signature_pad';
import {
  withSignatureInputContext,
  WithSignaturePadProps,
} from '../SignatureInputContext';
import * as PropTypes from 'prop-types';

export interface SigningPadProps
  extends WithSignaturePadProps,
    React.CanvasHTMLAttributes<HTMLCanvasElement> {
  'data-hook'?: string;
  penColor?: IOptions['penColor'];
  penWidth?: string;
  onInit?(padAPI: Pick<SignaturePad, 'clear' | 'toDataURL'>): void;
  canvasRef?(instance: HTMLCanvasElement): void;
}

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
    /* Callback to get an instance of the canvas HTML element instance */
    canvasRef: PropTypes.func,
  };

  private canvasEl: HTMLCanvasElement = undefined;
  private signaturePad: SignaturePad = undefined;

  componentDidMount() {
    const { setSignaturePadContext, penColor, penWidth, onInit } = this.props;
    this.signaturePad = new SignaturePad(this.canvasEl, {
      penColor: calculatePenColor(penColor),
      ...transformPenSizeToWidths(penWidth),
    });

    setSignaturePadContext(this.signaturePad);

    onInit &&
      onInit({
        clear: this.signaturePad.clear.bind(this.signaturePad),
        toDataURL: this.signaturePad.toDataURL.bind(this.signaturePad),
      });
  }

  componentWillUnmount() {
    this.signaturePad.off();
  }

  componentDidUpdate(prevProps: SigningPadProps) {
    const { penWidth: prevPenWidth, penColor: prevPenColor } = prevProps;
    const { penWidth, penColor } = this.props;

    if (prevPenWidth !== penWidth) {
      const { minWidth, maxWidth } = transformPenSizeToWidths(penWidth);
      this.signaturePad.minWidth = minWidth;
      this.signaturePad.maxWidth = maxWidth;
    }
    if (prevPenColor !== penColor) {
      this.signaturePad.penColor = calculatePenColor(penColor);
    }
  }

  setCanvasRef = (canvas: HTMLCanvasElement) => {
    const { canvasRef } = this.props;
    this.canvasEl = canvas;
    canvasRef && canvasRef(canvas);
  };

  render() {
    const {
      setSignaturePadContext,
      pad,
      penColor,
      penWidth,
      onInit,
      canvasRef,
      ...rest
    } = this.props;
    return <canvas ref={this.setCanvasRef} {...rest}></canvas>;
  }
}

export const SigningPad = withSignatureInputContext(SigningPadComp);
