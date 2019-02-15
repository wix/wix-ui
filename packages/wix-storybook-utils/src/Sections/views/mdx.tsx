import * as React from 'react';
import { MDXSection } from '../../typings/story-section';

export const mdx: (a: MDXSection) => React.ReactNode = ({
  content: Component,
}) => <Component />;
