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
2. update `tsconfig.json` `include` array:

```js
{
  "compilerOptions": {
    // ... compiler options
  },
  "include": [
    "node_modules/wsr-types/**/*.d.ts",
    // ... other includes
  ]
}
```

3. If you are using `noImplicitAny: true` in your tsconfig, then add to your `external-types.d.ts`
```ts
declare module 'wix-style-react/*'
```

4. want to ignore one of the types? update `tsconfig.json`:
```js
{
    “files”: [
    “./src/external-types.d.ts”,
  ]
}
```

`external-types.d.ts`:
```js
declare module "wix-style-react/Avatar"; // Avatar - is the name of the component to ignore
```


## Contribute

* `npm test` to run `tsc` and ensure types compile
