import * as React from 'react';

import { TabSection } from '../../typings/story-section';
import { StoryConfig } from '../../typings/story-config';
import { sectionWithSiblings } from '../section-with-siblings';

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
import { plugin } from './plugin';
import { example } from './example';

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
  plugin,
  example,
};

export const getView = type => views[type] || (i => i);

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
        <div key={key} data-hook={section.dataHook || null}>
          {isTab(tabSection) ? view : sectionWithSiblings(tabSection, view)}
        </div>
      );
    }),
  });
}
