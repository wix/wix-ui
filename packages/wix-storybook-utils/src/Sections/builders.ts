import {
  SectionType,
  DescriptionSection,
  ImportExampleSection,
  CodeSection,
} from '../typings/story-section';

const baseSection = rest => ({
  type: SectionType.Error,
  hidden: false,
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
