import * as React from 'react';

import LiveCodeExample from '../LiveCodeExample';
import {
  ErrorSection,
  LiveCodeSection,
  ImportExampleSection,
  DescriptionSection,
} from '../typings/story-section';
import { StoryConfig } from '../typings/story-config';
const CodeBlock = require('../CodeBlock').default;

const error: ((a: ErrorSection) => React.ReactNode) = ({}) => <div>error</div>;

const liveCode: ((a: LiveCodeSection) => React.ReactNode) = ({
  source,
  components,
  compact = false,
}) => (
  <LiveCodeExample compact={compact} scope={components} initialCode={source} />
);

const importExample: ((a: ImportExampleSection) => React.ReactNode) = ({
  source,
}) => <CodeBlock source={source} />;

const description: ((a: DescriptionSection) => React.ReactNode) = ({
  text,
}) => <div>{text}</div>;

const renderers = {
  error,
  liveCode,
  importExample,
  description,
};

const getRenderer = type => renderers[type] || error;

export const Renderer: React.StatelessComponent<StoryConfig> = ({
  sections,
}) => (
  <div>
    {sections.map((section, key) => (
      <div key={key}>{getRenderer(section.type)(section)}</div>
    ))}
  </div>
);
