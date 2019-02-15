import * as React from 'react';
import { MDXSection } from '../../typings/story-section';

export const mdx: (a: MDXSection) => React.ReactNode = ({
  content: Component,
}) => (
  <div className="markdown-body">
    <Component />
  </div>
);
