# `wix-storybook-utils`

CCollection of utilities for documenting React components in Storybook.

`wix-storybook-utils` comes as a `webpack` loader for `storybook` to scrape components data and document them as stories.

## Install

```sh
npm install wix-storybook-utils --save-dev
```

## Use

Applying webpack loader will allow you to write `.story.js` files.

**/.storybook/webpack.config.js**

```js
const merge = require('lodash/merge');
const path = require('path');

module.exports = (config, env, storybookConfig) =>
  merge(storybookConfig, {
    context: path.resolve(__dirname, '..', 'src'),

    module: {
      rules: newConfig.module.rules.concat({
        test: /\.story\.js$/,
        loader: 'wix-storybook-utils/loader',
        options: {
          plugins: [],
          storyConfig: {
            moduleName: 'my-project',
            repoBaseURL: 'https://github.com/wix/my-project/tree/master/src/',
            issueURL: 'https://github.com/wix/my-project/issues/new'
          }
        }
      })
    }
  });
```

optional _plugins_ array can be used to change the output of default parser.

Example (dummy) plugin could be written like this:

```js
  // ...
  plugins: [
    path.resolve(__dirname, '.storybook/stylable-metadata-plugin.js')
  ]
  // ...
```

Where plugin would contain following code:
```js
module.exports = function({source, metadata}) {
  return {metadata: {...metadata, sourceLength: source.length}}
}
```

In addition to source and metadata, plugin also receives _basePath_.

In this case plugin returns a number but it could also return any other serializable value or a promise which resolves with such value.

Then one could use _plugin_ section in story configuration:

```js
  plugin((section, storyConfig) => <div>{storyConfig.metadata.sourceLength}</div>)
```

Above section would output number of characters in story configuration source code.

**/src/MyComponent/docs/index.story.js**

Read more about `.story.js` files in [usage](https://github.com/wix/wix-ui/blob/master/packages/wix-storybook-utils/docs/usage.md) and [sections](https://github.com/wix/wix-ui/blob/master/packages/wix-storybook-utils/docs/sections.md) documents.

```js
import MyComponent from '../MyComponent';

export default {
  category: 'Components',
  storyName: 'MyComponent',

  component: MyComponent,
  componentPath: '../',

  componentProps: {
    value: 'hello world'
  },
};
```

**/stories/index.js**
```js
import '../src/components/MyComponent/docs/index.story';
```

## Contributing

* `git clone git@github.com:wix/wix-ui.git`
* `cd wix-ui/packages/wix-storybook-utils`
* `npm install`
* `npm start` - start storybook at [localhost:6006](http://localhost:6006)
* `npm test` - run unit tests
* `npm run test -- --watch` - run unit tests in watch mode
* `npm run build` create transpiled code in `/dist`
