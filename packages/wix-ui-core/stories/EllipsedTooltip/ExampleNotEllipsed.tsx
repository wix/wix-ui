import * as React from 'react';
import {withEllipsedTooltip} from '../../src/HOCS/EllipsedTooltip';

const Text = ({forwardedRef, children, ...rest}) => <span {...rest} ref={forwardedRef}>{children}</span>;

const EllipsedText = withEllipsedTooltip({showTooltip: false})(Text);

export default () => (
  <div style={{background: 'azure'}}><EllipsedText data-hook="ellipsedTooltip-not-ellipsed">This text will not get ellipsed since the width of this row is really really huge</EllipsedText></div>
);
