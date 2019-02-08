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

const styles = require('../styles.scss');

const TabbedView = require('../../TabbedView').default;

const views = {
  error,
  importExample,
  description,
  code,
  api,
  playground,
  testkit,
  tab: (section: TabSection, storyConfig: StoryConfig): React.ReactNode => {
    const tabs = extractTabs(section);
    return render(section, tabs, storyConfig);
  },
};

const getView = type => views[type] || error;

function render(
  section: TabSection,
  tabs: string[],
  storyConfig: StoryConfig,
): React.ReactNode {
  return React.createElement(tabs.length ? TabbedView : 'div', {
    ...(tabs ? { tabs } : {}),
    className: styles.tab,
    children: section.sections.map((tabSection, key) => (
      <div key={key}>
        {!isTab(tabSection) && tabSection.title && (
          <div className={styles.sectionTitle}>{tabSection.title}</div>
        )}

        {getView(tabSection.type)(tabSection, storyConfig)}
      </div>
    )),
  });
}

export const tab = views.tab;
