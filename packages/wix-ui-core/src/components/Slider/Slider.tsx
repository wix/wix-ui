import * as React from 'react';
import {createHOC} from '../../createHOC';
import {Ticks} from './Ticks';
import {Thumb} from './Thumb';
import pStyle from './Slider.st.css';

export interface SliderProps {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (any) => void;
  vertical?: boolean;
  handleSize?: number;
  step?: any; //if stepType == value, step determines the value of a single jump. if stepType == count, step determines the total number of jumps
  stepType?: string; //value, count
  tooltipPosition?: string; //default, across
  tooltipVisibility?: string; //none, always, hover
  tooltipPrefix?: string;
  tooltipSuffix?: string;
  trackSize?: number;
  width?: number;
  height?: number;
  thumbShape?: string;
  className?: string;
  previewState?: string;
  disabled?: boolean;
  tickMarksPosition?: string; //default, middle, across
  rtl?: boolean;
}

export interface SliderState {
  dragging: boolean;
  mouseDown: boolean;
  thumbHover: boolean;
  step: number;
}

export class Slider extends React.PureComponent<SliderProps, SliderState> {
  inner: HTMLDivElement;
  track: HTMLDivElement;
  ContinuousStep = 0.1;

  static defaultProps = {
    stepType: 'value',
    mouseDown: false, //we need both mouseDown and dragging, because just clicking the track shouldn't toggle the tooltip
    dragging: false,
    thumbHover: false,
    thumbShape: 'circle',
    disabled: false,
    tooltipVisibility: 'hover',
    tooltipPosition: 'default',
    tooltipPrefix: '',
    tooltipSuffix: '',
    tickMarksPosition: 'default',
    rtl: false
  };

