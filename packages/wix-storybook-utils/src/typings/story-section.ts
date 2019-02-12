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
}

export interface StorySection {
  type: SectionType;
  pretitle?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  hidden?: boolean;
}

export type Section =
  | DescriptionSection
  | ImportExampleSection
  | LiveCodeSection
  | CodeSection
  | TabSection
  | ApiSection
  | ColumnsSection
  | TableSection;

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

export interface TableSection extends StorySection {
  rows: string[][];
}

export interface SectionsMeta {
  tabs: string[];
}
