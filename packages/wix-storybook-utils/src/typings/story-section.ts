import React from 'react';

export enum SectionType {
  Description = 'description',
  LiveCode = 'code',
  Code = 'code',
  ImportExample = 'importExample',
  Error = 'error',
  Tab = 'tab',
  Api = 'api',
  Playground = 'playground',
  Testkit = 'testkit',
  Columns = 'columns',
  Table = 'table',
  Tabs = 'tabs',
  MDX = 'mdx',
}

export interface StorySection {
  type: SectionType;
  pretitle?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  hidden?: boolean;
  parsedSource?: object;
}

export type Section =
  | DescriptionSection
  | ImportExampleSection
  | LiveCodeSection
  | CodeSection
  | TabSection
  | ApiSection
  | ColumnsSection
  | TableSection
  | TabsSection
  | MDXSection;

export interface DescriptionSection extends StorySection {
  text: React.ReactNode | string;
}

export interface ImportExampleSection extends StorySection {
  source: React.ReactNode;
}

export interface CodeSection extends StorySection {
  source: React.ReactNode;
  previewProps?: object;
  components?: { [s: string]: React.ReactNode };
  compact?: boolean;
  interactive?: boolean;
}

export interface LiveCodeSection extends CodeSection {}

export interface TabSection extends StorySection {
  sections: Section[];
}

export interface ErrorSection extends StorySection {}

export interface ApiSection extends StorySection {}
export interface PlaygroundSection extends StorySection {}
export interface TestkitSection extends StorySection {}

export interface ColumnsSection extends StorySection {
  items: Section[];
}

export interface TabsSection extends StorySection {
  tabs: TabSection[];
}

type Cell = string | React.ReactNode;
type Row = Cell[];
export interface TableSection extends StorySection {
  rows: Row[];
}

export interface MDXSection extends StorySection {
  content: any;
}

export interface SectionsMeta {
  tabs: string[];
}
