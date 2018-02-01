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

class Slider extends React.PureComponent<SliderProps> {
  static defaultProps = {
    step: 'any'
  };

  handleChange(ev) {
    this.props.onChange(ev);
  }

  handleInput(ev) {
    this.props.onChange(ev);
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

  renderTicks() {
    if (this.props.step === 'any') {
      return null;
    }

    const step = Number(this.props.step);
    const ticks = [];

    for (let i = this.props.min; i <= this.props.max; i += step) {
      const pct = (i - this.props.min) / (this.props.max - this.props.min);
      const handleSize = this.getHandleSize();
      const val = `calc(${pct} * calc(100% - ${handleSize}px) + ${handleSize / 2}px)`;

      const tick = React.createElement('div', {
        style: Object.assign({}, {
          display: 'inline-block',
          position: 'absolute',
          background: '#000',
        }, this.props.vertical ? {
          top: val,
          height: 1,
          width: 6
        } : {
          left: val,
          height: 6,
          width: 1
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
    const {classes, vertical, handleSize} = this.props;

    return (
      <div data-hook="wixui-slider" className={classNames(classes.root, {
        [classes.vertical]: vertical
      })}
        style={{width: '100%', height: '100%'}}>
        <input
          type="range"
          className={classes.slider}
          step={this.props.step}
          value={this.props.value}
          min={this.props.min}
          max={this.props.max}
          onChange={this.props.onChange}
          onInput={this.props.onInput}
        />
        <div className={classes.handleWrapper}>
          <div data-hook="sliderThumb"
            className={classes.handle}
            style={{
              ...this.calcHandlePosition(),
              width: handleSize,
              height: handleSize
            }}
          />
          {this.renderTicks()}
          {this.renderTooltip()}
        </div>
      </div>
    );
  }
}

export default createHOC(Slider);
