# Layout

> **NOTE** this component is in development, not recommended for wide use yet!
> You are very welcome to try and provide feedback
> Beware that API could change!

`<Layout/>` is a compound component of `<Layout/>` and `<Cell/>`.
They are useful to lay out content for whole page or just small area.

```js
import { Layout, Cell } from 'wix-style-react/Layout';

// Three column layout
export default () =>
  <Layout>
    <Cell span={4}>Left</Cell>
    <Cell span={4}>Middle</Cell>
    <Cell span={4}>Right</Cell>
  </Layout>;
```

Wix design layout is divided into 12 columns. `<Cell/>`s accept `span`
property to define how many columns they should occupy. It's `12` by
default which means that `<Cell/>` and `<Cell span={12}/>` are identical.

It is possible to add `<Cell/>`s summing more than 12 columns in one
`<Layout/>`. In that case they simply wrap.

<details>
  <summary>Nested grid example</summary>

  ```js
  import { Layout, Cell } from 'wix-style-react/Layout';

  // Three column layout
  export default () =>
    <Layout>
      <Cell span={4}>Left</Cell>
      <Cell span={4}>
        <Layout>
          <Cell span={6}>left of middle</Cell>
          <Cell span={6}>right of middle</Cell>
        </Layout>
      </Cell>
      <Cell span={4}>Right</Cell>
    </Layout>;
  ```
</details>

---

<details>
  <summary>`<Layout/>`</summary>

  | propName | propType | defaultValue | isRequired | description                                                                        |
  | ---      | ---      | ---          | ---        | ---                                                                                |
  | children | `node`   |              | -          | should only be one or more `<Cell/>` components                                    |
  | gap      | `string` | `'30px'`     | -          | regular [css `gap` property](https://developer.mozilla.org/en-US/docs/Web/CSS/gap) |
  | cols     | `number` | `12`         | -          | set desired number of columns. This works in relation to `span` prop of `<Cell/>`  |
</details>

<details>
  <summary>`<Cell/>`</summary>

  | propName | propType | defaultValue | isRequired | description                                                                        |
  | ---      | ---      | ---          | ---        | ---                                                                                |
  | children | `node`   |              | -          | any node to be rendered inside                                                     |
  | span     | `number` | 12           | -          | how many columns should this cell occupy. Can be any number from 1 to 12 inclusive |
  | vertical | `bool`   |              | -          | whether to align children vertically to the middle                                 |
</details>
