import * as React from 'react';

import { StoryConfig } from '../typings/story-config';
import * as Renderers from '../Sections/section-renderers';

export const SectionsRenderer: React.StatelessComponent<StoryConfig> = ({
  sections,
}) => (
  <div>
    {sections.map((section, key) => (
      <div key={key}>{Renderers[section.type](section)}</div>
    ))}
  </div>
);
