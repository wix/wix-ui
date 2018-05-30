import * as React from 'react';
import {number, func, oneOf, bool, string, object} from 'prop-types';
import {Ticks} from './Ticks';
import {Thumb, getThumbSize} from './Thumb';
import pStyle from './Slider.st.css';
const omit = require('lodash/omit');
const noop = require('lodash/noop')

export interface SliderProps {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (x: any) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  orientation?: 'horizontal' | 'vertical';
  step?: number;
  stepType?: 'value' | 'count';
  tooltipPosition?: 'normal' | 'across';
  tooltipVisibility?: 'none' | 'always' | 'hover';
  tickMarksPosition?: 'normal' | 'middle' | 'across';
  tickMarksShape?: 'none' | 'line' | 'dot';
  tooltipPrefix?: string;
  tooltipSuffix?: string;
  trackSize?: number;
  thumbShape?: 'circle' | 'square' | 'rectangle' | 'bar';
  disabled?: boolean;
  readOnly?: boolean;
  dir?: string;
  style?: Style;
}

export interface Style {
  width?: number;
  height?: number;
}

export interface Rect {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  width?: number;
  height?: number;
}

export interface SliderState {
  dragging: boolean;
  mouseDown: boolean;
  thumbHover: boolean;
  inKeyPress: boolean;
  step: number;
  innerRect: Rect;
  trackRect: Rect;
}

export class Slider extends React.PureComponent<SliderProps, SliderState> {
  root: HTMLDivElement;
  inner: HTMLDivElement;
  track: HTMLDivElement;
  ContinuousStep = 0.1;

  static propTypes: Object = {
    /** The minimum value of the slider */
    min: number,
    /** The maximum value of the slider */
    max: number,
    /** The current value of the slider */
    value: number,
    /** Callback for handling value changes */
    onChange: func,
    /** Callback for handling focus events */
    onFocus: func,
    /** Callback for handling blur events */
    onBlur: func,
    /** Whether the slider has a horizontal or a vertical layout */
    orientation: oneOf(['horizontal', 'vertical']),
    /** If stepType = 'value', 'step' determines the value of each slider step. If stepType = 'count', 'step' determines the total number of jumps */
    step: number,
    /** If stepType = 'value', 'step' determines the value of each slider step. If stepType = 'count', 'step' determines the total number of jumps */
    stepType: oneOf(['value', 'count']),
    /** Determines the tooltip position */
    tooltipPosition: oneOf(['normal', 'across']),
    /** Determines what triggers the tooltip pop */
    tooltipVisibility: oneOf(['none', 'always', 'hover']),
    /** Determines the tick marks position */
    tickMarksPosition: oneOf(['normal', 'middle', 'across']),
    /** A prefix for the value inside the tooltip */
    tooltipPrefix: string,
    /** A suffix for the value inside the tooltip */
    tooltipSuffix: string,
    /** The track size as a percentage of the bounding box height */
    trackSize: number,
    /** The shape of the thumb */
    thumbShape: oneOf(['circle', 'square', 'rectangle', 'bar']),
    /** The shape of the tick marks */
    tickMarksShape: oneOf(['none', 'line', 'dot']),
    /** Determines whether the slider is disabled or not */
    disabled: bool,
    /** Determines whether the slider is in read-only mode or not (disabled is temporary, readOnly is permanent) */
    readOnly: bool,
    /** Determines whether values go from right to left in a horizontal position */
    dir: oneOf(['rtl', 'ltr']),
  };

  static defaultProps = {
    min: 0,
    max: 10,
    value: 5,
    stepType: 'value',
    thumbShape: 'circle',
    orientation: 'horizontal',
    disabled: false,
    readOnly: false,
    tooltipVisibility: 'hover',
    tooltipPosition: 'normal',
    tooltipPrefix: '',
    tooltipSuffix: '',
    tickMarksPosition: 'normal',
    tickMarksShape: 'line',
    dir: 'ltr',
    onFocus: noop,
    onBlur: noop,
    style: {
      width: 0,
      height: 0
    }
  };

  constructor(props) {
    super(props);

    const {width, height} = this.props.style;

    this.state = {
      step: 1,
      dragging: false,
      mouseDown: false,
      thumbHover: false,
      inKeyPress: false,
      trackRect: {width, height},
      innerRect: {width, height}
    };
  }

  updateLayout() {
    this.setState({
      trackRect: this.track ? this.track.getBoundingClientRect() : this.state.trackRect,
      innerRect: this.inner ? this.inner.getBoundingClientRect() : this.state.innerRect
    }, () => {
      this.setState({
        step: this.calcStepValue(this.props.min, this.props.max, this.props.step, this.props.stepType, this.getSliderLength())
      });
    });
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('touchend', this.handleMouseUp);
    document.addEventListener('touchmove', this.handleMouseMove, {passive: false});
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('touchend', this.handleMouseUp);
    document.removeEventListener('touchmove', this.handleMouseMove);
  }

