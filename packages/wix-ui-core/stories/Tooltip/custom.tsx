import * as React from 'react';
import {Tooltip} from '../../src/components/Tooltip';

function createTooltip(direction, moved) {
  return <Tooltip data-hook={`story-tooltip-${direction}${moved ? '-moved' : ''}`}
                  placement={direction} moveBy={moved ? {x: 10, y: 10} : {x: 0, y: 0}}
                  content={<span>This is my tooltip</span>}>
          <span>
            Hover me for a tooltip!
          </span>
  </Tooltip>;
}

const tooltipDemo: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

export class TooltipStory extends React.PureComponent {
  render() {
    return (
      <div style={tooltipDemo}>
        <h3>Moved</h3>
        {createTooltip('right', true)}
        <h3>Not moved</h3>
        {createTooltip('right', false)}
      </div>
    );
  }
}
