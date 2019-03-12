import {
  Section,
  SectionType,
  DescriptionSection,
  ImportExampleSection,
  CodeSection,
  ErrorSection,
  TabSection,
  ApiSection,
  PlaygroundSection,
  TestkitSection,
  ColumnsSection,
  TableSection,
  Row as TableRow,
  HeaderSection,
  TabsSection,
  MDXSection,
  DividerSection,
  TitleSection,
} from '../typings/story-section';

// functions exported in this file are used as builders for `sections` array in story config.  they are typed
// abstractions for consumer, so that they don't need to write all details manually and can also leverage some
// autocomplete

export const baseSection = config => ({
  type: SectionType.Error,
  pretitle: '',
  title: '',
  subtitle: '',
  hidden: false,
  ...config,
});

export const error: (
  object: Partial<ErrorSection>,
) => ErrorSection = baseSection;

export const code: (
  object: string | Partial<CodeSection>,
) => CodeSection = config =>
  baseSection({
    type: SectionType.Code,
    ...(typeof config === 'string' ? { source: config } : config),
  });

export const description: (
  object: string | Partial<DescriptionSection>,
) => DescriptionSection = config =>
  baseSection({
    type: SectionType.Description,
    ...(typeof config === 'string' ? { text: config } : config),
  });

export const header: (
  object: Partial<HeaderSection>,
) => HeaderSection = config =>
  baseSection({
    type: SectionType.Header,
    ...config,
  });

export const importExample: (
  object: string | Partial<ImportExampleSection>,
) => ImportExampleSection = config =>
  baseSection({
    type: SectionType.ImportExample,
    ...(typeof config === 'string' ? { source: config } : config),
  });

export const tab: (object: Partial<TabSection>) => TabSection = config =>
  baseSection({
    type: SectionType.Tab,
    sections: [],
    ...config,
  });

export const api: (object?: Partial<ApiSection>) => ApiSection = config =>
  baseSection({
    type: SectionType.Api,
    ...config,
  });

export const playground: (
  object?: Partial<PlaygroundSection>,
) => PlaygroundSection = config =>
  baseSection({
    type: SectionType.Playground,
    ...config,
  });

export const testkit: (
  object?: Partial<TestkitSection>,
) => TestkitSection = config =>
  baseSection({
    type: SectionType.Testkit,
    ...config,
  });

export const columns: (
  object: (Section | React.ReactNode)[] | Partial<ColumnsSection>,
) => ColumnsSection = config =>
  baseSection({
    type: SectionType.Columns,
    ...(Array.isArray(config) ? { items: config } : config),
  });

export const tabs: (
  object: Section[] | Partial<TabsSection>,
) => TabsSection = config =>
  baseSection({
    type: SectionType.Tabs,
    ...(Array.isArray(config) ? { tabs: config } : config),
  });

export const table: (
  object: TableRow[] | Partial<TableSection>,
) => TableSection = config =>
  baseSection({
    type: SectionType.Table,
    ...(Array.isArray(config) ? { rows: config } : config),
  });

export const mdx: (object?: Partial<MDXSection>) => MDXSection = config =>
  baseSection({
    type: SectionType.MDX,
    ...config,
  });

export const divider: (
  object?: Partial<DividerSection>,
) => DividerSection = config =>
  baseSection({
    type: SectionType.Divider,
    ...config,
  });

export const title: (
  object: string | Partial<DividerSection>,
) => TitleSection = config =>
  baseSection({
    type: SectionType.Title,
    ...(typeof config === 'string' ? { title: config } : config),
  });
