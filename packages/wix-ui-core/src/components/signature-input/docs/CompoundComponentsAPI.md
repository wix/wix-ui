### `<SignatureInput.Title/>`

A render slot for the signature input title

| propName   | propType | defaultValue | isRequired | description |
| ---------- | -------- | ------------ | ---------- | ---------- | 
| `children` | function |              |            | A function: `({getTitleProps}) => element`. Returns a JSX element representing the title. `getTitleProps` function returns all necessary props for the title to be rendered properly. All of title custom props should be sent to `getTitleProps` |

### `<SignatureInput.SigningPad/>`

A render slot for the signature input signing pad

| propName   | propType | defaultValue | isRequired | description                            |
| ---------- | -------- | ------------ | ---------- | -------------------------------------- |
| `data-hook`| string   |              |            | Testing ID                             |
| `penColor` | string   | 'black'      |            | Color of the signature                 |
| `disabled` | boolean  | false        |            | Is the signature pad disabled          |
| `required` | boolean  | false        |            | Is signature mandatory in form context |
| `penWidth` | number   | 2.5          |            | The width of the signature             | 
| `onInit`   | function |              |            | Callback to get the `SignaturePadApi`  |
| `canvasRef`| function |              |            | Callback to get an instance of the canvas HTML element instance |

`SignaturePadApi` - object containing the imperative API for communicating with the signing pad.
* `clear: () => void` - Clears the signature pad
* `toDataURL: (format?: "image/jpeg" OR "image/svg+xml") => string` - Exports the signature to png / jpeg / svg accordingly
* `isEmpty: () => boolean` - Returns true if the signature pad is empty; otherwise false
* `onDraw: (event: MouseEvent | Touch) => void` - Fires when a curve was drawn on the signature pad



### `<SignatureInput.ClearButton/>`

A render slot for the signature input clear button. Passing `onClick` to `getClearButtonProps` will be invoked after the signature has been cleared

| propName   | propType | defaultValue | isRequired | description|
| ---------- | -------- | ------------ | ---------- | ---------- |
| `children` | function |              |            | A function: `({getClearButtonProps}) => element`. Returns a JSX element representing the clear button. `getClearButtonProps` function returns all necessary props for the clear button to be rendered properly. All of clear button custom props should be sent to `getClearButtonProps` |