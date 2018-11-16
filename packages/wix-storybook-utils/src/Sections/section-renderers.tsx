import * as React from 'react';

import LiveCodeExample from '../LiveCodeExample';
import { ImportExampleSection } from '../typings/story-section';

export const error = () => <div>error</div>;

export const code = ({ source }) => <LiveCodeExample initialCode={source} />;

export const importExample = ({ source }: ImportExampleSection) => (
  <div>{source}</div>
);

export const description = ({ text }) => <div>{text}</div>;
