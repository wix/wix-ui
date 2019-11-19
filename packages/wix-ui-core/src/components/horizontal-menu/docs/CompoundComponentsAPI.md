### `<HorizontalMenu.Item />`

A render slot for horizontal menu item

| propName          | propType                   | defaultValue | isRequired | description |
| ----------------- | -------------------------- | ------------ | ---------- | ----------- | 
| `className`       | `string`                   |              |            | |
| `label`           | `string`                   |              | `true`     | label for link |
| `href`            | `string`                   | `#`          |            | `href` attribute for link |
| `target`          | `string`                   | `_self`      |            | `target` attribute for link |
| `icon`            | `React.ReactNode`          |              |            | Icon before title |
| `expandIcon`      | `({ isOpen: boolean }) => React.ReactNode` |      |            | Expand icon after label |
| `style`           | `React.CSSProperties`      |              |            | |


### `<HorizontalMenu.Layout.Grid />`

A grid layout inside `<HorizontalMenu.Item />`. `<HorizontalMenu.Layout.Grid />` properties extends `HorizontalMenuLayoutProps`.

| propName          | propType                   | defaultValue | isRequired | description |
| ----------------- | -------------------------- | ------------ | ---------- | ----------- | 

### `<HorizontalMenu.Layout.Columns />`

A columns layout inside `<HorizontalMenu.Item />`. `<HorizontalMenu.Layout.Columns />` properties extends `HorizontalMenuLayoutProps`.

| propName          | propType                   | defaultValue | isRequired | description |
| ----------------- | -------------------------- | ------------ | ---------- | ----------- | 
| `columns`         | `number`                   | `1`          |            | Number of columns in layout |

### `HorizontalMenuLayoutProps`

Common properties for layouts

| propName          | propType                   | defaultValue | isRequired | description |
| ----------------- | -------------------------- | ------------ | ---------- | ----------- | 
| `className`       | `string`                   |              |            | |
| `style`           | `React.CSSProperties`      |              |            | |
| `textAlign`       | `'left'` &#124; `'center'` &#124; `'right'` |              |            | |
| `expandSize`      | `'column'` &#124; `'menu'` &#124; `'fullWidth'` | `column`     |            | Size of expanded submenu |
| `maxOverflowWidth` | `number`                  | `280`        |              | Maximum content width of submenu that can be overflowed right or left if `<HorizontalMenu.Item />` is not enough to place it fully below itself. |