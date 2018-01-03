import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as s from './Hello.scss';

const Hello: React.StatelessComponent<{name: string}> = ({name}) => (
  <div>Hello <span className={s.underline}>{name}!</span></div>
);

Hello.propTypes = {
  name: PropTypes.string.isRequired
};

export default Hello;
