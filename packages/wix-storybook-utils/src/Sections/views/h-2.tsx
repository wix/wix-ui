import * as React from 'react';
import { H2Section } from '../../typings/story-section';

const styles = require('./styles.scss');

export const h2: (a: H2Section) => React.ReactNode = ({ text }) => (
  <h2 className={styles.h2}>{text}</h2>
);
