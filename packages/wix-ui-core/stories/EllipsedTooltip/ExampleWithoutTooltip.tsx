import * as React from 'react';
import { withEllipsedTooltipNext } from '../../src/hocs/EllipsedTooltip';

const Text = ({ children, ...rest }) => <span {...rest}>{children}</span>;

const EllipsedText = withEllipsedTooltipNext({ showTooltip: false })(Text);

export default () => (
  <div style={{ width: '170px', background: 'azure' }}>
    <EllipsedText data-hook="ellipsedTooltip-without-tooltip">
      This text is going to get ellipsed
    </EllipsedText>
  </div>
);