  constructor(props) {
    super(props);

    this.state = {
      step: this.calcStepValue(props.min, props.max, props.stepType, props.step),
      dragging: false,
      mouseDown: false,
      thumbHover: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      step: this.calcStepValue(nextProps.min, nextProps.max, nextProps.stepType,
        nextProps.step)
    });
  }

  //need to force update after DOM changes, as some layouts are based upon DOM
  //measurements
  componentDidUpdate(prevProps, prevState) {
    if (this.hasSomePropsChanged(prevProps, this.props, [
      'vertical', 'step', 'width', 'height', 'tickMarksPosition'
    ])) {
      this.forceUpdate();
    }
  }

  getStartPos() {
    return this.props.rtl ? 'right' : 'left';
  }

  calcStepValue(min, max, stepType, step) {
    step = step || this.ContinuousStep;

    if (stepType === 'count') {
      return (max - min) / step;
    }

    return step;
  }

  hasSomePropsChanged(prevProps, currProps, propsList) {
    for (let i = 0; i < propsList.length; i++) {
      let p = propsList[i];

      if (prevProps[p] !== currProps[p]) {
        return true;
      }
    }

    return false;
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  getHandleSize() {
    const rect = this.inner ? this.inner.getBoundingClientRect() : {width: 0, height: 0};
    return Math.min(rect.width, rect.height);
  }

  setInnerNode = (inner) => {
    !this.inner && this.forceUpdate();
    this.inner = inner;
  }

  setTrackNode = (track) => {
    !this.track && this.forceUpdate();
    this.track = track;
  }

  handleMouseDown = () => {
    this.setState({mouseDown: true});
  }

  handleMouseUp = () => {
    this.setState({mouseDown: false, dragging: false});
  }

  handleKeyDown = (ev) => {
    const {min, max, value, disabled, rtl} = this.props;
    const ltr = !rtl;

    if (disabled) {
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
      ev.preventDefault();
    }
  }

  handleMouseMove = ev => {
    if (this.state.mouseDown && !this.state.dragging) {
      this.setState({dragging: true});
    }

    if (this.state.dragging) {
      this.handleTrackClick(ev);
    }
  }

  handleChange(value) {
    value = this.clamp(value, this.props.min, this.props.max);

    if (value !== this.props.value) {
      this.props.onChange(value);
    }
  }

  handleThumbEnter = () => {
    this.setState({thumbHover: true});
    this.forceUpdate();
  }

  handleThumbLeave = () => {
    this.setState({thumbHover: false});
  }

  clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  handleTrackClick = (ev) => {
    const {min, max, vertical, disabled, rtl} = this.props;

    if (disabled) {
      return;
    }

    const step = this.state.step;
    const handleSize = this.getHandleSize();
    const totalSteps = Math.ceil((max - min) / step);
    const rect = this.track.getBoundingClientRect();

    let value, pxStep, sliderPos;

    if (vertical) {
      sliderPos = rect.bottom - (ev.clientY + handleSize / 2);
      pxStep = (rect.height - handleSize) / totalSteps;
    } else {
      if (rtl) {
        sliderPos = (rect.left + rect.width - handleSize / 2) - ev.clientX;
      } else {
        sliderPos = ev.clientX - (rect.left + handleSize / 2);
      }

      pxStep = (rect.width - handleSize) / totalSteps;
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
          return this.state.dragging || this.state.thumbHover;
    }
  }

  calcHandleProgressPosition() {
    const handleSize = this.getHandleSize();
    const {value, min, max} = this.props;
    const pct = (value - min) / (max - min);
    return `calc(${pct} * calc(100% - ${handleSize}px))`;
  }

  calcTrackFillPosition() {
    const {value, min, max} = this.props;
    const pct = (value - min) / (max - min);
    return pct * 100 + '%';
  }

  calcHandleCrossPosition() {
    const handleSize = this.getHandleSize();
    return `calc(50% - ${handleSize / 2}px)`;
  }

  calcHandlePosition() {
    const progressVal = this.calcHandleProgressPosition();
    const crossVal = this.calcHandleCrossPosition();

    if (this.props.vertical) {
      return {bottom: progressVal, left: 0};
    }

    return {[this.getStartPos()]: progressVal, top: 0};
  }

  renderTooltip() {
    if (!this.shouldShowTooltip()) {
      return null;
    }

    const handlePos = this.calcHandlePosition();
    const handleSize = this.getHandleSize();
    const {tooltipPosition} = this.props;
    const positionClassname = tooltipPosition + 'Position'; //defaultPosition, acrossPosition

    return (
      <div data-hook="tooltip" {...pStyle('tooltip', {
        [positionClassname]: true
      })}>
        {this.props.tooltipPrefix}{this.props.value}{this.props.tooltipSuffix}
      </div>
    );
  }

  render() {
    const {value, min, max, vertical, trackSize, className, previewState, disabled, rtl} = this.props;
    const handleSize = this.getHandleSize();
    const step = this.state.step;
    const trackRect = this.track ? this.track.getBoundingClientRect() : {height: 0, width: 0};
    const handlePosition: any = this.calcHandlePosition();
    const showTicks = this.props.tickMarksPosition !== 'none';
    const tickMarksPosition = 'tickMarksPosition-' + this.props.tickMarksPosition;
    const trackStyle = vertical ? {width: trackSize + '%'} : {height: trackSize + '%'};
    const trackFillPosition = vertical ? {
        bottom: 0,
        height: this.calcTrackFillPosition()
    } : {
        width: this.calcTrackFillPosition()
    };

    return (
      <div {...pStyle('root', {
          vertical,
          horizontal: !vertical,
          showTicks,
          disabled,
          [tickMarksPosition]: true,
          rtl,
          ltr: !rtl
      }, this.props)}
        onMouseDown={this.handleMouseDown}
        data-value={value}
        data-min={min}
        data-max={max}
        data-vertical={vertical}
        data-dir={rtl ? 'rtl' : 'ltr'}
        data-hook="wixui-slider"
        tabIndex={0}
        onKeyDown={this.handleKeyDown}
    >
      <div ref={this.setInnerNode} className={pStyle.inner}>
        <div data-hook="track"
          ref={this.setTrackNode}
          className={pStyle.track}
          onClick={this.handleTrackClick}
          style={trackStyle}
        >
          <div className={pStyle.trackFill} style={{
            ...trackFillPosition
          }}/>
        </div>
        <Thumb
          shape={this.props.thumbShape}
          handlePosition={handlePosition}
          handleSize={handleSize}
          onMouseEnter={this.handleThumbEnter}
          onMouseLeave={this.handleThumbLeave}
          classes={pStyle}
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
          handleSize={handleSize}
          vertical={vertical}
          trackSize={vertical ? trackRect.height - handleSize : trackRect.width - handleSize}
          onTickClick={this.handleTrackClick}
        />)}
      </div>
    );
  }
}
