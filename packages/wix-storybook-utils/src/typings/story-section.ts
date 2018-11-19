export enum SectionType {
  Description = 'description',
  LiveCode = 'liveCode',
  ImportExample = 'importExample',
  Error = 'error',
}

export interface StorySection {
  type: SectionType;
  title: string;
  hidden?: boolean;
}

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

export interface ErrorSection extends StorySection {}
