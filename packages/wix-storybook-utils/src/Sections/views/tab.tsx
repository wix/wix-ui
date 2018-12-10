import * as React from 'react';

import {
  StorySection,
  SectionsMeta,
  TabSection,
} from '../../typings/story-section';

import { Metadata } from '../../typings/metadata';

import { error } from './error';
import { liveCode } from './live-code';
import { importExample } from './import-example';
import { description } from './description';
import { code } from './code';
import { isTab, combineMeta } from '../combine-meta';

const styles = require('../styles.scss');

const TabbedView = require('../../TabbedView').default;

const views = {
  error,
  liveCode,
  importExample,
  description,
  code,
  tab: (section: TabSection, metadata) =>
    render(combineMeta(section.sections as StorySection[], metadata)),
};

const getView = type => views[type] || error;

function render({
  sections,
  metadata,
}: {
  sections: StorySection[];
  metadata: Metadata & SectionsMeta;
}): React.ReactNode {
  return (
    <TabbedView tabs={metadata.tabs}>
      {sections.map((section, key) => (
        <div className={styles.section} key={key}>
          {!isTab(section) && section.title && (
            <div className={styles.sectionTitle}>{section.title}</div>
          )}

          {getView(section.type)(section, metadata)}
        </div>
      ))}
    </TabbedView>
  );
}

export function tab(
  sections: StorySection[],
  metadata: Metadata,
): React.ReactNode {
  return render(combineMeta(sections, metadata));
}
