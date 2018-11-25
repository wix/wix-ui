import * as React from 'react';
import { DescriptionSection } from '../../typings/story-section';

export const description: ((a: DescriptionSection) => React.ReactNode) = ({
  text,
}) => <div>{text}</div>;
