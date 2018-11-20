import * as React from 'react';

import { StoryConfig } from '../typings/story-config';

import { error } from './renderers/error';
import { liveCode } from './renderers/live-code';
import { importExample } from './renderers/import-example';
import { description } from './renderers/description';
import { code } from './renderers/code';

const Heading = require('../ui/heading').default;

export const renderers = {
  error,
  liveCode,
  importExample,
  description,
  code,
};

const getRenderer = type => renderers[type] || error;

export const Renderer: React.StatelessComponent<StoryConfig> = ({
  sections,
}) => (
  <div>
    {sections.map((section, key) => (
      <div key={key}>
        {section.title && (
          <div
            style={{
              borderBottom: '1px solid #eee',
              padding: '.5em',
              marginBottom: '1em',
            }}
          >
            <Heading>{section.title}</Heading>
          </div>
        )}
        {getRenderer(section.type)(section)}
      </div>
    ))}
  </div>
);
