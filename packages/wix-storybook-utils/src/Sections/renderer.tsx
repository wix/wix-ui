import * as React from 'react';

import { ErrorSection } from '../typings/story-section';
import { StoryConfig } from '../typings/story-config';

import { liveCode } from './renderers/live-code';
import { importExample } from './renderers/import-example';
import { description } from './renderers/description';

const error: ((a: ErrorSection) => React.ReactNode) = ({}) => <div>error</div>;

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
