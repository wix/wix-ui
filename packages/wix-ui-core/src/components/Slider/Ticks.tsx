import * as React from 'react';

export interface TicksProps {
  pStyle: any;
  step: number;
  min: number;
  max: number;
  thumbSize: number;
  vertical: boolean;
  trackSize: number;
  onTickClick: (any) => void;
}

export class Ticks extends React.PureComponent<TicksProps> {
  MaximumTicksDensity = 0.25;

  calcStep() {
    const {step, min, max, trackSize} = this.props;
    const totalTickCount = (max - min) / Number(step);
    const density = Math.min(totalTickCount / trackSize, this.MaximumTicksDensity);
    const adjustedStep = (max - min) / (trackSize * density);
    return adjustedStep;
  }

  renderTick(i, min, max, vertical, thumbSize, pStyle) {
    const pct = (i - min) / (max - min);
    const val = `calc(${pct} * calc(100% - ${thumbSize}px) + ${thumbSize / 2}px)`;

    return (
      <div
        className={pStyle.tick}
        key={i}
        data-hook="tick"
        onClick={this.props.onTickClick}
        style={vertical ? {bottom: val} : {left: val}}
      />
    );
  }

  render() {
    const {min, max, thumbSize, vertical, trackSize, pStyle} = this.props;

    if (!trackSize) {
      return null;
    }

    const step = this.calcStep();

    const ticks = [];

    for (let i = min; i < max; i += step) {
      ticks.push(this.renderTick(i, min, max, vertical, thumbSize, pStyle));
    }

    ticks.push(this.renderTick(max, min, max, vertical, thumbSize, pStyle));

    return (
      <div data-hook="ticks-wrapper">
        {ticks}
      </div>
    );
  }
}
