export enum SectionType {
  Description = 'description',
  Code = 'code',
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

export interface CodeSection extends StorySection {
  source: string;
}

export interface Meta {
  title: string;
  subtitle: string;
  sourceUrl: string;
  issueUrl: string;
  sections: StorySection[];
}
