## Story

**story** is a term we use to describe single page which contains all documentation about component.
These pages can be done manually or automatically. To do it automatically, a small configuration is required.

Here's an [example of `<RadioGroup/>` story configuration](https://wix-wix-style-react.surge.sh/?selectedKind=4.%20Selection&selectedStory=4.3%20Radio%20Button%20Group&full=0&addons=0&stories=1&panelRight=0) in wix-style-react ([and source of it](https://github.com/wix/wix-style-react/blob/master/stories/RadioGroup.story.js)).

What you see in that link is generated from component source: props list, preview area and code examples.

## Creating a story

Stories are files with `.story.js` extension. These files go through webpack loader which extracts component metadata
and renders it. In order for loader to know what/how to document component, you must provide a configuration object.

## Short example

```js
import RadioGroup from 'wix-style-react/RadioGroup'; // 1

export default { // 2
  category: '4. Selection', // 3
  storyName: '4.3 Radio Button Group', // 4
  component: RadioGroup, // 5
  componentPath: '../src/RadioGroup', // 6

  componentProps: setState => ({ // 7
    value: 1,
    hasError: false,
    size: 'medium',
    children: exampleChildren[0].value,
    onChange: value => setState({value}),
    dataHook: 'storybook-radiogroup'
  }),

  hiddenProps: ['dataHook'], // 8

  exampleProps: { // 9
    children: exampleChildren,
    onChange: value => value
  }
};
```

1. `import` component you wish to document
1. `export` a single object which will be treated as story configuration
1. `category` is a name of Storybook sidebar section
1. `storyName` is a name of specific story
1. `component` a reference to component which is to be documented
1. `componentPath` a path to component. This is for parser to know where to start parsing your component
1. `componentProps` an object (or function returning object) which outlines props to be given to `5.` - a component
1. `hiddenProps` **optional** array of props that should not appear in storybook
1. `exampleProps` **optional** object of the same shape as component props used to configure possible prop values (explained below)

## Long example

### Readme files

Your component may have documentation written in markdown. Markdown
files should stay alongside component source, for example:

```md
  Component
  ├── index.js // entry file
  ├── Component.js // source of component
  ├── README.md // will be shown at the top of story page. make sure it includes a nice title
  ├── README.ACCESSIBILITY.md // will appear as separate `Accessibility` tab
  └── README.TESTKIT.md // will appear as separate `Testkit` tab
```

### Props categories

Interactive props list is split into sections:
1. **Primary Props** - props set in `componentProps` or `exampleProps` get here;
1. **Callback Props** - props that start with `on`, like `onClick`;
1. **HTML Props** - props like `tabIndex` or `href` and alike
1. **Accessibility** - props that start with `aria` like `ariaRequired`
1. **Misc. props** - props that don't fit any other category

if some prop should be under **Primary Props** but it's not, simply define it in
`componentProps` or `exampleProps`.

### Full API

Scaffold:

```js
// MyStory.story.js

export default {
  category: '',
  component: '',
  componentPath: ''
}
```

<details>
  <summary>`category` - `string` required</summary>

  Name of Storybook "section" under which this story will be placed (e.g. `Core`, `6. Navigation`, `3. Inputs`)
</details>

---

<details>
  <summary>`storyName` - `string`</summary>

  Name of the story in sidebar. If omitted, it will use `displayName` of
  the component.
</details>

---

<details>
  <summary>`component` - `ReactNode` required</summary>

  Reference to react component which will be used in interactive example.
  Most often it will be imported component:

  ```js
  import MyComponent from 'wix-style-react/Component';

  export default {
    // ... other config
    component: MyComponent
  }
  ```
</details>

---

<details>
  <summary>`componentPath` - `string` required</summary>

  A string of relative path to component source. This is required in order
  for automatic documentation to know where to start parsing.

  Even though just folder is enough, it is better to provide exact path to file.

  ```js
  import MyComponent from './src/components/MyComponent';

  export default {
    // ... other config
    component: MyComponent,
    componentPath: './src/components/MyComponent/index.js'
  }
  ```

  NOTE: when proxying component from another library (e.g. wix-ui-backoffice -> wix-style-react), give path using `node_modules` to original source file.
</details>

---

<details>
  <summary>`exampleImport` - `string`</summary>

  An example of an import statement to be used to import the component. (appears in a code block between the README and the Playground.)
  When supplied, then it overwrites the automatic import statement.
