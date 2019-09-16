# Sections

This page describes each section API. To learn how to use them, see [usage](./usage.md)

import from `wix-storybook-utils/Sections`:

```js
import {
  api,
  code,
  columns,
  description,
  divider,
  header,
  importexample,
  mdx,
  playground,
  tab,
  table,
  tabs,
  testkit,
  title
} from 'wix-storybook-utils/Sections';
```

# Quick example

**`SomeComponent/docs/index.story.js`**
```js
import {
  header,
  tabs,
  tab,
  description,
  playground
} from 'wix-storybook-utils/Sections';

import TestComponent from 'wix-style-react/TestComponent';

export default {
  category: 'Components',
  storyName: 'Test Component',

  sections: [
    header({
      title: 'This is a test component!',
      component: <TestComponent showOff="everything" />
    }),

    tabs([
      tab({
        title: 'Tab with only description',
        sections: [
          description('This could be a lot of text'),

          description({
            title: 'With a title!',
            subtitle: 'explicit properties!'
            text: 'providing object is a long way to use `description` section'
          })
        ]
      }),

      tab({
        title: 'Tab with playground',
        sections: [
          playground()
        ]
      })
    ])
  ]
}
```

# Common properties

All sections support the following optional properties:

* `title` - text to display above section as a title
* `pretitle` - smaller text to display above section `title`
* `subtitle` - smaller text to display under section `title`
* `description` - arbitrary text

this means that, for example, `code` section can be used like this:

```js
code({
  title: 'Code example below',
  subtitle: 'note about something special, maybe code is deprecated?',
  description: 'This is a good code example!',
  source: '<div>I am code!</div>'
})
```

# Shorthand usage

for convenience some sections support shorthand usage.
Refer to API documentation of each section to know if shorthand usage is supported.

Usually you should do, for example:

```js
code({ source: 'const ruc = "tor";' })
```

Some sections support shorthand syntax:
```js
code('const ruc = "tor";')
```

However, if you wish to also have a title (or other things), you can no longer use shorthand syntax

```js
code({
  title: 'There is some code below',
  source: 'const ruc = "tor";'
})
```

# Sections APIs

## `api()` section
API Section automatically renders a table of component API. Currently accepts no parameters.

---

## `code()` section
Code section is for showing code examples. It shows code with syntax highlighting, allows to edit it and also renders preview.
supports shorthand usage, you can pass code source string directly:

```
code(&#39;&lt;div&gt;hello there&lt;/div&gt;&#39;)
```

| Property | Type | Description |
|---|---|---|
| `autoRender` |boolean|by default `code` section automatically renders top level component given in `source`.|
| `compact` |boolean|setting this to true would hide source code under &#34;show code&#34; button|
| `components` |||
| `darkBackground` |boolean|set to `true` if dark background should be enabled by default|
| `interactive` |boolean|set to false if code example is read only|
| `previewProps` |object||
| `source` **required** |string|string of source code to be used in code section|

---

## `columns()` section
Column section allows to render multiple sections in one row.
supports Shorthand usage:

```columns([ description(), ])```

| Property | Type | Description |
|---|---|---|
| `items` **required** ||array of other sections|

---

## `description()` section
Description section is used for regular text blocks.

| Property | Type | Description |
|---|---|---|
| `text` **required** ||either React node or a simple string. String can contain markdown.|

---

## `divider()` section
Divider section is used to visually divide other sections by rendering a horizontal line. Currently supports no parameters.

---

## `header()` section
Header section is used for story page top part. It can display component example, so that it&#39;s easy to see what the story page is about

| Property | Type | Description |
|---|---|---|
| `component` |React.ReactNode|Pass React node which will be rendered inside header. Great to showcase example of component described in story page. Can also be used for some warning, for example, if component is deprecated.|
| `issueUrl` |string|a URL to dispaly at top right of page, which should lead to issue tracker page|
| `sourceUrl` |string|a URL to dispaly at top right of page, which should lead to the source of described component|

---

## `importExample()` section
ImportExample is used to display how the component should be imported.
supports shorthand usage, you can pass string directly:

```
import(&#34;import Component from &#39;wix-style-react/Component&#39;;&#34;)
```

| Property | Type | Description |
|---|---|---|
| `source` **required** |string|string to be used as import example|

---

## `mdx()` section
EXPERIMENTAL section for mdx content. Don&#39;t use, or use with EXTRA CAUTION

| Property | Type | Description |
|---|---|---|
| `content` **required** |any||

---

## `playground()` section
Playground section automatically renders area where it is possible to play with each component prop. Currently
accepts no parameters.

---

## `tab()` section
Tab section is used to nest other sections. It is useful when author desires to, for example, split story page into
&#34;Description&#34;, &#34;Playground&#34;, &#34;Testkit&#34; and similar tabs.

| Property | Type | Description |
|---|---|---|
| `sections` **required** ||list of other sections|

---

## `table()` section
Table section is used for data that needs to be displayed in columns and rows. It must be represented in 2d array.
supports shorthand usage, you can pass 2d array directly:

```
table(
 [ [ &#39;first row, first column&#39; ], [ &#39;first row, second column&#39; ] ],
 [ [ &#39;second row, first column&#39; ], [ &#39;second row, second column&#39; ] ]
)
```

| Property | Type | Description |
|---|---|---|
| `rows` **required** ||nested array representing rows and columns|

---

## `tabs()` section
Tabs section is used to contain tabs.
by default top level of sections is assumed to be `tabs`:

```
sections: [
  tab({ title: &#39;First&#39;, sections: [ ... ] }),
  tab({ title: &#39;Second&#39;, sections: [ ... ] })
]
```

`tabs` section becomes useful when either top level needs to have other sections, for example `header`:

```
sectons: [
  header({ ... }),
  tabs([ ... ])
]
```

or also if tabs are nested deeply:

```
sections: [
  header({ ... }),
  tabs([
    tab({
      title: &#39;I have code and nested tabs!&#39;,
      sections: [
        code({ ... }),
        tabs([
          tab({ title: &#39;#1 Nested tab!&#39;, sections: [ description( ... ) ] })
          tab({ title: &#39;#2 Nested tab!&#39;, sections: [ api() ] })
          // etc
        ])
      ]
    })

  ])
]
```

supports shorthand usage, you can pass array of other tabs directly:

```
tabs([
  tab({ title: &#39;First&#39;, sectons: [ ... ] }),
  tab({ title: &#39;First&#39;, sectons: [ ... ] })
])
```

| Property | Type | Description |
|---|---|---|
| `tabs` **required** ||array of tabs. See `tab()` API for properties of `tab`.|

---

## `testkit()` section
Testkit section automatically renders tables of component testkits APIs. Currently accepts no parameters.

---

## `title()` section
Title section is used for when big text is needed.
support shorthand usage, you can pass string directly:

```
title(&#39;I am a big title!&#39;)
```

---

