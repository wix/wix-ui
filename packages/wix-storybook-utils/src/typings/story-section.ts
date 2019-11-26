import React from 'react';
import { StoryConfig } from './story-config';

export enum SectionType {
  Api = 'api',
  Code = 'code',
  Columns = 'columns',
  Description = 'description',
  Divider = 'divider',
  Header = 'header',
  ImportExample = 'importExample',
  MDX = 'mdx',
  Playground = 'playground',
  Tab = 'tab',
  Table = 'table',
  Tabs = 'tabs',
  Testkit = 'testkit',
  Title = 'title',
  Plugin = 'plugin',
}

export interface StorySection {
  type: SectionType;
  pretitle?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  dataHook?: string;
}

export type Section =
  | HeaderSection
  | DescriptionSection
  | ImportExampleSection
  | CodeSection
  | TabSection
  | ApiSection
  | ColumnsSection
  | TableSection
  | TabsSection
  | MDXSection
  | TitleSection
  | PluginSection;

export type PluginHandler = (
  section: PluginSection,
  storyConfig: StoryConfig,
) => React.ReactNode;

/** Description section is used for regular text blocks. */
export interface DescriptionSection extends StorySection {
  /** either React node or a simple string. String can contain markdown.
   *
   * supports shorthand usage, you can pass string directly:
   *
   * ```
   * description('Hello this is an elaborate description!')
   * ```
   * */
  text: React.ReactNode | string;
}

/** Header section is used for story page top part. It can display component example, so that it's easy to see what the story page is about */
export interface HeaderSection extends StorySection {
  /** Pass React node which will be rendered inside header. Great to showcase example of component described in story page. Can also be used for some warning, for example, if component is deprecated. */
  component?: React.ReactNode;

  /** a URL to dispaly at top right of page, which should lead to issue tracker page */

  issueUrl?: string;
  /** a URL to dispaly at top right of page, which should lead to the source of described component */
  sourceUrl?: string;
}

/** ImportExample is used to display how the component should be imported.
 *
 * supports shorthand usage, you can pass string directly:
 *
 * ```
 * import("import Component from 'wix-style-react/Component';")
 * ```
 * */
export interface ImportExampleSection extends StorySection {
  /** string to be used as import example */
  source: string;
}

/** Code section is for showing code examples. It shows code with syntax highlighting, allows to edit it and also renders preview.
 *
 * supports shorthand usage, you can pass code source string directly:
 *
 * ```
 * code('<div>hello there</div>')
 * ```
 * */
export interface CodeSection extends StorySection {
  /** string of source code to be used in code section */
  source: string;

  previewProps?: object;

  components?: { [s: string]: React.ReactNode };

  /** setting this to true would hide source code under "show code" button */
  compact?: boolean;

  /** set to false if code example is read only */
  interactive?: boolean;

  /** by default `code` section automatically renders top level component given in `source`.
   *
   * In cases where there are multiple components (written as stateful class, for example):
   *
   * 1. set `autoRender: false`
   * 2. in source code call globally available `render` function and pass a component which should be rendered in preview: `render(MyComponent)`.
   * */
  autoRender?: boolean;

  /** set to `true` if dark background should be enabled by default */
  darkBackground?: boolean;
}

/** Tab section is used to nest other sections. It is useful when author desires to, for example, split story page into
 * "Description", "Playground", "Testkit" and similar tabs.
 * */
export interface TabSection extends StorySection {
  /** list of other sections */
  sections: Section[];
}

/** API Section automatically renders a table of component API. Currently accepts no parameters. */
export interface ApiSection extends StorySection {
  parsedSource?: object;
}

/** Plugin section gives control over section rendering to the user of storybook utils */
export interface PluginSection extends StorySection {
  handler: PluginHandler;
}

/** Playground section automatically renders area where it is possible to play with each component prop. Currently
 * accepts no parameters. */
export interface PlaygroundSection extends StorySection {}

/** Testkit section automatically renders tables of component testkits APIs. Currently accepts no parameters. */
export interface TestkitSection extends StorySection {}

/** Column section allows to render multiple sections in one row.
 *
 * supports Shorthand usage:
 *
 * ```columns([ description(), ])```
 * */
export interface ColumnsSection extends StorySection {
  /** array of other sections */
  items: Section[];
}

/**
 * Tabs section is used to contain tabs.
 *
 * by default top level of sections is assumed to be `tabs`:
 *
 * ```
 * sections: [
 *   tab({ title: 'First', sections: [ ... ] }),
 *   tab({ title: 'Second', sections: [ ... ] })
 * ]
 * ```
 *
 * `tabs` section becomes useful when either top level needs to have other sections, for example `header`:
 *
 * ```
 * sectons: [
 *   header({ ... }),
 *   tabs([ ... ])
 * ]
 * ```
 *
 * or also if tabs are nested deeply:
 *
 * ```
 * sections: [
 *   header({ ... }),
 *   tabs([
 *     tab({
 *       title: 'I have code and nested tabs!',
 *       sections: [
 *         code({ ... }),
 *         tabs([
 *           tab({ title: '#1 Nested tab!', sections: [ description( ... ) ] })
 *           tab({ title: '#2 Nested tab!', sections: [ api() ] })
 *           // etc
 *         ])
 *       ]
 *     })
 *
 *   ])
 * ]
 * ```
 *
 * supports shorthand usage, you can pass array of other tabs directly:
 *
 * ```
 * tabs([
 *   tab({ title: 'First', sectons: [ ... ] }),
 *   tab({ title: 'First', sectons: [ ... ] })
 * ])
 * ```
 */
export interface TabsSection extends StorySection {
  /** array of tabs. See `tab()` API for properties of `tab`. */
  tabs: TabSection[];
}

type Cell = string | React.ReactNode;
export type TableRow = Cell[];

/** Table section is used for data that needs to be displayed in columns and rows. It must be represented in 2d array.
 *
 * supports shorthand usage, you can pass 2d array directly:
 *
 * ```
 * table(
 *  [ [ 'first row, first column' ], [ 'first row, second column' ] ],
 *  [ [ 'second row, first column' ], [ 'second row, second column' ] ]
 * )
 * ```
 * */
export interface TableSection extends StorySection {
  /** nested array representing rows and columns */
  rows: TableRow[];
}

/** EXPERIMENTAL section for mdx content. Don't use, or use with EXTRA CAUTION */
export interface MDXSection extends StorySection {
  content: any;
}

/** Divider section is used to visually divide other sections by rendering a horizontal line. Currently supports no parameters. */
export interface DividerSection extends StorySection {}

/** Title section is used for when big text is needed.
 *
 * support shorthand usage, you can pass string directly:
 *
 * ```
 * title('I am a big title!')
 * ```
 * */
export interface TitleSection extends StorySection {}
