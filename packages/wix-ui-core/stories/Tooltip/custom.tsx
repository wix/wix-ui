import * as React from 'react';
import {Tooltip} from '../../src/components/Tooltip';

function createTooltip(direction) {
  return <Tooltip data-hook={`story-tooltip-${direction}`} placement={direction} moveBy={{x: 10, y: 10}}
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
        {createTooltip('right')}
      </div>
    );
  }
}
