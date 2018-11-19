import {
  SectionType,
  DescriptionSection,
  ImportExampleSection,
  LiveCodeSection,
} from '../typings/story-section';

// functions exported in this file are used as builders for `sections` array in story config.  they are typed
// abstractions for consumer, so that they don't need to write all details by manually and can also leverage some
// autocomplete

const baseSection = rest => ({
  type: SectionType.Error,
  hidden: false,
  ...rest,
});

export const liveCode: ((object: Partial<LiveCodeSection>) => LiveCodeSection) = rest =>
  baseSection({
    type: SectionType.LiveCode,
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
