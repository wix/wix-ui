# Restrict to default import when using prop-types (prop-types-restrict-to-default-import)

Using non default imports from prop-types is not recommended, names are confusing.
This rule makes sure using only the default import.
You can fix your code using the --fix flag.

## Rule Details

Examples of **incorrect** code for this rule:

```js

import { string, number, object } from 'prop-types';

class MyClass {
  static propTypes = {
    myString: string,
    myNumber: number,
    myObject: object,
  };
}

```

Examples of **correct** code for this rule:

```js

import PropTypes from 'prop-types';

class MyClass {
  static propTypes = {
    myString: PropTypes.string,
    myNumber: PropTypes.number,
    myObject: PropTypes.object,
  };
}

```
