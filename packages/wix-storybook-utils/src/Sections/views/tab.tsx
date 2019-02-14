import * as React from 'react';

import { TabSection } from '../../typings/story-section';

import { StoryConfig } from '../../typings/story-config';

import { sectionWithTitles } from '../common';

import { error } from './error';
import { importExample } from './import-example';
import { description } from './description';
import { code } from './code';
import { api } from './api';
import { playground } from './playground';
import { testkit } from './testkit';
import { isTab, extractTabs } from '../extract-tabs';
import { columns } from './columns';
import { table } from './table';
import { h2 } from './h-2';
import { tabs } from './tabs';

const styles = require('../styles.scss');

const TabbedView = require('../../TabbedView').default;

export const tab = (
  section: TabSection,
  storyConfig: StoryConfig,
): React.ReactNode => {
  const tabs = extractTabs(section);
  return render(section, tabs, storyConfig);
};

const views = {
  error,
  importExample,
  description,
  code,
  api,
  playground,
  testkit,
  tab,
  columns,
  table,
  h2,
  tabs,
};

export const getView = type => views[type] || error;

function render(
  section: TabSection,
  tabs: string[],
  storyConfig: StoryConfig,
): React.ReactNode {
  return React.createElement(tabs.length ? TabbedView : 'div', {
    ...(tabs ? { tabs } : {}),
    className: styles.tab,
    children: section.sections.map((tabSection, key) => {
      const view = getView(tabSection.type)(tabSection, storyConfig);

      return (
        <div key={key}>
          {isTab(tabSection) ? view : sectionWithTitles(tabSection, view)}
        </div>
      );
    }),
  });
}
