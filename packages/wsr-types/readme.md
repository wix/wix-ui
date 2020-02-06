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

Most of wsr consumers use Puppeteer and Enzyme for their tests, because of that we export types for these platforms. In case you do not use them you should exclude these types, otherwise you will get errors. Exclude insturctions:
```js
    "exclude": [
        "node_modules/wsr-types/enzyme-testkit-types.d.ts",
        "node_modules/wsr-types/puppeteer-testkit-types.d.ts"
    ]
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

Using default imports:
```js
declare module "wix-style-react/Avatar"; // Avatar - is the name of the component to ignore
```
Using named imports:
```js
declare module "wix-style-react" {
  export const Avatar // Avatar - is the name of the component to ignore
  ...
}
```


## Contribute

* `npm test` to run `tsc` and ensure types compile
