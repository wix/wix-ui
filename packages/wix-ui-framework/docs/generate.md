# `wuf generate`

`wuf generate` command is used to scaffold components and integrate them in existing library codebase.

```md
Usage: generate [options]

Scaffold file structure from templates

Options:
  --component-name <string>  Component name
  --description <string>     Component description
  --templates <string>       Path to templates. Default is "/generator/templates/"
  --output <string>          Path to output. If not set, output is determined by --templates folder structure
  --codemods <string>        Path to codemods. By default no codemods are run.
  -f, --force                Force component generation in a non clean git repo.
  -h, --help                 output usage information
```

---

Component libraries often contain more than a list of `Component.js`
files. All these components likely have styles, tests, testkits and
documentation. Each of those might be required for different platforms.

Writing these files by hand for each new component is not only tedious
but very error-prone.

---

`wuf generate` is usually run with `--templates`, `--codemods` &
`--output` flags. Let's explore each.

## `--templates`

`wuf generate` requires a template to scaffold new components.

A template is simply one or more files or folders.

For example, a `<DatePicker/>` component structure might look like so:

```
.
└── DatePicker
    ├── date-picker.css
    ├── date-picker.js
    ├── docs
    │   └── index.story.js
    ├── index.js
    └── test
        ├── date_picker_e2e.js
        ├── date_picker_unit.js
        └── date_picker_visual.js
```

Just for illustration puproses, file names have different casing. Namely
PascalCase, kebab-case & snake_case.

## Using file name variables in templates

**Template** folder structure for the above would be:

```
.
└── $ComponentName
    ├── $component-name.css
    ├── $component-name.js
    ├── docs
    │   └── index.story.js
    ├── index.js
    └── test
        ├── $component_name_e2e.js
        ├── $component_name_unit.js
        └── $component_name_visual.js
```

Let's run the following command:

```
wuf generate --componentName MyAwesomeComponent --templates .wuf/generator/templates --output src
```

The generated files will look like so:

```
.
└── MyAwesomeComponent
    ├── my-awesome-component.css
    ├── my-awesome-component.js
    ├── docs
    │   └── index.story.js
    ├── index.js
    └── test
        ├── my_awesome_component_e2e.js
        ├── my_awesome_component_unit.js
        └── my_awesome_component_visual.js
```

You can see the usage of variables in file/folder names. Variable format decides the output:

* `$ComponentName` -> `MyAwesomeComponent`
* `$componentName` -> `myAwesomeComponent`
* `$component-name` -> `my-awesome-component`
* `$component-name` -> `my_awesome_component`

any other symbols will be left unchanged, for example:

* `$ComponentNameTest.js` -> `MyAwesomeComponentTest.js`
* `$component_name_visual.test.js` -> `my_awesome_component_visual.test.js`
* etc.

## Using EJS in template files

[EJS](https://ejs.co/) is supported in all template files, for example:

```js
<% const script = 'script' %>
This is template file of <%= ComponentName %>
It supports <%= `java${script}` %> and includes utilities:
<% Object.keys(utils).forEach(util => { %>* <%= util %>
<% }) %>
It means you can turn <%= utils.toKebab('aCamelIntoKebab') %>
```

The template above would be generated into (assuming `--component-name` is `MyAwesomeComponent`):

```
This is template file of MyAwesomeComponent
It supports javascript and includes utilities:
* toCamel
* toKebab
* toSnake
* toPascal

It means you can turn a-camel-into-kebab
```

---

## `--codemods`

### Why are codemods needed?

Component on it's own is too little. It also has to integrate well into
the library to be fully usable by consumers. It needs to be exported,
perhaps registered in some metadata accumulator and so on.

This is achievable with codemods - small scripts that alter source
files. It can be adding more data, adjusting existing one, maybe
removing something

### How to add codemod

For example, say that all components within the library are exported in `src/index.js`.

That's a big file like so:

```
// ... many similar lines above
export DatePicker from 'src/DatePicker'
export Checkbox from 'src/Checkbox'
export ToggleSwitch from 'src/ToggleSwitch'
```

Generating new component must also add new entry to `src/index.js`.
Otherwise developer needs to do it manually which is no good.

We can run codemods by specifying `--codemods` flag with a path to
codemods folder:

`wuf generate --codemods .wuf/generator/codemods`

`.wuf/generator/codemods` folder must contain `index.js` file like so:

```js
module.exports = [
  {
    codemod: 'src-index.js', // points to .wuf/generator/codemods/src-index.js
    dist: 'src/index.js', // file to be "codemoded"
    description: 'Add entry to src/index.js file' // "string shown
    in CLI when running `wuf generate`"
  }
]
```

This file exports an array of codemods. `wuf generate` will take all
codemods defined here and run them one after the other.

> NOTE: order of codemods matters! It's possible that one codemod adjusts a file that another codemod also adjusts.  
> Changing order can potentially corrupt that file!

Each object in exported array has 3 properties:

- `codemod` - relative path to codemod file. This path is relative to path
set in `--codemod` flag.  
In the case of `wuf generate --codemods .wuf/generator/codemods` the path would be relative to `.wuf/generator/codemods`  

  This is a script that alters the file defined in `dist`

- `dist` - path to file which needs to be "codemoded". This path is
    relative to the path that `wuf generate` runs at.  
    For example, say `pwd` echoes `/home/username/project`, then `dist`
    is relative to `/home/username/project`
- `description` - just a string describing what this codemod is doing.
    This string is printed in CLI running `wuf generate`

## How to write codemod

currenlty `wuf generate` leverages `jscodeshift` as codemod runner. A
sample codemod file can look like this:

```js
// .wuf/generator/codemods/src-index.js
module.exports = (file, api, options) => {
  const j = api.jscodeshift; // get hold of jscodeshift api
  const root = j(file.source); // parse file source to AST
  const { ComponentName } = options; // get hold of component name from CLI prompt

  // find all `export const Hello = 'world'` (and similar) instances in parsed `file.source`
  const exports = root.find(j.ExportNamedDeclaration).paths();

  // insert new entry at the end
  j(exports[exports.length - 1]).insertAfter(
    `export { default as ${ComponentName} } from
    './${options['component-name']}';`,
  );

  // transpile AST back to string (and use single quotes)
  return root.toSource({ quotes: 'single' });
};
```

The signature of this codemod function is similar to regular jscodeshift
codemods, except that it has additional object `options`.

This object comes from CLI prompt when running `wuf generate`, or from
CLI flags, when running `wuf generate --component-name Test`.

This object is pre-filled with different cases of the same component name, for convenience:

```
options = {
  ComponentName,
  componentName,
  'component-name'
}
```

---

Let's say we have run `wuf generate --codemods .wuf/generator/codemods
--component-name TestComponent`

`wuf` would run codemod at `.wuf/generator/codemods/src-index.js` and would alter `src/index.js` (as specified in `.wuf/generator/codemods/index.js`).

The result would be new line added:

```diff
// src/index.js
export { default as ToggleSwitch } from './toggle-switch'
+export { default as TestComponent } from './test-component'
```

---

## `--output`

This flag simply tells `wuf generate` where to put generated files.

For example:

`wuf generate --templates .wuf/generator/templates --output src/components`

this would run `wuf generate` and copy&fill files from
`.wuf/generator/templates` into `src/components`.

It may not be obvious but adjusting `--output` allows to reuse the same
template. For example if you wish to have `npm run generate` and `npm
run generate:beta` commands
