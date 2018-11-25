export enum SectionType {
  Description = 'description',
  LiveCode = 'liveCode',
  Code = 'code',
  ImportExample = 'importExample',
  Error = 'error',
  Tab = 'tab',
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
  | TabSection;

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
  sections: Partial<Section>[];
}

export interface ErrorSection extends StorySection {}

export interface SectionsMeta {
  tabs: string[];
}
