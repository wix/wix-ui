### `<HorizontalMenu.Item />`

A render slot for horizontal menu item

| propName          | propType                   | defaultValue | isRequired | description |
| ----------------- | -------------------------- | ------------ | ---------- | ----------- | 
| `className`       | `string`                   |              |            | |
| `label`           | `string`                   |              | `true`     | label for link |
| `href`            | `string`                   | `#`          |            | `href` attribute for link |
| `target`          | `string`                   | `_self`      |            | `target` attribute for link |
| `icon`            | `React.ReactNode`          |              |            | Icon before title |
| `expandIcon`      | `({ isOpen: boolean }) => React.ReactElement` |      |            | Size of expandable submenu |
| `expandSize`      | `'column'` &#124; `'menu'` &#124; `'fullWidth'` | `column`     |            | Size of expandable submenu |
| `style`           | `React.CSSProperties`      |              |            | |


### `<HorizontalMenu.Layout.Grid />`

A grid layout inside `<HorizontalMenu.Item />`

| propName          | propType                   | defaultValue | isRequired | description |
| ----------------- | -------------------------- | ------------ | ---------- | ----------- | 
| `className`       | `string`                   |              |            | |
| `style`           | `React.CSSProperties`      |              |            | |
| `textAlign`       | `'left'` &#124; `'center'` &#124; `'right'` |              |            | |

### `<HorizontalMenu.Layout.Columns />`

A columns layout inside `<HorizontalMenu.Item />`

| propName          | propType                   | defaultValue | isRequired | description |
| ----------------- | -------------------------- | ------------ | ---------- | ----------- | 
| `className`       | `string`                   |              |            | |
| `style`           | `React.CSSProperties`      |              |            | |
| `textAlign`       | `'left'` &#124; `'center'` &#124; `'right'` |              |            | |
| `columns`         | `number`                   | `1`          |            | Number of columns in layout |
