import * as React from 'react';
import {withEllipsedTooltip} from '../../src/hocs/EllipsedTooltip';
import style from './style.st.css';

const Text = ({children, ...rest}) => <span {...rest}>{children}</span>;

const EllipsedText = withEllipsedTooltip({showTooltip: true})(Text);

export default () => (
  <div style={{width: '170px', background: 'azure'}}><EllipsedText {...style('root')}>This text is going to get ellipsed</EllipsedText></div>
);
