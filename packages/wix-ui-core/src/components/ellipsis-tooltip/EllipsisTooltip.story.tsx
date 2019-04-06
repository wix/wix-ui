import * as React from 'react';
import { EllipsisTooltip } from '.';
import { storySettings } from './storySettings';

const Text = props => <div {...props} />;
const content = 'this text is very long and will be cut';

const componentWrapper = ({ component }) => (
  <div style={{ width: '200px' }}>{component}</div>
);

const childrenExamples = [
  {
    label: 'long text that needs ellipsis',
    value: extendedProps => <Text {...extendedProps({})}>{content}</Text>,
  },
  {
    label: `short text doesn't`,
    value: extendedProps => (
      <Text {...extendedProps({})}>it's a short one</Text>
    ),
  },
];

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: EllipsisTooltip,
  componentPath: 'EllipsisTooltip.tsx',
  componentWrapper,
  componentProps: {
    showTooltip: true,
    tooltipContent: content,
    children: childrenExamples[0].value,
  },
  exampleProps: {
    children: childrenExamples,
  },
};
