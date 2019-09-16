### `<TagsList/>`

Just a wrapper, which will render children into the container.

| propName   | propType | defaultValue | isRequired | description                            |
| ---------- | -------- | ------------ | ---------- | -------------------------------------- |
| `children` | component|              |            |                                        |
| `className`| string   |              |            |                                        |

### `<Tag/>`

Checkbox input, wrapped with label.

| propName   | propType | defaultValue | isRequired | description                            |
| ---------- | -------- | ------------ | ---------- | -------------------------------------- |
| `children` | component|              |            | Tag will render children into label    |
| `onChange` | function |              |            | On change listener                     |
| `value   ` | string   |              | required   | Value for input                        |
| `name`     | string   |              |            | Value for name attribute on input      | 
