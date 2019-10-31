```
                        _
__      _____ _ __     | |_ _   _ _ __   ___  ___
\ \ /\ / / __| '__|    | __| | | | '_ \ / _ \/ __|
 \ V  V /\__ \ |       | |_| |_| | |_) |  __/\__ \
  \_/\_/ |___/_|        \__|\__, | .__/ \___||___/
                            |___/|_|
```

# `wix-style-react` ❤️ Typescript

This repo exposes typescript type definitions for wix-style-react
components and testkits.

To use install and update `tsconfig.json`:

1. `npm install wsr-types --save-dev`
1. update `tsconfig.json` `include` array:

```json
{
  "compilerOptions": {
    // ... compiler options
  },
  "include": [
    "node_modules/wsr-types/types.d.ts",
    "node_modules/wsr-types/common-testkit-types.d.ts",
    "node_modules/wsr-types/enzyme-testkit-types.d.ts",
    "node_modules/wsr-types/puppeteer-testkit-types.d.ts",
    "node_modules/wsr-types/vanilla-testkit-types.d.ts",
    // ... other includes
  ]
}
```

## Contribute

* `npm test` to run `tsc` and ensure types compile
* `npm run concat` to concatenate type files into bulks
