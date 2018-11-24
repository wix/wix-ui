import {
  SectionType,
  DescriptionSection,
  ImportExampleSection,
  LiveCodeSection,
  CodeSection,
  ErrorSection,
  TabSection,
} from '../typings/story-section';

// functions exported in this file are used as builders for `sections` array in story config.  they are typed
// abstractions for consumer, so that they don't need to write all details manually and can also leverage some
// autocomplete

const baseSection = rest => ({
  type: SectionType.Error,
  title: '',
  hidden: false,
  ...rest,
});

export const error: ((
  object: Partial<ErrorSection>,
) => ErrorSection) = baseSection;

export const liveCode: ((
  object: Partial<LiveCodeSection>,
) => LiveCodeSection) = rest =>
  baseSection({
    type: SectionType.LiveCode,
    ...rest,
  });

export const code: ((object: Partial<CodeSection>) => CodeSection) = rest =>
  baseSection({
    type: SectionType.Code,
    ...rest,
  });

export const description: ((
  object: Partial<DescriptionSection>,
) => DescriptionSection) = rest =>
  baseSection({
    type: SectionType.Description,
    ...rest,
  });

export const importExample: ((
  object: Partial<ImportExampleSection>,
) => ImportExampleSection) = rest =>
  baseSection({
    type: SectionType.ImportExample,
    ...rest,
  });

export const tab: ((object: Partial<TabSection>) => TabSection) = rest =>
  baseSection({
    type: SectionType.Tab,
    sections: [],
    ...rest,
  });
