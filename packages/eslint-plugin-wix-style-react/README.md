# eslint-plugin-wix-style-react

Wix Style React Lint Plugin

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-wix-style-react`:

```
$ npm install eslint-plugin-wix-style-react --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-wix-style-react` globally.

## Usage

Add `wix-style-react` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "wix-style-react"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "wix-style-react/no-full-wsr-lib": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





