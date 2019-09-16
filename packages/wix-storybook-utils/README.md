# `wix-storybook-utils`

Collection of utilities for documenting React components in Storybook.

`wix-storybook-utils` comes as a `webpack` loader for `storybook` to scrape components data and document them as stories.

## Install

```sh
npm install wix-storybook-utils --save-dev
```

## Use

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


**/src/MyComponent/docs/index.story.js**
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
