export enum SectionType {
  Description = 'description',
  LiveCode = 'liveCode',
  Code = 'code',
  ImportExample = 'importExample',
  Error = 'error',
  Tab = 'tab',
  Api = 'api',
  Playground = 'playground',
  Testkit = 'testkit',
}

export interface StorySection {
  type: SectionType;
  title?: string;
  hidden?: boolean;
}

export type Section =
  | DescriptionSection
  | ImportExampleSection
  | LiveCodeSection
  | CodeSection
  | TabSection
  | ApiSection;

export interface DescriptionSection extends StorySection {
  text: string;
}

export interface ImportExampleSection extends StorySection {
  source: string;
}

export interface LiveCodeSection extends StorySection {
  source: string;
  components?: { [s: string]: React.ReactNode };
  compact?: boolean;
}

export interface CodeSection extends StorySection {
  source: string;
  description?: React.ReactNode;
}

export interface TabSection extends StorySection {
  sections: Section[];
}

export interface ErrorSection extends StorySection {}

export interface ApiSection extends StorySection {}
export interface PlaygroundSection extends StorySection {}
export interface TestkitSection extends StorySection {}

export interface SectionsMeta {
  tabs: string[];
}
