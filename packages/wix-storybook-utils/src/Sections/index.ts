import {
  SectionType,
  DescriptionSection,
  ImportExampleSection,
  LiveCodeSection,
  ErrorSection,
  TabSection,
  ApiSection,
  PlaygroundSection,
  TestkitSection,
  ColumnsSection,
  TableSection,
  TabsSection,
} from '../typings/story-section';

// functions exported in this file are used as builders for `sections` array in story config.  they are typed
// abstractions for consumer, so that they don't need to write all details manually and can also leverage some
// autocomplete

const baseSection = rest => ({
  type: SectionType.Error,
  pretitle: '',
  title: '',
  subtitle: '',
  hidden: false,
  ...rest,
});

export const error: (
  object: Partial<ErrorSection>,
) => ErrorSection = baseSection;

export const liveCode: (
  object: Partial<LiveCodeSection>,
) => LiveCodeSection = rest =>
  baseSection({
    type: SectionType.LiveCode,
    ...rest,
  });

export const code = liveCode;

export const description: (
  object: Partial<DescriptionSection>,
) => DescriptionSection = rest =>
  baseSection({
    type: SectionType.Description,
    ...rest,
  });

export const importExample: (
  object: Partial<ImportExampleSection>,
) => ImportExampleSection = rest =>
  baseSection({
    type: SectionType.ImportExample,
    ...rest,
  });

export const tab: (object: Partial<TabSection>) => TabSection = rest =>
  baseSection({
    type: SectionType.Tab,
    sections: [],
    ...rest,
  });

export const api: (object?: Partial<ApiSection>) => ApiSection = rest =>
  baseSection({
    type: SectionType.Api,
    ...rest,
  });

export const playground: (
  object?: Partial<PlaygroundSection>,
) => PlaygroundSection = rest =>
  baseSection({
    type: SectionType.Playground,
    ...rest,
  });

export const testkit: (
  object?: Partial<TestkitSection>,
) => TestkitSection = rest =>
  baseSection({
    type: SectionType.Testkit,
    ...rest,
  });

export const columns: (
  object: Partial<ColumnsSection>,
) => ColumnsSection = rest =>
  baseSection({
    type: SectionType.Columns,
    ...rest,
  });

export const tabs: (object: Partial<TabsSection>) => TabsSection = rest =>
  baseSection({
    type: SectionType.Tabs,
    ...rest,
  });

export const table: (object: Partial<TableSection>) => TableSection = rest =>
  baseSection({
    type: SectionType.Table,
    ...rest,
  });
