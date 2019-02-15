import * as React from 'react';
import { TabsSection, SectionType } from '../../typings/story-section';
import { getView } from './tab';
import { StoryConfig } from '../../typings/story-config';
import TabbedView from '../../TabbedView';

const styles = require('./styles.scss');

export const tabs: (a: TabsSection, b: StoryConfig) => React.ReactNode = (
  { tabs: tabsToShow },
  storyConfig,
) => (
  <TabbedView
    tabs={tabsToShow.map(tab => tab.title)}
    className={styles.tab}
    children={tabsToShow.map(tab => getView(SectionType.Tab)(tab, storyConfig))}
  />
);
