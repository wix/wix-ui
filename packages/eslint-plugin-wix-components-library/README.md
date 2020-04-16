# eslint-plugin-wix-components-library

Wix Components Library ESLint Plugin

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-wix-components-library`:

```
$ npm install eslint-plugin-wix-components-library --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-wix-components-library` globally.

## Usage

Add `wix-components-library` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "wix-components-library"
    ]
}
```


Then configure the rules you want to use under the rules section.
## Supported Rules

#### prop-types-restrict-to-default-import
```json
{
    "rules": {
        "wix-components-library/prop-types-restrict-to-default-import": 2
    }
}
```
