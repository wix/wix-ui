import * as React from 'react';

import {
  StorySection,
  SectionsMeta,
  TabSection,
} from '../../typings/story-section';

import { error } from './error';
import { liveCode } from './live-code';
import { importExample } from './import-example';
import { description } from './description';
import { code } from './code';
import { extractMeta } from '../extract-meta';

const TabbedView = require('../../TabbedView').default;

const views = {
  error,
  liveCode,
  importExample,
  description,
  code,
  tab: (section: TabSection) =>
    render(extractMeta(section.sections as StorySection[])),
};

const getView = type => views[type] || error;

function render({
  sections,
  meta,
}: {
  sections: StorySection[];
  meta: SectionsMeta;
}): React.ReactNode {
  return (
    <TabbedView tabs={meta.tabs}>
      {sections.map((section, key) => (
        <div key={key}>{getView(section.type)(section)}</div>
      ))}
    </TabbedView>
  );
}

export function tab(sections: StorySection[]): React.ReactNode {
  return render(extractMeta(sections));
}
