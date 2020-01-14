import * as React from 'react';
import { withEllipsedTooltipNext } from '../../src/hocs/EllipsedTooltip';

const Text = ({ children, ...rest }) => <span {...rest}>{children}</span>;

const EllipsedText = withEllipsedTooltipNext({ showTooltip: true })(Text);

export default () => (
  <div style={{ background: 'azure' }}>
    <EllipsedText data-hook="ellipsedTooltip-not-ellipsed">
      This text will not get ellipsed since the width of this row is really
      really huge
    </EllipsedText>
  </div>
);
