import * as React from 'react';

import { TabSection } from '../../typings/story-section';

import { StoryConfig } from '../../typings/story-config';

import { error } from './error';
import { importExample } from './import-example';
import { description } from './description';
import { code } from './code';
import { api } from './api';
import { playground } from './playground';
import { testkit } from './testkit';
import { isTab, extractTabs } from '../extract-tabs';
import { columns } from './columns';

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
};

export const getView = type => views[type] || error;

const tabWithSiblings = (section, storyConfig, children) => (
  <div>
    {['pretitle', 'title', 'subtitle', 'description']
      .filter(row => section[row])
      .map(row => (
        <div key={row} className={styles[`section-${row}`]}>
          {section[row]}
        </div>
      ))}
    {children}
  </div>
);

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
          {isTab(tabSection)
            ? view
            : tabWithSiblings(tabSection, storyConfig, view)}
        </div>
      );
    }),
  });
}
