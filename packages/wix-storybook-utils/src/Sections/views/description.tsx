import * as React from 'react';
import { DescriptionSection } from '../../typings/story-section';

const Markdown = require('../../Markdown').default;

const styles = require('./styles.scss');

export const description: ((a: DescriptionSection) => React.ReactNode) = ({
  text,
}) => (
  <div className={styles.description}>
    {typeof text === 'string' ? <Markdown source={text} /> : text}
  </div>
);
