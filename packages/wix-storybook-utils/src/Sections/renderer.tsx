import * as React from 'react';

import LiveCodeExample from '../LiveCodeExample';
import { CodeSection, ImportExampleSection } from '../typings/story-section';
import { StoryConfig } from '../typings/story-config';

const error = () => <div>error</div>;

const code: ((a: CodeSection) => React.ReactNode) = ({
  source,
  components,
  compact = false,
}) => (
  <LiveCodeExample compact={compact} scope={components} initialCode={source} />
);

const importExample: ((a: ImportExampleSection) => React.ReactNode) = ({
  source,
}) => <div>{source}</div>;

const description = ({ text }) => <div>{text}</div>;

const renderers = {
  error,
  code,
  importExample,
  description,
};

export const Renderer: React.StatelessComponent<StoryConfig> = ({
  sections,
}) => (
  <div>
    {sections.map((section, key) => (
      <div key={key}>{renderers[section.type](section)}</div>
    ))}
  </div>
);
