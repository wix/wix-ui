import * as React from 'react';
import { Section } from './story-section';

export interface Example {
  title?: string;
  description?: string;
  example?: string;
  wide?: boolean;
}

export interface StoryContent {
  description?: string;
  do?: string[];
  dont?: string[];
  featureExamples?: Example[];
  commonUseCaseExamples?: Example[];
}

export interface Tab {
  title: string;
  type: string;
  sections?: React.ReactNode[] | (JSX.Element[] & Section[]);
  node?: React.ReactNode;
}
export interface Tabs {
  design: Tab;
  api: Tab;
  testkit: Tab;
  playground: Tab;
}

export type StoryExamples = Record<string, string>;

export type StoryDemo = React.ReactNode;

export type StoryTabs = (tabs: Tabs) => Tab[];
