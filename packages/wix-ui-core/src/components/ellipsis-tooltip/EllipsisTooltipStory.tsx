import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { EllipsisTooltip } from './EllipsisTooltip';
import { withEllipsedTooltip } from '../../hocs/EllipsedTooltip';

const Text = props => <div {...props} />;

const EllipsedText = withEllipsedTooltip({ showTooltip: true })(Text);

storiesOf('Components', module).add('EllipsisTooltip', () => {
  const text = 'this text is very long and will be cut';
  return (
    <div>
      <h3>render prop solution</h3>
      <div style={{ width: '200px' }}>
        <EllipsisTooltip tooltipContent={text}>
          {extendedProps => <Text {...extendedProps({})}>{text}</Text>}
        </EllipsisTooltip>
      </div>

      {/* <h3>original</h3>
      <div style={{ width: '200px' }}>
        <EllipsedText>{text}</EllipsedText>
      </div> */}
    </div>
  );
});