</details>

---

<details>
  <summary>`displayName` - `string`</summary>

  use this string as components displayName. There may be a case when
  parsed displayName is incorrect (for example some HOC changed it).
</details>

---

<details>
  <summary>`componentProps` - `object` or `function`</summary>

  Props that will be passed to `component`. Either given as-is with
  `object` or computed in `function`. Imagine it as `<Component
  {...componentProps}/>`. This is the place to set required props.

  * when `object`, it will be passed to `component` as props.
  * when `function`, its signature is `(setState, getState) => props` where:
    * `setState` - `function`: accepts one argument - object. When called this object will be set as `componentProps`
    * `getState` - `function`: does not accept anything. When called it will return an object containing currently used props
    * `props` - return value `object`: whatever is returned will be used as new `componentProps`

  For example:

  ```js
  // `componentProps` as object
  export default {
    component: ToggleSwitch,
    // ...other config
    componentProps: {
      onChange: () => console.log('wooo onChange called!')
    }
  }

  // This is equivalent to the following
  <ToggleSwitch onChange={() => console.log('wooo onChange called!')}/>
  ```

  Function is used to allow dynamic changes from within `component`.
  The return value of that function will be used as new `component` props.

  When component calls `onChange` it will
  first take `checked` (which initially is set to `false`) and invert it.

  This is how you can imitate surrounding state without managing it yourself:
  ```js
  // `componentProps` as function
  export default {
    component: ToggleSwitch,
    // ...other config
    componentProps: (setState, getState) => ({
      checked: false,
      onChange: () => setProps({checked: !getProps().checked})
    }),
  }
  ```
</details>

---

<details>
  <summary>`examples` - `ReactNode`</summary>

  Automatically generated story page might not include all possible
  examples. In that case use `examples` and pass a `ReactNode`. It will be
  rendered without modification at the bottom of story page.

  For example:

  ```js
  export default {
    // ... other config
    examples: (
      <div>
        Hello, I am custom example
      </div>
    )
  }
  ```
</details>

---

<details>
  <summary>`exampleImport` - `string`</summary>

  at the top of the page there is code showing how to import component,
  something like `import Component from 'module/Component';`

  However, due to various reasons story may not show correct import example. In that case use `exampleImport` and pass
  hardcoded string of import example
</details>

---

<details>
  <summary>`exampleProps` - `object`</summary>

  `exampleProps` is an optional object of same shape as `componentProps`.
  It's purpose is to configure how interactive props in storybook are displayed.

  automated process tries to derive how a prop is controlled from it's
  type (e.g. a boolean prop is controlled with `<ToggleSwitch/>`, a string with `<Input/>` etc.)

  however, it's not always possible to derive controller from prop type
  and in those cases you are able to configure it manually:

  ```js
  exampleProps: {
    children: ['a', 'list', 'of', 'possible', 'children']
  }
  ```

  the above would show `children` prop with a dropdown.

  Below are possible ways to set `exampleProps`

##### Using list

  this will create a dropdown for `placement` prop with `bottom`,`top`,`right` & `left` options

  ```js
  export default {
    // ... other config
    exampleProps: {
      placement: ['bottom','top','right','left']
    }
  }
  ```

##### Using list of objects

  objects are of `{label, value}` shape. They are useful when example
  value can't be represented as string (for example if value is a component or a function)

  ```js
  export default {
    // ... other config
    exampleProps: {
      children: [
        { label: 'just a string', value: 'hello' },
        { label: 'simple component', value: <div>hello</div> },
        { label: 'another component', value: <MaybeImportedComponent/> },
        {
          label: 'nested components',
          value: (
            <div>
              <SomeComponent/>
              <SomeOtherComponent/>
            </div>
          )
        },
      ]
    }
  }
  ```

  the above would show `children` prop with a dropdown having 4 options.

##### Using functions

  when exampleProp is a function, it's return value will be displayed in
  storybook when that function was called. It will also glow blue. Very
  useful to indicate when callbacks happen.

  ```js
  export default {
    // ... other config
    exampleProps: {
      onClick: () => 'i was called!'
    }
  }
  ```
</details>

---


<details>
  <summary>`hiddenProps` - `array`</summary>

  there can be many reasons why some props should not appear in
  documentation. In such cases, list those props in `hiddenProps` array:

  ```js
  export default {
    // ... other config
    hiddenProps: ['dataHook', 'className']
  }
  ```
</details>
