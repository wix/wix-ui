import * as React from 'react';
import {withEllipsedTooltip} from '../../src/HOCS/EllipsedTooltip';

const Text = ({forwardedRef, children, ...rest}) => <span {...rest} ref={forwardedRef}>{children}</span>;

const EllipsedText = withEllipsedTooltip({showTooltip: false})(Text);

export default () => (
  <div style={{width: '170px', background: 'azure'}}><EllipsedText data-hook="ellipsedTooltip-without-tooltip">This text is going to get ellipsed</EllipsedText></div>
);
