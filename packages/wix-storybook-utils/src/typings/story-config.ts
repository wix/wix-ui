import * as React from 'react';
import { Metadata } from './metadata';
import { Config } from './config';
import { StorySection } from './story-section';
import { StoryContent } from './story-content';

export interface StoryConfig {
  metadata: Metadata;
  config: Config;
  storyName?: string;
  component?: React.ReactNode;
  componentPath?: string;
  componentProps?: any;
  componentWrapper?: any;
  /*
   * list of props that should not be displayed in playground
   */
  hiddenProps?: string[];
  displayName?: string;
  exampleProps?: any;

  /**
   * custom string to be displayed in place of import example
   * usually something like `import Component from 'module/Component';`
   */
  exampleImport?: string;
  examples?: any;

  /**
   * currently only bool possible. later same property shall be used for configuring code example
   * */
  codeExample?: boolean;
  sections?: StorySection[];

  content: StoryContent; //TODO
  modifyExamples(example: string): { mode: string }; //TODO - is it good name?
}
