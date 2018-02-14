import * as React from 'react';
import {createHOC} from '../../createHOC';
import * as classNames from 'classnames';

export interface SliderProps {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (any) => void;
  classes?: any;
  vertical?: boolean;
  handleSize?: number;
  step?: any;
}

interface SliderState {
  dragging: boolean;
  mouseDown: boolean;
  thumbHover: boolean;
  step: number;
}

class Slider extends React.PureComponent<SliderProps, SliderState> {
  inner: HTMLDivElement;
  track: HTMLDivElement;
  ContinuousStep = 0.1;

  static defaultProps = {
    mouseDown: false, //we need both mouseDown and dragging, because just clicking the track shouldn't toggle the tooltip
    dragging: false,
    thumbHover: false
  };

  constructor(props) {
    super(props);

    this.state = {
      step: props.step || this.ContinuousStep,
      dragging: false,
      mouseDown: false,
      thumbHover: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.step !== this.props.step) {
      this.setState({
        step: nextProps.step || this.ContinuousStep
      }, () => this.forceUpdate());
    }
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
    return this.props.vertical ? rect.width : rect.height;
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

  handleMouseMove = ev => {
    if (this.state.mouseDown && !this.state.dragging) {
      this.setState({dragging: true});
    }

    if (this.state.dragging) {
      this.handleTrackClick(ev);
    }
  }

  handleChange(value) {
    this.props.onChange(value);
  }

  handleThumbEnter = () => {
    this.setState({thumbHover: true});
  }

  handleThumbLeave = () => {
    this.setState({thumbHover: false});
  }

  clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  handleTrackClick = (ev) => {
    const {min, max, vertical} = this.props;
    const step = this.state.step;
    const handleSize = this.getHandleSize();
    const totalSteps = Math.ceil((max - min) / step);
    const rect = this.track.getBoundingClientRect();

    let value, pxStep, sliderPos;

    if (vertical) {
      sliderPos = rect.bottom - (ev.clientY + handleSize / 2);
      pxStep = (rect.height - handleSize) / totalSteps;
    } else {
      sliderPos = ev.clientX - (rect.left + handleSize / 2);
      pxStep = (rect.width - handleSize) / totalSteps;
    }

    value = min + step * Math.round(sliderPos / pxStep);

    value = this.clamp(value, min, max);

    this.handleChange(value);
  }

  shouldShowTooltip() {
    // return true;
    return this.state.dragging || this.state.thumbHover;
  }

  calcHandleProgressPosition() {
    const handleSize = this.getHandleSize();
    const {value, min, max} = this.props;
    const pct = (value - min) / (max - min);
    return `calc(${pct} * calc(100% - ${handleSize}px))`;
  }

  calcHighlightedTrackPosition() {
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

    return {left: progressVal, top: 0};
  }

  renderTooltip() {
    if (!this.shouldShowTooltip()) {
      return null;
    }

    const handlePos = this.calcHandlePosition();
    const handleSize = this.getHandleSize();

    return (
      <div data-hook="tooltip" className={this.props.classes.tooltip}>
        {this.props.value}
      </div>
    );
  }

  render() {
    const {classes, value, min, max, vertical} = this.props;
    const handleSize = this.getHandleSize();
    const step = this.state.step;
    const trackRect = this.track ? this.track.getBoundingClientRect() : {height: 0, width: 0};
    const handlePosition: any = this.calcHandlePosition();
    const showTicks = !!this.props.step;
    const highlightedTrackPosition = vertical ? {
        bottom: 0,
        height: this.calcHighlightedTrackPosition()
    } : {
        width: this.calcHighlightedTrackPosition()
    };

    return (
      <div className={classNames(classes.root, {
        [classes.vertical]: vertical,
        [classes.withTicks]: showTicks
      })}
        onMouseDown={this.handleMouseDown}
        data-value={value}
        data-min={min}
        data-max={max}
        data-vertical={vertical}
        data-hook="wixui-slider"
    >
      <div ref={this.setInnerNode} className={classes.inner}>
        <div data-hook="track" ref={this.setTrackNode} className={classes.track} onClick={this.handleTrackClick}>
          <div className={classes.highlightedTrack} style={{
            ...highlightedTrackPosition
          }}/>
        </div>
        <div data-hook="thumb"
          className={classes.handle}
          onMouseEnter={this.handleThumbEnter}
          onMouseLeave={this.handleThumbLeave}
          style={{
            ...handlePosition,
            width: handleSize,
            height: handleSize
          }}
        >
          {this.renderTooltip()}
        </div>
      </div>

      {showTicks && (
        <Ticks
          classes={classes}
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

interface TicksProps {
  classes: any;
  step: number;
  min: number;
  max: number;
  handleSize: number;
  vertical: boolean;
  trackSize: number;
  onTickClick: (any) => void;
}

class Ticks extends React.PureComponent<TicksProps> {
  MaximumTicksDensity = 0.25;

  calcStep() {
    const {step, min, max, trackSize} = this.props;
    const totalTickCount = (max - min) / Number(step);
    const density = Math.min(totalTickCount / trackSize, this.MaximumTicksDensity);
    const adjustedStep = (max - min) / (trackSize * density);
    return adjustedStep;
  }

  render() {
    const {min, max, handleSize, vertical, trackSize, classes} = this.props;

    if (!trackSize) {
      return null;
    }

    const step = this.calcStep();

    const ticks = [];

    for (let i = min; i <= max; i += step) {
      const pct = (i - min) / (max - min);
      const val = `calc(${pct} * calc(100% - ${handleSize}px) + ${handleSize / 2}px)`;

      const tick = React.createElement('div', {
        className: classes.tick,
        key: i,
        'data-hook': 'tick',
        onClick: this.props.onTickClick,
        style: Object.assign({}, vertical ? {
          top: val,
          height: 1,
          width: '25%',
          right: 0
        } : {
          left: val,
          height: '25%',
          width: 1,
          bottom: 0
        })
      });

      ticks.push(tick);
    }

    return (
      <div data-hook="ticks-wrapper">
        {ticks}
      </div>
    );
  }
}

export default createHOC(Slider);
