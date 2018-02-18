import * as React from 'react';

export interface TicksProps {
  classes: any;
  step: number;
  min: number;
  max: number;
  handleSize: number;
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