  //need to force update after DOM changes, as some layouts are based upon DOM
  //measurements
  componentDidUpdate(prevProps) {
    if (!this.isShallowEqual(
      omit(prevProps, 'value', 'onChange', 'onBlur', 'onFocus'),
      omit(this.props, 'value', 'onChange', 'onBlur', 'onFocus')
    )) {
      this.updateLayout();
    }
  }

  focus() {
    this.root.focus();
    this.props.onFocus();
  }

  blur() {
    this.root.blur();
    this.props.onBlur();
  }

  getStartPos() {
    return this.props.dir === 'rtl' ? 'right' : 'left';
  }

  calcDiscreteStepValue(min, max, step, stepType) {
    if (stepType === 'count') {
      return (max - min) / step;
    }

    return step;
  }

  calcContinuousStepValue(min, max, sliderSize) {
    const stepPx = 5;
    const totalSteps = Math.floor(sliderSize / stepPx);
    const stepValue = (max - min) / totalSteps;
    return this.floorValue(stepValue, 2);
  }

  calcStepValue(min, max, step, stepType, sliderSize) {
    if (step > 0) {
      return this.calcDiscreteStepValue(min, max, step, stepType);
    }

    return this.calcContinuousStepValue(min, max, sliderSize);
  }

  isShallowEqual(v, o) {
    for (const key in v) {
      if (!(key in o) || v[key] !== o[key]) {
        return false;
      }
    }

    for (const key in o) {
      if (!(key in v) || v[key] !== o[key]) {
        return false;
      }
    }

    return true;
  }

  getSliderSize() {
    const rect = this.state.innerRect;
    const isVertical = this.isVertical();
    const val = isVertical ? rect.width : rect.height;
    return Math.min(val, Math.min(rect.width, rect.height));
  }

  getSliderLength() {
    return this.isVertical() ? this.state.trackRect.height : this.state.trackRect.width;
  }

  getThumbSize() {
    return getThumbSize(this.props.thumbShape, this.getSliderSize(), this.isVertical());
  }

  getThumbSizeMainAxis() {
    const size = this.getThumbSize();
    return this.isVertical() ? size.height : size.width;
  }

  getThumbSizeCrossAxis() {
    const size = this.getThumbSize();
    return this.isVertical() ? size.width : size.height;
  }

  setInnerNode = inner => {
    this.inner = inner;
    this.updateLayout();
  }

  setTrackNode = track => {
    this.track = track;
    this.updateLayout();
  }

  handleBlur = () => {
    this.setState({inKeyPress: false});
    this.props.onBlur();
  }

  handleMouseDown = () => {
    this.setState({mouseDown: true});
  }

  handleMouseUp = () => {
    this.setState({mouseDown: false, dragging: false});
  }

  handleKeyDown = ev => {
    const {min, max, value, disabled, readOnly, dir} = this.props;
    const ltr = dir === 'ltr';

    if (disabled || readOnly) {
      return;
    }

    const {step} = this.state;

    let nextValue;

    switch (ev.key) {
      case 'ArrowDown':
        nextValue = value - step;
        break;
      case 'ArrowLeft':
        if (ltr) {
          nextValue = value - step;
        } else {
          nextValue = value + step;
        }
        break;
      case 'ArrowUp':
        nextValue = value + step;
        break;
      case 'ArrowRight':
        if (ltr) {
          nextValue = value + step;
        } else {
          nextValue = value - step;
        }
        break;
      case 'PageDown':
        nextValue = value - 0.1 * (max - min);
        break;
      case 'PageUp':
        nextValue = value + 0.1 * (max - min);
        break;
      case 'Home':
        nextValue = min;
        break;
      case 'End':
        nextValue = max;
        break;
      default:
        nextValue = undefined;
    }

    if (typeof nextValue !== 'undefined') {
      this.handleChange(nextValue);
      this.setState({
        inKeyPress: true
      });
      ev.preventDefault();
    }
  }

  handleMouseMove = ev => {
    if (this.state.mouseDown && !this.state.dragging) {
      this.setState({dragging: true});
    }

    if (this.state.dragging) {
      this.moveThumbByMouse(ev);
    }
  }

  handleChange(value) {
    value = this.floorValue(this.clamp(value, this.props.min, this.props.max), 2);

    if (value !== this.props.value) {
      this.props.onChange(value);
    }
  }

  handleThumbEnter = () => {
    this.setState({thumbHover: true});
    this.updateLayout();
  }

  handleThumbLeave = () => {
    this.setState({thumbHover: false});
  }

  clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  isRtl() {
    return this.props.dir === 'rtl';
  }

  isVertical() {
    return this.props.orientation === 'vertical';
  }

  isContinuous() {
    return !this.props.step;
  }

  moveThumbByMouse = ev => {
    if (ev.touches) {
      ev.preventDefault();
      ev = ev.touches[0];
    }

    const {min, max, disabled, readOnly, dir} = this.props;
    const rtl = this.isRtl();

    if (disabled || readOnly) {
      return;
    }

    const isVertical = this.isVertical();
    const step = this.state.step;
    const thumbSize = this.getThumbSizeMainAxis();
    const totalSteps = Math.ceil((max - min) / step);
    const rect = this.state.trackRect;

    let value, pxStep, sliderPos;

    if (isVertical) {
      sliderPos = rect.bottom - (ev.clientY + thumbSize / 2);
      pxStep = (rect.height - thumbSize) / totalSteps;
    } else {
      if (rtl) {
        sliderPos = (rect.left + rect.width - thumbSize / 2) - ev.clientX;
      } else {
        sliderPos = ev.clientX - (rect.left + thumbSize / 2);
      }

      pxStep = (rect.width - thumbSize) / totalSteps;
    }

    value = min + step * Math.round(sliderPos / pxStep);

    this.handleChange(value);
  }

