# wix-ui-codemod

This package contains a collection of [jscodeshift](https://github.com/facebook/jscodeshift) codemod scripts to help migrate and adapt Wix UI projects to API changes.

## Usage

```bash
npx wix-ui-codemod <transform> <path> [...options]
```

- `transform` - name of transform, see available options below.
- `path` - path to file or directory where the codemod will be applied.
- `options` - available options are:
  - `--dry` - run in dry mode (will not modify any transformed files on disk).
  - `--print` - print modified files.

## Transforms

The following transforms are available:

### wix-style-react/icons-common

```bash
npx wix-ui-codemod wix-style-react/icons-common <path>
```

Will replace deprecated icon imports from `wix-style-react/new-icons` with imports from `wix-ui-icons-common` package.

```diff
- import Add from 'wix-style-react/new-icons/Add';
+ import Add from 'wix-ui-icons-common/Add';
```

### wix-style-react/named-imports

```bash
npx wix-ui-codemod wix-style-react/named-imports <path>
```

Converts all `wix-style-react/ComponentName` imports more to the optimal form for tree shaking:

```diff
- import TextButton from 'wix-style-react/TextButton';
+ import { TextButton } from 'wix-style-react';
```

## Contributing

Thanks! See [contributing guide](./CONTRIBUTING.md).
