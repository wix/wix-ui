# Fail if importing all of WSR (no-full-wsr-lib)

## Rule Details

This rule aims to prevent importing all of WSR.

Examples of **incorrect** code for this rule:

```js
import { Button } from 'wix-style-react';
const Button2 = require('wix-style-react').Button;
const { Button, Panel } = require('wix-style-react');
const WSAR = require('wix-style-react');
```

Examples of **correct** code for this rule:

```js
import Button from 'wix-style-react/Button';
import Panel from 'wix-style-react/Panel';
```

## When Not To Use It

Turn off this rule when WSR supports tree shaking.