  shouldShowTooltip() {
    switch (this.props.tooltipVisibility) {
        case 'always':
          return true;
        case 'none':
          return false;
        default:
        case 'hover':
          return this.state.dragging || this.state.thumbHover || this.state.inKeyPress;
    }
  }

  calcThumbProgressPosition() {
    const thumbSize = this.getThumbSizeMainAxis();
    const {value, min, max} = this.props;
    const pct = (value - min) / (max - min);
    const clampedPct = this.clamp(pct, 0, 1);
    return `calc(${clampedPct} *(100% - ${thumbSize}px))`;
  }

  calcTrackFillPosition() {
    const thumbSize = this.getThumbSizeMainAxis();
    const {value, min, max} = this.props;
    const pct = (value - min) / (max - min);
    const clampedPct = this.clamp(pct, 0, 1);
    return `calc(${clampedPct} *(100% - ${thumbSize}px) + ${thumbSize}px - 2px)`;
  }

  calcThumbCrossPosition() {
    const thumbSize = this.getThumbSizeCrossAxis();
    return `calc(50% - ${thumbSize / 2}px)`;
  }

  calcThumbPosition() {
    const progressVal = this.calcThumbProgressPosition();
    const crossVal = this.calcThumbCrossPosition();

    if (this.isVertical()) {
      return {bottom: progressVal, left: 0};
    }

    return {[this.getStartPos()]: progressVal, top: 0};
  }

  floorValue(value, precision = 1) {
    const clampedValue = Math.floor(Math.pow(10, precision) * value) / Math.pow(10, precision);
    return clampedValue;
  }

  renderTooltip() {
    if (!this.shouldShowTooltip()) {
      return null;
    }

    const {tooltipPosition} = this.props;
    const positionClassname = tooltipPosition + 'Position';
    const clampedValue = this.floorValue(this.props.value);

    return (
      <div 
        data-hook="tooltip" 
        {...pStyle('tooltip', {[positionClassname]: true})}
      >
        {this.props.tooltipPrefix}{clampedValue}{this.props.tooltipSuffix}
      </div>
    );
  }

  render() {
    const {
        value,
        min,
        max,
        trackSize,
        disabled,
        dir,
        onFocus,
        tickMarksPosition,
        tickMarksShape,
        thumbShape,
        orientation
    } = this.props;

    const vertical = this.isVertical();
    const thumbSize = this.getThumbSize();
    const crossThumbSize = this.getThumbSizeCrossAxis();
    const mainThumbSize = this.getThumbSizeMainAxis();
    const step = this.state.step;
    const trackRect = this.state.trackRect;
    const thumbPosition: any = this.calcThumbPosition();
    const showTicks = !this.isContinuous() && tickMarksShape !== 'none';
    const trackStyle = vertical ? {width: trackSize + '%'} : {height: trackSize + '%'};
    const trackFillPosition = vertical ? {
        bottom: 0,
        height: this.calcTrackFillPosition()
    } : {
        width: this.calcTrackFillPosition()
    };

    return (
      <div 
        {...pStyle('root', {
          orientation: vertical ? 'vertical' : 'horizontal',
          dir,
          tickMarksPosition,
          tickMarksShape,
          disabled,
          showTicks
        }, this.props)}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleMouseDown}
        onKeyDown={this.handleKeyDown}
        onFocus={onFocus}
        onBlur={this.handleBlur}
        data-value={value}
        data-min={min}
        data-max={max}
        data-orientation={orientation}
        data-dir={dir}
        tabIndex={0}
        ref={root => this.root = root}
      >
        <div ref={this.setInnerNode} className={pStyle.inner}>
          <div 
            data-hook="track"
            ref={this.setTrackNode}
            className={pStyle.track}
            onClick={this.moveThumbByMouse}
            style={trackStyle}
          >
            <div className={pStyle.trackFill} style={trackFillPosition}/>
          </div>

          <Thumb
            shape={thumbShape}
            thumbPosition={thumbPosition}
            thumbSize={thumbSize}
            onMouseEnter={this.handleThumbEnter}
            onMouseLeave={this.handleThumbLeave}
          >
            {this.renderTooltip()}
          </Thumb>
        </div>

        {showTicks && (
          <Ticks
            pStyle={pStyle}
            step={step}
            min={min}
            max={max}
            thumbSize={mainThumbSize}
            vertical={vertical}
            trackSize={vertical ? trackRect.height - mainThumbSize : trackRect.width - crossThumbSize}
            tickMarksShape={tickMarksShape}
            onTickClick={this.moveThumbByMouse}
          />)}
      </div>
    );
  }
}
