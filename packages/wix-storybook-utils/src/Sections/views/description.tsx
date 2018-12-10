import * as React from 'react';
import { DescriptionSection } from '../../typings/story-section';

const styles = require('./styles.scss');

export const description: ((a: DescriptionSection) => React.ReactNode) = ({
  text,
}) => <div className={styles.description}>{text}</div>;
