import * as React from 'react';
import { withEllipsedTooltipNext } from '../../src/hocs/EllipsedTooltip';

const Text = ({ children, ...rest }) => <span {...rest}>{children}</span>;

const EllipsedText = withEllipsedTooltipNext({ showTooltip: true })(Text);

export default props => (
  <div style={{ width: '170px', background: 'azure' }}>
    <EllipsedText {...props} />
  </div>
);
