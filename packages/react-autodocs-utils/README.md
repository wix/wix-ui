# React Autodocs Utils

[![Build Status](https://travis-ci.org/wix/react-autodocs-utils.svg?branch=master)](https://travis-ci.org/wix/react-autodocs-utils)

Tool to get React component metadata: PropTypes, descriptions, prop comments and alike.

Some of the features:
* supports javascript and typescript components,
* tries its best to extract data from composed components
* goes into `node_modules` and tries to parse components from there
* looks for `readme.md` files
* looks for `component.driver.js` files and parses them (useful to automate component testkit documentation)

## Install

`npm i react-autodocs-utils --save-dev`

## Usage

### As node module

```js
const gatherAll = require('react-autodocs-utils/src/gather-all');
const path = './path/to/react-component.js';

gatherAll(path).then(metadata => {
  // `metadata` is an object with component metadata, detailed below in this README
});
```

### As CLI

```sh
$ node_modules/react-autodocs-utils/index.js path/to/react-components.js
```

component metadata is printed in stdout


## Example

given `component.js`:

```js
import React from 'react';
import {oneOf, node} from 'prop-types';

export class Component extends React.PureComponent {
  static propTypes = {
    thing: oneOf(['first', 'second']),

    /** i am description about `children` prop */
    children: node.isRequired
  }

  render() {
    return <div/>;
  }
}
```

`await gatherAll('./component.js')` will return the following JSON:


```js
{
  "props": {
    "thing": {
      "type": {
        "name": "enum",
        "value": [
          {
            "value": "'first'",
            "computed": false
          },
          {
            "value": "'second'",
            "computed": false
          }
        ]
      },
      "required": false,
      "description": ""
    },
    "children": {
      "type": {
        "name": "node"
      },
      "required": true,
      "description": "i am description about `children` prop"
    }
  },
  "description": "",
  "displayName": "Component",
  "methods": [],
  "readme": "source of `./readme.md` if exists, otherwise empty string",
  "readmeAccessibility": "source of `./readme.accessibility.md` if exists, otherwise empty string",
  "readmeTestkit": "source of `./readme.testkit.md` if exists, otherwise empty string",

  // metadata of exported methods in *.driver.js, *.protractor.driver.js or *.pupeteer.driver.js
  "drivers": [
    {
      "file": "component.driver.js",
      "descriptor": [
        {
          "name": "click",
          "args": [],
          "type": "function"
        }
      ]
    },
    {
      "file": "component.pupeteer.driver.js",
      "descriptor": [
        {
          "name": "element",
          "args": [],
          "type": "function"
        }
      ]
    }
  ]
}
```

With this information it is easy to display documentation with regular React components.

It is used heavily in
[wix-storybook-utils](https://github.com/wix/wix-ui/tree/master/packages/wix-storybook-utils).
Live example available at
[wix-style-react](https://wix.github.io/wix-style-react/?selectedKind=3.%20Inputs&selectedStory=3.6%20DatePicker&full=0&addons=0&stories=1&panelRight=0) storybook.

## API

### `gatherAll(path, options)`

```js
const gatherAll = require('react-autodocs-utils/src/gather-all')
```
* `path` - string, path to a React component file which should be parsed
* `options` - object supporting the following setting flags to adjust the parser:
  * `skipPropsWithoutDoc` - boolean. Skips component props that have no JSDOC comment

## Contribute

* `git clone git@github.com:wix/react-autodocs-utils.git`
* `npm install`
* `npm test`

[Jest](https://facebook.github.io/jest/) used to run tests.
* `jest --watch`
