import * as React from 'react';
import {Tooltip} from '../../src/components/tooltip';

const ORDER_BEFORE = "order-before";
const ORDER_AFTER = "order-after";

function createTooltip(direction, moved) {
  return (
    <Tooltip
      data-hook={`story-tooltip-${direction}${moved ? '-moved' : ''}`}
      placement={direction}
      moveBy={moved ? {x: 10, y: 10} : {x: 0, y: 0}}
      content={<span>This is my tooltip</span>}
    >
      <span>Hover me for a tooltip!</span>
    </Tooltip>
  );
}

function createTooltipToTestZindex(order) {
  return (
    <div style={{zIndex: 2000, backgroundColor: "lightgray", width:"400px"}}><Tooltip
      data-hook={`story-tooltip-zIndex-${order}`}
      placement={'right'}
      content={<span>This is my tooltip</span>}
      zIndex={order === ORDER_BEFORE ? 1000 : 3000}
      appendTo={"window"}
    >
      <span>Hover me for a tooltip1!</span>
    </Tooltip></div>
  );
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
        <h3>Order before cover</h3>
        {createTooltipToTestZindex(ORDER_BEFORE)}
        <h3>Order after cover</h3>
        {createTooltipToTestZindex(ORDER_AFTER)}
      </div>
    );
  }
}
