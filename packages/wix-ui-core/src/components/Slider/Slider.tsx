import * as React from 'react';
import {createHOC} from '../../createHOC';
import * as classNames from 'classnames';

export interface SliderProps {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (any) => any;
  onInput?: () => any;
  classes?: any;
  scaleMarks?: boolean;
  vertical?: boolean;
  handleSize?: number;
  step?: any;
}

interface SliderState {
  dragging: boolean;
}

class Slider extends React.PureComponent<SliderProps, SliderState> {
  track: HTMLDivElement;

  static defaultProps = {
    step: 'any',
    dragging: false
  };

  constructor(props) {
    super(props);

    this.state = {
      dragging: false
    };
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  setTrackNode = (track) => {
    !this.track && this.forceUpdate();
    this.track = track;
  }

  handleMouseDown = () => {
    this.setState({dragging: true});
  }

  handleMouseUp = () => {
    this.setState({dragging: false});
  }

  handleMouseMove = ev => {
    if (this.state.dragging) {
      this.handleTrackClick(ev);
    }
  }

  handleChange(ev) {
    this.props.onChange(ev);
  }

  handleInput(ev) {
    this.props.onChange(ev);
  }

  handleTrackClick = (ev) => {
    const {min, max, step, vertical} = this.props;
    const totalSteps = Math.ceil((max - min) / step);
    const rect = this.track.getBoundingClientRect();
    let value;

    if (vertical) {
      const sliderY = rect.bottom - ev.clientY;
      const pxStep = rect.height / totalSteps;
      value = min + step * Math.round(sliderY / pxStep);
    } else {
      const sliderX = ev.clientX - rect.left;
      const pxStep = rect.width / totalSteps;
      value = min + step * Math.round(sliderX / pxStep);
    }

    this.handleChange({target: {value}});
  }

  getHandleSize() {
    return this.props.handleSize;
  }

  shouldShowTooltip() {
    return true;
  }

  calcHandleProgressPosition() {
    const handleSize = this.getHandleSize();
    const {value, min, max} = this.props;
    const pct = (value - min) / (max - min);
    return `calc(${pct} * calc(100% - ${handleSize}px))`;
  }

  calcHandleCrossPosition() {
    const handleSize = this.getHandleSize();
    return `calc(50% - ${handleSize / 2}px)`;
  }

  calcHandlePosition() {
    const progressVal = this.calcHandleProgressPosition();
    const crossVal = this.calcHandleCrossPosition();

    if (this.props.vertical) {
      return {bottom: progressVal, left: crossVal};
    }

    return {left: progressVal, top: crossVal};
  }

  renderTooltip() {
    if (!this.shouldShowTooltip()) {
      return null;
    }

    const handlePos = this.calcHandlePosition();
    const handleSize = this.getHandleSize();
    const margin = this.props.vertical ? {
      marginLeft: -24 - 2, //tooltip width
      marginBottom: handleSize / 2 - 9.5 //half of tooltip height
    } : {
      marginTop: -handleSize / 2 - 2,
      marginLeft: handleSize / 2 - 12 //half of tooltip width
    };

    return React.createElement('div', {
      children: this.props.value,
      className: this.props.classes.tooltipWrapper,
      style: {
        position: 'absolute',
        ...handlePos,
        ...margin
      }
    });
  }

  render() {
    const {classes, step, min, max, handleSize, vertical} = this.props;
    const trackRect = this.track ? this.track.getBoundingClientRect() : {height: 0, width: 0};

    return (
      <div data-hook="wixui-slider" className={classNames(classes.root, {
        [classes.vertical]: vertical
      })}
        style={{width: '100%', height: '100%'}}
        onMouseDown={this.handleMouseDown}
    >
      <div ref={this.setTrackNode} className={classes.track} onClick={this.handleTrackClick} />
      <div data-hook="sliderThumb"
        className={classes.handle}
        style={{
          ...this.calcHandlePosition(),
          width: handleSize,
          height: handleSize
        }}
      />
      <Ticks step={step}
        min={min}
        max={max}
        handleSize={handleSize}
        vertical={vertical}
        trackSize={vertical ? trackRect.height : trackRect.width}
      />
      {this.renderTooltip()}
      </div>
    );
  }
}

interface TicksProps {
  step: number;
  min: number;
  max: number;
  handleSize: number;
  vertical: boolean;
  trackSize: number;
}

class Ticks extends React.PureComponent<TicksProps> {
  MaximumTicksDensity = 0.1;

  render() {
    let {step, min, max, handleSize, vertical, trackSize} = this.props;

    if (!trackSize) {
      return null;
    }

    step = Number(step);
    const totalTickCount = (max - min) / step;
    const density = Math.min(totalTickCount / trackSize, this.MaximumTicksDensity);
    step = (max - min) / (trackSize * density);

    const ticks = [];

    for (let i = min; i <= max; i += step) {
      const pct = (i - min) / (max - min);
      const val = `calc(${pct} * calc(100% - ${handleSize}px) + ${handleSize / 2}px)`;

      const tick = React.createElement('div', {
        style: Object.assign({}, {
          display: 'inline-block',
          position: 'absolute',
          background: '#000',
        }, vertical ? {
          top: val,
          height: 1,
          width: 6
        } : {
          left: val,
          height: 6,
          width: 1,
          marginTop: 12
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
