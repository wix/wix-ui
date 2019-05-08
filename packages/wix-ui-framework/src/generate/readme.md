# `wuf generate`

```
Usage: generate [options]

Scaffold file structure from templates

Options:
  -f, --force                       Force component generation in a non clean git repo.
  --component-name <ComponentName>  Component name
  --description <description>       Component description
  --templates <templatesPath>       Path to templates. Default is "/generator/templates/"
  --codemods <codemodsPath>         Path to codemods. Default is "/generator/codemods/"
  -h, --help                        output usage information
```

---

`generate` is a command for scaffolding new components. It requires two folders:

1. `templates` - file & folder structure template
1. `codemods` - zero or more scripts for adjusting ("codemoding") existing files.  
    For example, for adding new export entry in `index.js` file or similar.

### `templates`

Let's consider the following folder & file structure:

```
generator
└── templates
    ├── src
    │   ├── Component
    │   │   ├── Component.js
    │   │   ├── Component.meta.js
    │   │   ├── Component.st.css
    │   │   ├── Component.uni.driver.js
    │   │   ├── docs
    │   │   │   └── index.story.js
    │   │   ├── index.js
    │   │   └── test
    │   │       ├── Component.e2e.js
    │   │       ├── Component.private.uni.driver.js
    │   │       ├── Component.spec.js
    │   │       ├── ComponentStories.js
    │   │       ├── Component.visual.js
    │   │       └── storySettings.js
    │   └── index.js
    ├── stories
    │   └── index.js
    └── testkit
        ├── protractor.js
        ├── puppeteer.js
        └── testkit-definitions.js
```

`wuf generate --templates generator/templates` would:

1. mimic the same structure.
2. rename `Component` in folder/file name to `ComponentName` that user types in when running `wuf generate`
3. replace the following values in files:
    * `{%ComponentName%}` - component name that user types in when running `wuf generate`. PascalCase
    * `{%componentName%}` - same as above, but snakeCase
    * `{%component-name%}` - same as above, but kebab-case
    * `{%description%}` - description that user types in when running `wuf generate`
