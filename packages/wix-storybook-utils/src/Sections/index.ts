import {
  ApiSection,
  CodeSection,
  ColumnsSection,
  DescriptionSection,
  DividerSection,
  HeaderSection,
  ImportExampleSection,
  MDXSection,
  PlaygroundSection,
  PluginSection,
  Section,
  SectionType,
  TabSection,
  TableRow,
  TableSection,
  TabsSection,
  TestkitSection,
  TitleSection,
  ExampleSection,
  DoDontSection,
  DemoSection,
} from '../typings/story-section';

// functions exported in this file are used as builders for `sections` array in story config. they are typed
// abstractions for consumer, so that they don't need to write all details manually and can also leverage some
// autocomplete

const base = config => ({
  pretitle: '',
  title: '',
  subtitle: '',
  hidden: false,
  ...config,
});

export const code = (config: string | Partial<CodeSection>): CodeSection =>
  base({
    type: SectionType.Code,
    ...(typeof config === 'string' ? { source: config } : config),
  });

export const description = (
  config: string | Partial<DescriptionSection>,
): DescriptionSection =>
  base({
    type: SectionType.Description,
    ...(typeof config === 'string' ? { text: config } : config),
  });

export const header = (config: Partial<HeaderSection>): HeaderSection =>
  base({
    type: SectionType.Header,
    ...config,
  });

export const importExample = (
  config?: string | Partial<ImportExampleSection>,
): ImportExampleSection =>
  base({
    type: SectionType.ImportExample,
    ...(typeof config === 'string' ? { source: config } : config),
  });

export const tab = (config: Partial<TabSection>): TabSection =>
  base({
    type: SectionType.Tab,
    sections: [],
    ...config,
  });

export const api = (config?: Partial<ApiSection>): ApiSection =>
  base({
    type: SectionType.Api,
    ...config,
  });

export const playground = (
  config?: Partial<PlaygroundSection>,
): PlaygroundSection =>
  base({
    type: SectionType.Playground,
    ...config,
  });

export const testkit = (config?: Partial<TestkitSection>): TestkitSection =>
  base({
    type: SectionType.Testkit,
    ...config,
  });

export const columns = (
  config: (Section | React.ReactNode)[] | Partial<ColumnsSection>,
): ColumnsSection =>
  base({
    type: SectionType.Columns,
    ...(Array.isArray(config) ? { items: config } : config),
  });

export const tabs = (config: Section[] | Partial<TabsSection>): TabsSection =>
  base({
    type: SectionType.Tabs,
    ...(Array.isArray(config) ? { tabs: config } : config),
  });

export const table = (
  config: TableRow[] | Partial<TableSection>,
): TableSection =>
  base({
    type: SectionType.Table,
    ...(Array.isArray(config) ? { rows: config } : config),
  });

export const mdx = (config?: Partial<MDXSection>): MDXSection =>
  base({
    type: SectionType.MDX,
    ...config,
  });

export const divider = (config?: Partial<DividerSection>): DividerSection =>
  base({
    type: SectionType.Divider,
    ...config,
  });

export const title = (config: string | Partial<DividerSection>): TitleSection =>
  base({
    type: SectionType.Title,
    ...(typeof config === 'string' ? { title: config } : config),
  });

export const plugin = (config: Partial<PluginSection>): PluginSection =>
  base({
    type: SectionType.Plugin,
    ...config,
  });

export const example = (config: Partial<ExampleSection>): ExampleSection =>
  base({
    type: SectionType.Example,
    compact: true,
    ...config,
  });

export const doDont = (config: Partial<DoDontSection>): ExampleSection =>
  base({
    type: SectionType.DoDont,
    ...config,
  });

export const demo = (config: Partial<DemoSection>): DemoSection =>
  base({
    type: SectionType.Demo,
    ...config,
  });
