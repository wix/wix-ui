### `<HorizontalMenu.Item />`

A render slot for horizontal menu item

| propName          | propType                   | defaultValue | isRequired | description |
| ----------------- | -------------------------- | ------------ | ---------- | ----------- | 
| `label`           | `string`                   |              | `true`     | label for link |
| `href`            | `string`                   |              |            | `href` attribute for link |
| `target`          | `string`                   |              |            | `target` attribute for link |
| `isForceOpened`   | `boolean`                  | `false`      |            | Force open submenu of menu item |
| `icon`            | `React.ReactNode`          |              |            | Icon before title |
| `expandIcon`      | `({ isOpen: boolean }) => React.ReactNode` |      |            | Expand icon after label |
| `expandSize`      | `'column'` &#124; `'menu'` &#124; `'fullWidth'` | `column`     |            | Size of expanded submenu |
| `className`       | `string`                   |              |            | |
| `style`           | `React.CSSProperties`      |              |            | |


### `<HorizontalMenu.Layout.Grid />`

A grid layout inside `<HorizontalMenu.Item />`.

| propName          | propType                   | defaultValue | isRequired | description |
| ----------------- | -------------------------- | ------------ | ---------- | ----------- | 
| `maxOverflowWidth` | `number`                  | `280`        |              | Maximum content width of submenu that can be overflowed right or left if `<HorizontalMenu.Item />` is not enough to place it fully below itself. |
| `className`       | `string`                   |              |            | |
| `style`           | `React.CSSProperties`      |              |            | |

### `<HorizontalMenu.Layout.Columns />`

A columns layout inside `<HorizontalMenu.Item />`.

| propName          | propType                   | defaultValue | isRequired | description |
| ----------------- | -------------------------- | ------------ | ---------- | ----------- | 
| `columns`         | `number`                   | `1`          |            | Number of columns in layout |
| `columnsAlignment`| `'left'` &#124; `'center'` &#124; `'right'` &#124; `'justify'`| `justify`          |            | How columns should be aligned |
| `maxOverflowWidth` | `number`                  | `280`        |              | Maximum content width of submenu that can be overflowed right or left if `<HorizontalMenu.Item />` is not enough to place it fully below itself. |
| `className`       | `string`                   |              |            | |
| `style`           | `React.CSSProperties`      |              |            | |
