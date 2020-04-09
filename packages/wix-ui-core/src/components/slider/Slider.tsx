import * as React from 'react';
import { Ticks } from './Ticks';
import { Thumb, getThumbSize } from './Thumb';
import { style, classes } from './Slider.st.css';

const noop = () => {};

export interface SliderProps {
  min?: number;
  max?: number;
  value?: number;
  onChange?(x: any): void;
  onBlur?(): void;
  onFocus?(): void;
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
  'aria-label': string;
}

export interface Style {
  width?: number;
  height?: number;
}

export interface SliderState {
  dragging: boolean;
  mouseDown: boolean;
  thumbHover: boolean;
  inKeyPress: boolean;
}

const CONTINUOUS_STEP = 0.01;

export class Slider extends React.PureComponent<SliderProps, SliderState> {
  static displayName = 'Slider';

  root: HTMLDivElement;
  track: HTMLDivElement;

  static defaultProps: Partial<SliderProps> = {
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
      height: 0,
    },
  };

  state = {
    dragging: false,
    mouseDown: false,
    thumbHover: false,
    inKeyPress: false,
  };

  componentDidMount() {
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('touchend', this.handleMouseUp);
    document.addEventListener('touchmove', this.handleMouseMove, {
      passive: false,
    });
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('touchend', this.handleMouseUp);
    document.removeEventListener('touchmove', this.handleMouseMove);
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

  getStepValue() {
    const { min, max, step, stepType } = this.props;

    if (step > 0) {
      return this.calcDiscreteStepValue(min, max, step, stepType);
    }

    return CONTINUOUS_STEP;
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
    const { width, height } = this.props.style;
    const isVertical = this.isVertical();
    const val = isVertical ? width : height;
    return Math.min(val, Math.min(width, height));
  }

  getSliderLength() {
    return this.isVertical() ? this.props.style.height : this.props.style.width;
  }

  getThumbSize() {
    const size = getThumbSize(
      this.props.thumbShape,
      this.getSliderSize(),
      this.isVertical(),
    );
    const offsets = this.getInnerOffsets();
    const offset = offsets.offsetHeight || offsets.offsetWidth || 0;
    return {
      width: size.width - offset,
      height: size.height - offset,
    };
  }

  getThumbSizeMainAxis() {
    const size = this.getThumbSize();
    return this.isVertical() ? size.height : size.width;
  }

  getThumbSizeCrossAxis() {
    const size = this.getThumbSize();
    return this.isVertical() ? size.width : size.height;
  }

  setTrackNode = track => {
    this.track = track;
  };

  handleBlur = () => {
    this.setState({ inKeyPress: false });
    this.props.onBlur();
  };

  handleMouseDown = () => {
    this.setState({ mouseDown: true });
  };

  handleMouseUp = () => {
    this.setState({ mouseDown: false, dragging: false });
  };

  handleKeyDown = ev => {
    const { min, max, value, disabled, readOnly, dir } = this.props;
    const ltr = dir === 'ltr';

    if (disabled || readOnly) {
      return;
    }

    const step = this.getStepValue();

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
        inKeyPress: true,
      });
      ev.preventDefault();
    }
  };

  handleMouseMove = ev => {
    if (this.state.mouseDown && !this.state.dragging) {
      this.setState({ dragging: true });
    }

    if (this.state.dragging) {
      this.moveThumbByMouse(ev);
    }
  };

  handleChange(value) {
    value = this.floorValue(
      this.clamp(value, this.props.min, this.props.max),
      2,
    );

    if (value !== this.props.value) {
      this.props.onChange(value);
    }
  }

  handleThumbEnter = () => {
    this.setState({ thumbHover: true });
  };

  handleThumbLeave = () => {
    this.setState({ thumbHover: false });
  };

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

    const { min, max, disabled, readOnly } = this.props;
    const rtl = this.isRtl();

    if (disabled || readOnly) {
      return;
    }

    const isVertical = this.isVertical();
    const step = this.getStepValue();
    const thumbSize = this.getThumbSizeMainAxis();
    const totalSteps = Math.ceil((max - min) / step);
    const rect = this.track.getBoundingClientRect();

    let value, pxStep, sliderPos;

    if (isVertical) {
      sliderPos = rect.bottom - (ev.clientY + thumbSize / 2);
      pxStep = (rect.height - thumbSize) / totalSteps;
    } else {
      if (rtl) {
        sliderPos = rect.left + rect.width - thumbSize / 2 - ev.clientX;
      } else {
        sliderPos = ev.clientX - (rect.left + thumbSize / 2);
      }

      pxStep = (rect.width - thumbSize) / totalSteps;
    }

    value = min + step * Math.round(sliderPos / pxStep);

    this.handleChange(value);
  };

  shouldShowTooltip() {
    switch (this.props.tooltipVisibility) {
      case 'always':
        return true;
      case 'none':
        return false;
      default:
      case 'hover':
        return (
          this.state.dragging || this.state.thumbHover || this.state.inKeyPress
        );
    }
  }

  calcThumbProgressPosition() {
    const thumbSize = this.getThumbSizeMainAxis();
    const { value, min, max } = this.props;
    const pct = (value - min) / (max - min);
    const clampedPct = this.clamp(pct, 0, 1);
    return `calc(${clampedPct} *(100% - ${thumbSize}px))`;
  }

  calcTrackFillPosition() {
    const thumbSize = this.getThumbSizeMainAxis();
    const { value, min, max } = this.props;
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

    if (this.isVertical()) {
      return { bottom: progressVal, left: 0 };
    }

    return { [this.getStartPos()]: progressVal, top: 0 };
  }

  floorValue(value, precision = 1) {
    const clampedValue =
      Math.floor(Math.pow(10, precision) * value) / Math.pow(10, precision);
    return clampedValue;
  }

  renderTooltip() {
    if (!this.shouldShowTooltip()) {
      return null;
    }

    const { tooltipPosition } = this.props;
    const positionClassname = tooltipPosition + 'Position';
    const clampedValue = this.floorValue(this.props.value);

    return (
      <div
        data-hook="tooltip"
        className={style(classes.tooltip, { [positionClassname]: true })}
      >
        {this.props.tooltipPrefix}
        {clampedValue}
        {this.props.tooltipSuffix}
      </div>
    );
  }

  ticksShown() {
    return !this.isContinuous() && this.props.tickMarksShape !== 'none';
  }

  getInnerOffsets() {
    const showTicks = this.ticksShown();

    if (!showTicks) {
      return {};
    }

    const isHorizontal = !this.isVertical();
    const tickSize = this.props.tickMarksShape === 'line' ? 10 : 3;
    const tickMarksPos = this.props.tickMarksPosition;
    const tickMarksGap = 12;
    let offsetHeight, offsetTop;

    if (tickMarksPos === 'normal') {
      offsetHeight = tickSize + tickMarksGap;
    } else if (tickMarksPos === 'across') {
      offsetTop = tickSize + tickMarksGap;
      offsetHeight = tickSize + tickMarksGap;
    }

    if (isHorizontal) {
      return { offsetHeight, offsetTop };
    }
    return { offsetWidth: offsetHeight, offsetLeft: offsetTop };
  }

  getInnerDims() {
    const offsets = this.getInnerOffsets();
    const style: any = {};

    if (offsets.offsetTop) {
      style.top = offsets.offsetTop;
    }
    if (offsets.offsetLeft) {
      style.left = offsets.offsetLeft;
    }
    if (offsets.offsetHeight) {
      style.height = `calc(100% - ${offsets.offsetHeight}px)`;
    }
    if (offsets.offsetWidth) {
      style.width = `calc(100% - ${offsets.offsetWidth}px)`;
    }

    return style;
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
      orientation,
      style: inlineStyle,
    } = this.props;

    const vertical = this.isVertical();
    const thumbSize = this.getThumbSize();
    const crossThumbSize = this.getThumbSizeCrossAxis();
    const mainThumbSize = this.getThumbSizeMainAxis();
    const showTicks = this.ticksShown();
    const step = this.getStepValue();
    const thumbPosition: any = this.calcThumbPosition();
    const trackStyle = vertical
      ? { width: `${trackSize}%` }
      : { height: `${trackSize}%` };
    const trackFillPosition = vertical
      ? {
          bottom: 0,
          height: this.calcTrackFillPosition(),
        }
      : {
          width: this.calcTrackFillPosition(),
        };

    return (
      <div
        className={style(classes.root, {
          orientation: vertical ? 'vertical' : 'horizontal',
          dir,
          tickMarksPosition,
          tickMarksShape,
          disabled,
        })}
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
        style={inlineStyle}
        ref={root => (this.root = root)}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label={this.props['aria-label']}
      >
        <div className={classes.inner} style={this.getInnerDims()}>
          <div
            data-hook="track"
            ref={this.setTrackNode}
            className={classes.track}
            onClick={this.moveThumbByMouse}
            style={trackStyle}
          >
            <div className={classes.trackFill} style={trackFillPosition} />
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
            step={step}
            min={min}
            max={max}
            thumbSize={mainThumbSize}
            vertical={vertical}
            trackSize={
              vertical
                ? this.props.style.height - mainThumbSize
                : this.props.style.width - crossThumbSize
            }
            tickMarksShape={tickMarksShape}
            onTickClick={this.moveThumbByMouse}
          />
        )}
      </div>
    );
  }
}
