import {
  Section,
  SectionType,
  DescriptionSection,
  ImportExampleSection,
  CodeSection,
  TabSection,
  ApiSection,
  PlaygroundSection,
  TestkitSection,
  ColumnsSection,
  TableSection,
  TableRow,
  HeaderSection,
  TabsSection,
  MDXSection,
  DividerSection,
  TitleSection,
  PluginSection,
} from '../typings/story-section';

// functions exported in this file are used as builders for `sections` array in story config. they are typed
// abstractions for consumer, so that they don't need to write all details manually and can also leverage some
// autocomplete

const baseSection = config => ({
  pretitle: '',
  title: '',
  subtitle: '',
  hidden: false,
  ...config,
});

export const code = (config: string | Partial<CodeSection>): CodeSection =>
  baseSection({
    type: SectionType.Code,
    ...(typeof config === 'string' ? { source: config } : config),
  });

export const description = (
  config: string | Partial<DescriptionSection>,
): DescriptionSection =>
  baseSection({
    type: SectionType.Description,
    ...(typeof config === 'string' ? { text: config } : config),
  });

export const header = (config: Partial<HeaderSection>): HeaderSection =>
  baseSection({
    type: SectionType.Header,
    ...config,
  });

export const importExample = (
  config: string | Partial<ImportExampleSection>,
): ImportExampleSection =>
  baseSection({
    type: SectionType.ImportExample,
    ...(typeof config === 'string' ? { source: config } : config),
  });

export const tab = (config: Partial<TabSection>): TabSection =>
  baseSection({
    type: SectionType.Tab,
    sections: [],
    ...config,
  });

export const api = (config?: Partial<ApiSection>): ApiSection =>
  baseSection({
    type: SectionType.Api,
    ...config,
  });

export const playground = (
  config?: Partial<PlaygroundSection>,
): PlaygroundSection =>
  baseSection({
    type: SectionType.Playground,
    ...config,
  });

export const testkit = (config?: Partial<TestkitSection>): TestkitSection =>
  baseSection({
    type: SectionType.Testkit,
    ...config,
  });

export const columns = (
  config: (Section | React.ReactNode)[] | Partial<ColumnsSection>,
): ColumnsSection =>
  baseSection({
    type: SectionType.Columns,
    ...(Array.isArray(config) ? { items: config } : config),
  });

export const tabs = (config: Section[] | Partial<TabsSection>): TabsSection =>
  baseSection({
    type: SectionType.Tabs,
    ...(Array.isArray(config) ? { tabs: config } : config),
  });

export const table = (
  config: TableRow[] | Partial<TableSection>,
): TableSection =>
  baseSection({
    type: SectionType.Table,
    ...(Array.isArray(config) ? { rows: config } : config),
  });

export const mdx = (config?: Partial<MDXSection>): MDXSection =>
  baseSection({
    type: SectionType.MDX,
    ...config,
  });

export const divider = (config?: Partial<DividerSection>): DividerSection =>
  baseSection({
    type: SectionType.Divider,
    ...config,
  });

export const title = (config: string | Partial<DividerSection>): TitleSection =>
  baseSection({
    type: SectionType.Title,
    ...(typeof config === 'string' ? { title: config } : config),
  });

export const plugin = (config: Partial<PluginSection>): PluginSection =>
  baseSection({
    type: SectionType.Plugin,
    ...config,
  });
