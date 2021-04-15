import * as React from 'react';

export interface Example {
  title?: string;
  description?: string;
  example?: string;
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
  sections?: JSX.Element;
  node?: JSX.Element;
}
export interface Tabs {
  design: Tab;
  api: Tab;
  testkit: Tab;
  playground: Tab;
}

export type StoryExamples = Record<string, string>;

export type StoryDemo = React.ElementType;

export type StoryTabs = (tabs: Tabs) => Tab[];
