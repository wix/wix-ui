import * as React from 'react';

import {
  StorySection,
  TabSection,
  SectionType,
} from '../../typings/story-section';
const Heading = require('../../ui/heading').default;

import { error } from './error';
import { liveCode } from './live-code';
import { importExample } from './import-example';
import { description } from './description';
import { code } from './code';

const TabbedView = require('../../TabbedView').default;

const views = {
  error,
  liveCode,
  importExample,
  description,
  code,
  tab: (section: TabSection) =>
    render(generateMeta(section.sections as StorySection[])),
};

const getView = type => views[type] || error;

interface Meta {
  tabs: string[];
}

const isTab: ((StorySection) => boolean) = ({ type }) =>
  (type as SectionType) === SectionType.Tab;

export function generateMeta(
  sections: StorySection[],
): { sections: StorySection[]; meta: Meta } {
  return sections.reduce(
    (accumulator, section) => {
      const extractTab = ({ type }: StorySection): SectionType[] =>
        isTab(section) ? [section.title as SectionType] : [];

      return {
        meta: { tabs: accumulator.meta.tabs.concat(extractTab(section)) },
        sections: accumulator.sections.concat(section),
      };
    },
    { sections: [], meta: { tabs: [] } },
  );
}

function render({
  sections,
  meta,
}: {
  sections: StorySection[];
  meta: Meta;
}): React.ReactNode {
  return (
    <TabbedView tabs={meta.tabs}>
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
          {getView(section.type)(section)}
        </div>
      ))}
    </TabbedView>
  );
}

export function tab(sections: StorySection[]): React.ReactNode {
  return render(generateMeta(sections));
}
