import { Metadata } from './metadata';
import { Config } from './config';
import { StorySection } from './story-section';

export interface StoryConfig {
  metadata: Metadata;
  config: Config;
  component: any;
  storyName?: string;
  componentProps?: any;
  componentWrapper?: any;
  hiddenProps?: string[];
  displayName?: string;
  exampleProps?: any;

  /** custom string to be displayed in place of import example
   * usually something like `import Component from 'module/Component';`
   */
  exampleImport?: string;
  examples?: any;

  /** currently only bool possible. later same property shall be used for configuring code example */
  codeExample?: boolean;
  sections?: StorySection[];
}
