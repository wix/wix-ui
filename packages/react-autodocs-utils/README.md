# React Autodocs Utils

[![Build Status](https://travis-ci.org/wix/react-autodocs-utils.svg?branch=master)](https://travis-ci.org/wix/react-autodocs-utils)

A collection of React component parsers for automating documentation.

## Install

`npm i react-autodocs-utils --save-dev`

## Use

```js
const reactAutodocsUtils = require('react-autodocs-utils');
const path = './path/to/react-component.js';
const componentMetadata = reactAutodocsUtils(path);
```

`componentMetadata` is an object with metadata of component.

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

`reactAutodocsUtils('./component.js')` Will return a JSON:


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

## Contribute

* `git clone git@github.com:wix/react-autodocs-utils.git`
* `npm i`
* `npm test`

[Jest](https://facebook.github.io/jest/) used to run tests.
* `jest --watch`
