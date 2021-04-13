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

export type StoryExamples = Record<string, string>;

export type StoryDemo = React.ElementType;
