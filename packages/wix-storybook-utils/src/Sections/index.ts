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

export const baseSection = rest => ({
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

export const code: (object: Partial<CodeSection>) => CodeSection = rest =>
  baseSection({
    type: SectionType.Code,
    ...rest,
  });

export const description: (
  object: string | Partial<DescriptionSection>,
) => DescriptionSection = rest =>
  baseSection({
    type: SectionType.Description,
    ...(typeof rest === 'string' ? { text: rest } : rest),
  });

export const header: (object: Partial<HeaderSection>) => HeaderSection = rest =>
  baseSection({
    type: SectionType.Header,
    ...rest,
  });

export const importExample: (
  object: string | Partial<ImportExampleSection>,
) => ImportExampleSection = rest =>
  baseSection({
    type: SectionType.ImportExample,
    ...(typeof rest === 'string' ? { source: rest } : rest),
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
  object: (Section | React.ReactNode)[] | Partial<ColumnsSection>,
) => ColumnsSection = config =>
  baseSection({
    type: SectionType.Columns,
    ...(Array.isArray(config) ? { items: config } : config),
  });

export const tabs: (
  object: Section[] | Partial<TabsSection>,
) => TabsSection = rest =>
  baseSection({
    type: SectionType.Tabs,
    ...(Array.isArray(rest) ? { tabs: rest } : rest),
  });

export const table: (
  object: TableRow[] | Partial<TableSection>,
) => TableSection = rest =>
  baseSection({
    type: SectionType.Table,
    ...(Array.isArray(rest) ? { rows: rest } : rest),
  });

export const mdx: (object?: Partial<MDXSection>) => MDXSection = rest =>
  baseSection({
    type: SectionType.MDX,
    ...rest,
  });

export const divider: (
  object?: Partial<DividerSection>,
) => DividerSection = rest =>
  baseSection({
    type: SectionType.Divider,
    ...rest,
  });

export const title: (
  object: string | Partial<DividerSection>,
) => TitleSection = config =>
  baseSection({
    type: SectionType.Title,
    ...(typeof config === 'string' ? { title: config } : config),
  });
