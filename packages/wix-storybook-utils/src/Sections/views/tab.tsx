import * as React from 'react';

import { TabSection } from '../../typings/story-section';
import { StoryConfig } from '../../typings/story-config';
import { sectionWithSiblings } from '../section-with-siblings';

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
import { tabs } from './tabs';
import { mdx } from './mdx';
import { divider } from './divider';
import { header } from './header';
import { title } from './title';

import styles from '../styles.scss';
import TabbedView from '../../TabbedView';

export const tab = (
  section: TabSection,
  storyConfig: StoryConfig,
): React.ReactNode => {
  const extractedTabs = extractTabs(section);
  return render(section, extractedTabs, storyConfig);
};

const views = {
  header,
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
  tabs,
  mdx,
  divider,
  title,
};

export const getView = type => views[type] || error;

function render(
  section: TabSection,
  tabTitles: string[],
  storyConfig: StoryConfig,
): React.ReactNode {
  return React.createElement(tabTitles.length ? TabbedView : 'div', {
    ...(tabTitles ? { tabs: tabTitles } : {}),
    className: styles.tab,
    children: section.sections.map((tabSection, key) => {
      const view = getView(tabSection.type)(tabSection, storyConfig);

      return (
        <div key={key}>
          {isTab(tabSection) ? view : sectionWithSiblings(tabSection, view)}
        </div>
      );
    }),
  });
}
